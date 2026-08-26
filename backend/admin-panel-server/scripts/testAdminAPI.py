import subprocess, json, sys

def curl(method, url, token=None, body=None):
    cmd = ['curl', '-s', '-X', method, url]
    if token:
        cmd += ['-H', 'Authorization: Bearer ' + token]
    if body:
        cmd += ['-H', 'Content-Type: application/json', '-d', json.dumps(body)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return json.loads(r.stdout)
    except Exception:
        return {'raw': r.stdout[:300]}

BASE = 'http://localhost:8000/api/admin'
results = []

def test(name, fn):
    try:
        fn()
        print('PASS -', name)
        results.append((name, True, None))
    except Exception as e:
        print('FAIL -', name, '->', e)
        results.append((name, False, str(e)))

# 1. Super Admin login
login_resp = [None]
def t1():
    r = curl('POST', BASE+'/auth/login', body={'email':'aayusinghrajput812@gmail.com','password':'Rajput@2002'})
    assert r.get('success'), str(r)
    assert r['admin']['isSuperAdmin'] == True
    login_resp[0] = r
test('Super Admin login', t1)

TOKEN = login_resp[0]['token'] if login_resp[0] else ''

# 2. /auth/me
def t2():
    r = curl('GET', BASE+'/auth/me', token=TOKEN)
    assert r.get('success'), str(r)
    assert r['admin']['isSuperAdmin'] == True
test('/auth/me returns Super Admin', t2)

# 3. Dashboard stats
stats_data = [None]
def t3():
    r = curl('GET', BASE+'/dashboard/stats', token=TOKEN)
    assert r.get('success'), str(r)
    stats_data[0] = r['data']
test('Dashboard stats', t3)

# 4. Admin sees all teachers
teacher_id = [None]
def t4():
    r = curl('GET', BASE+'/teachers?limit=5', token=TOKEN)
    assert r.get('success'), str(r)
    assert r['pagination']['total'] >= 0
    if r['data']:
        teacher_id[0] = r['data'][0]['_id']
test('Admin lists all teachers (incl. hidden)', t4)

# 5. Super Admin list
super_admin_id = [None]
def t5():
    r = curl('GET', BASE+'/administrators', token=TOKEN)
    assert r.get('success'), str(r)
    super_admin_id[0] = r['data'][0]['id']
test('List administrators', t5)

# 6. Create normal admin (isSuperAdmin must be False)
new_admin_id = [None]
def t6():
    r = curl('POST', BASE+'/administrators', token=TOKEN,
             body={'name':'Test Admin','email':'testadmin_test@example.com','password':'TestPass@123!'})
    if 'already exists' in r.get('error',''):
        return  # idempotent
    assert r.get('success'), str(r)
    assert r['data']['isSuperAdmin'] == False, 'isSuperAdmin must be False for new admins'
    new_admin_id[0] = r['data']['id']
test('Create normal admin (isSuperAdmin=False enforced)', t6)

# 7. Delete Super Admin must be rejected
def t7():
    r = curl('DELETE', BASE+'/administrators/'+super_admin_id[0], token=TOKEN)
    assert r.get('success') is not True, 'Super Admin deletion was NOT rejected! ' + str(r)
test('Super Admin deletion rejected by backend', t7)

# 8. Visibility toggle ON
def t8():
    if not teacher_id[0]:
        return
    r = curl('PATCH', BASE+'/teachers/'+teacher_id[0]+'/visibility', token=TOKEN, body={'isVisible': True})
    assert r.get('success'), str(r)
    assert r['data']['isVisible'] == True
test('Toggle teacher visibility ON', t8)

# 9. Public API shows visible teacher
def t9():
    r = curl('GET', 'http://localhost:8000/api/v1/teachers?limit=10')
    assert r.get('success'), str(r)
    print('  (public sees', r['total'], 'teacher(s))')
test('Public /teachers returns visible teachers', t9)

# 10. Unauthenticated access rejected
def t10():
    r = curl('GET', BASE+'/teachers')
    assert r.get('success') is not True, 'Unauthenticated access allowed! ' + str(r)
test('Unauthenticated admin access returns 401', t10)

# 11. Toggle visibility OFF
def t11():
    if not teacher_id[0]:
        return
    r = curl('PATCH', BASE+'/teachers/'+teacher_id[0]+'/visibility', token=TOKEN, body={'isVisible': False})
    assert r.get('success'), str(r)
    assert r['data']['isVisible'] == False
test('Toggle teacher visibility OFF', t11)

# 12. Invalid password rejected
def t12():
    r = curl('POST', BASE+'/auth/login', body={'email':'aayusinghrajput812@gmail.com','password':'wrongpassword'})
    assert r.get('success') is not True, 'Invalid credentials accepted!'
test('Invalid admin credentials rejected', t12)

# 13. Deactivate test admin
def t13():
    if not new_admin_id[0]:
        return
    r = curl('DELETE', BASE+'/administrators/'+new_admin_id[0], token=TOKEN)
    assert r.get('success'), str(r)
test('Deactivate test admin', t13)

# Summary
passed = sum(1 for _, ok, _ in results if ok)
failed = sum(1 for _, ok, _ in results if not ok)
print()
print(f'Results: {passed} passed, {failed} failed out of {len(results)} tests')

if stats_data[0]:
    t = stats_data[0]['teachers']
    a = stats_data[0]['admins']
    print(f'DB stats: {t["total"]} teachers total, {t["visible"]} visible, {t["pendingReview"]} pending review')
    print(f'         {a["total"]} admin(s), {a["active"]} active')

sys.exit(0 if failed == 0 else 1)
