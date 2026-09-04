import { useEffect, useState, useCallback } from 'react';
import { curriculumService } from '../services/adminServices';
import CategoryModal from '../components/curriculum/CategoryModal';
import SubjectModal from '../components/curriculum/SubjectModal';
import toast from 'react-hot-toast';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  Search,
  Tag,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  CheckCircle2,
} from 'lucide-react';

export default function CurriculumPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', badge: '', description: '', isVisible: true });

  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [subjectForm, setSubjectForm] = useState({ name: '', grades: '', searchTags: '', isVisible: true });

  const loadCurriculum = useCallback(async () => {
    setLoading(true);
    try {
      const res = await curriculumService.getCurriculum();
      const data = res.data.data || [];
      setCategories(data);
      // Auto-expand all categories by default
      const exp = {};
      data.forEach((c) => {
        exp[c._id] = true;
      });
      setExpandedCategories(exp);
    } catch {
      toast.error('Failed to load curriculum hierarchy');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurriculum();
  }, [loadCurriculum]);

  const toggleExpand = (id) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Category Handlers
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '', badge: '', description: '', isVisible: true });
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      badge: cat.badge,
      description: cat.description || '',
      isVisible: cat.isVisible !== undefined ? cat.isVisible : true,
    });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        const res = await curriculumService.updateCategory(editingCategory._id, categoryForm);
        toast.success('Curriculum category updated');
        setCategories((prev) =>
          prev.map((c) => (c._id === editingCategory._id ? res.data.data : c))
        );
      } else {
        const res = await curriculumService.createCategory(categoryForm);
        toast.success('New curriculum level created');
        setCategories((prev) => [...prev, res.data.data]);
      }
      setShowCategoryModal(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save category');
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm('Are you sure you want to delete this curriculum category and all its subjects?')) return;
    try {
      await curriculumService.deleteCategory(catId);
      toast.success('Category removed');
      setCategories((prev) => prev.filter((c) => c._id !== catId));
    } catch {
      toast.error('Failed to delete category');
    }
  };

  // Subject Handlers
  const handleOpenAddSubject = (catId) => {
    setActiveCategoryId(catId);
    setSubjectForm({ name: '', grades: '', searchTags: '', isVisible: true });
    setShowSubjectModal(true);
  };

  const handleSaveSubject = async (e) => {
    e.preventDefault();
    if (!activeCategoryId) return;
    try {
      const payload = {
        name: subjectForm.name,
        grades: subjectForm.grades ? subjectForm.grades.split(',').map((g) => g.trim()) : [],
        searchTags: subjectForm.searchTags ? subjectForm.searchTags.split(',').map((t) => t.trim()) : [],
        isVisible: subjectForm.isVisible,
      };

      const res = await curriculumService.addSubject(activeCategoryId, payload);
      toast.success('Subject added to curriculum');
      setCategories((prev) =>
        prev.map((c) => (c._id === activeCategoryId ? res.data.data : c))
      );
      setShowSubjectModal(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add subject');
    }
  };

  const handleToggleSubjectVisibility = async (catId, sub) => {
    try {
      const res = await curriculumService.updateSubject(catId, sub._id, {
        isVisible: !sub.isVisible,
      });
      toast.success(`Subject visibility updated`);
      setCategories((prev) =>
        prev.map((c) => (c._id === catId ? res.data.data : c))
      );
    } catch {
      toast.error('Failed to update subject visibility');
    }
  };

  const handleDeleteSubject = async (catId, subId) => {
    if (!window.confirm('Remove this subject from the curriculum?')) return;
    try {
      const res = await curriculumService.deleteSubject(catId, subId);
      toast.success('Subject removed');
      setCategories((prev) =>
        prev.map((c) => (c._id === catId ? res.data.data : c))
      );
    } catch {
      toast.error('Failed to remove subject');
    }
  };

  // Filtered categories based on search
  const filteredCategories = categories.map((cat) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cat;
    const matchingSubjects = (cat.subjects || []).filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.searchTags || []).some((t) => t.toLowerCase().includes(q))
    );
    const catMatches = cat.name.toLowerCase().includes(q) || cat.badge.toLowerCase().includes(q);
    if (catMatches) return cat;
    return { ...cat, subjects: matchingSubjects };
  }).filter((cat) => !searchQuery.trim() || cat.subjects.length > 0 || cat.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalSubjectsCount = categories.reduce((acc, c) => acc + (c.subjects?.length || 0), 0);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Curriculum & Subject Hierarchy</h1>
          <p>Configure academic levels, subject catalogues, tags, and AI search indexing keywords</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" onClick={handleOpenAddCategory}>
            <Plus size={16} />
            <span>Add Curriculum Level</span>
          </button>
        </div>
      </div>

      {/* Summary & Search Bar */}
      <div className="filter-bar">
        <div className="filter-input-wrap">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search subjects, levels, or keywords (e.g. Physics, SEE, Python, IOE)…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '.84rem', color: 'var(--text-secondary)', padding: '0 8px' }}>
          <strong>{categories.length}</strong> Academic Levels · <strong>{totalSubjectsCount}</strong> Active Subjects
        </div>
      </div>

      {loading && (
        <div className="state-center">
          <div className="spinner" />
          <p>Loading curriculum catalog…</p>
        </div>
      )}

      {/* Categories Hierarchy List */}
      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {filteredCategories.map((cat) => {
            const isExp = expandedCategories[cat._id];
            return (
              <div key={cat._id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                {/* Category Header Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 24px',
                    background: 'var(--bg-card-elevated)',
                    borderBottom: isExp ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleExpand(cat._id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--gold-400)' }}>
                      {isExp ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(138, 56, 97, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-300)' }}>
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                          {cat.name}
                        </h3>
                        <span className="badge badge-gold">{cat.badge}</span>
                        {!cat.isVisible && (
                          <span className="badge badge-rejected">Hidden</span>
                        )}
                      </div>
                      {cat.description && (
                        <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>
                      {cat.subjects?.length || 0} subjects
                    </span>

                    <button
                      className="btn btn-gold btn-sm"
                      onClick={() => handleOpenAddSubject(cat._id)}
                    >
                      <Plus size={14} />
                      <span>Add Subject</span>
                    </button>

                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleOpenEditCategory(cat)}
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--danger)' }}
                      onClick={() => handleDeleteCategory(cat._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded Subjects Catalogue */}
                {isExp && (
                  <div style={{ padding: '20px 24px' }}>
                    {(cat.subjects || []).length === 0 ? (
                      <div className="state-center" style={{ padding: '20px' }}>
                        <p>No subjects added yet under {cat.name}.</p>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleOpenAddSubject(cat._id)}
                        >
                          <Plus size={14} />
                          <span>Add First Subject</span>
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
                        {cat.subjects.map((sub) => (
                          <div
                            key={sub._id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 16px',
                              background: 'var(--bg-input)',
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius)',
                              opacity: sub.isVisible !== false ? 1 : 0.6,
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-primary)' }}>
                                  {sub.name}
                                </span>
                                {sub.isVisible === false && (
                                  <span style={{ fontSize: '.68rem', color: 'var(--warning)', background: 'var(--warning-bg)', padding: '1px 5px', borderRadius: 4 }}>
                                    Hidden
                                  </span>
                                )}
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                                {(sub.grades || []).map((g, gi) => (
                                  <span key={gi} style={{ fontSize: '.7rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '1px 6px', borderRadius: 4 }}>
                                    {g}
                                  </span>
                                ))}
                                {(sub.searchTags || []).slice(0, 2).map((t, ti) => (
                                  <span key={ti} style={{ fontSize: '.7rem', color: 'var(--brand-300)' }}>
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <button
                                className="btn btn-ghost btn-icon"
                                style={{ width: 30, height: 30, padding: 0 }}
                                onClick={() => handleToggleSubjectVisibility(cat._id, sub)}
                                title={sub.isVisible !== false ? 'Hide from registration catalogue' : 'Make visible'}
                              >
                                {sub.isVisible !== false ? <Eye size={15} color="var(--success-light)" /> : <EyeOff size={15} color="var(--text-muted)" />}
                              </button>

                              <button
                                className="btn btn-ghost btn-icon"
                                style={{ width: 30, height: 30, padding: 0, color: 'var(--danger)' }}
                                onClick={() => handleDeleteSubject(cat._id, sub._id)}
                                title="Delete subject"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Category Add/Edit Modal */}
      <CategoryModal
        showCategoryModal={showCategoryModal}
        editingCategory={editingCategory}
        categoryForm={categoryForm}
        setCategoryForm={setCategoryForm}
        onClose={() => setShowCategoryModal(false)}
        onSave={handleSaveCategory}
      />

      {/* Subject Add Modal */}
      <SubjectModal
        showSubjectModal={showSubjectModal}
        subjectForm={subjectForm}
        setSubjectForm={setSubjectForm}
        onClose={() => setShowSubjectModal(false)}
        onSave={handleSaveSubject}
      />
    </>
  );
}
