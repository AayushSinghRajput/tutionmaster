import { useEffect, useState } from 'react';
import {
  Sparkles,
  Plus,
  Play,
  RotateCcw,
  Trash2,
  Edit2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Zap,
} from 'lucide-react';
import { llmKeyAdminService } from '../services/llmKeyAdminService';
import { useAuth } from '../context/AuthContext';
import AddEditKeyModal from '../components/llm-keys/AddEditKeyModal';
import ConfirmModal from '../components/common/ConfirmModal';
import toast from 'react-hot-toast';

const PROVIDER_COLORS = {
  gemini: { bg: 'rgba(56, 189, 248, 0.15)', text: '#38bdf8', border: 'rgba(56, 189, 248, 0.3)' },
  deepseek: { bg: 'rgba(14, 165, 233, 0.15)', text: '#38bdf8', border: 'rgba(14, 165, 233, 0.3)' },
  groq: { bg: 'rgba(249, 115, 22, 0.15)', text: '#fb923c', border: 'rgba(249, 115, 22, 0.3)' },
  openai: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
  claude: { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
};

export default function LLMKeysPage() {
  const { admin } = useAuth();
  const isSuperAdmin = Boolean(admin?.isSuperAdmin);

  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [testingId, setTestingId] = useState(null);

  const loadKeys = async () => {
    setLoading(true);
    try {
      const res = await llmKeyAdminService.list();
      setKeys(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load LLM keys');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKeys();
  }, []);

  const handleToggle = async (key) => {
    try {
      const res = await llmKeyAdminService.toggle(key._id);
      setKeys((prev) =>
        prev.map((k) => (k._id === key._id ? { ...k, isActive: res.data.data.isActive } : k))
      );
      toast.success(res.data.message || 'Key status updated');
    } catch (err) {
      toast.error('Failed to toggle key status');
    }
  };

  const handleQuickTest = async (key) => {
    setTestingId(key._id);
    try {
      const res = await llmKeyAdminService.test({ id: key._id });
      if (res.data?.success) {
        toast.success(`Success! Latency: ${res.data.data.latencyMs}ms`);
        loadKeys();
      } else {
        toast.error(`Test failed: ${res.data.data?.error || 'Unknown error'}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Connection test failed');
    } finally {
      setTestingId(null);
    }
  };

  const handleResetCooldown = async (key) => {
    try {
      await llmKeyAdminService.resetCooldown(key._id);
      toast.success('Cooldown reset! Key is now active.');
      loadKeys();
    } catch (err) {
      toast.error('Failed to reset cooldown');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await llmKeyAdminService.delete(deleteTarget._id);
      toast.success('LLM Key removed');
      setKeys((prev) => prev.filter((k) => k._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete key');
    } finally {
      setDeleting(false);
    }
  };

  // Metrics
  const totalKeys = keys.length;
  const activeKeys = keys.filter((k) => k.isActive).length;
  const rateLimitedKeys = keys.filter(
    (k) => k.status === 'rate_limited' || (k.cooldownUntil && new Date(k.cooldownUntil) > new Date())
  ).length;
  const primaryKey = keys.filter((k) => k.isActive).sort((a, b) => a.priority - b.priority)[0];

  return (
    <div>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ margin: 0 }}>AI Models & LLM Keys</h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--success-light)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              Multi-LLM Router
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8' }}>
            Manage active LLM provider keys, priority fallback routing, and automatic rate-limit cooldowns.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingKey(null);
              setIsModalOpen(true);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} />
            <span>Add LLM Key</span>
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              background: 'rgba(138, 56, 97, 0.2)',
              color: 'var(--brand-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Layers size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Total Configured Keys</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>{totalKeys}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.18)',
              color: 'var(--success-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Active & Ready</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>{activeKeys}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              background: rateLimitedKeys > 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.15)',
              color: rateLimitedKeys > 0 ? 'var(--warning)' : 'var(--info)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>In Rate-Limit Cooldown</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>{rateLimitedKeys}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              background: 'rgba(249, 115, 22, 0.18)',
              color: '#fb923c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Current Priority 1 Provider</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', textTransform: 'capitalize' }}>
              {primaryKey ? `${primaryKey.label} (${primaryKey.provider})` : 'Environment Gemini Fallback'}
            </div>
          </div>
        </div>
      </div>

      {/* Keys Table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Key Label & Mask</th>
              <th>Model Identifier</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Usage Stats</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && keys.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div className="state-center" style={{ padding: '40px' }}>
                    <div className="spinner" />
                  </div>
                </td>
              </tr>
            )}

            {!loading && keys.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div className="state-center" style={{ padding: '40px' }}>
                    <div className="state-icon">🤖</div>
                    <p style={{ fontWeight: 600, color: '#f8fafc' }}>No database LLM keys configured yet</p>
                    <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '400px', margin: '4px auto 16px auto' }}>
                      The AI assistant is currently using the fallback environment key. Add your DeepSeek, Gemini, or Groq
                      keys to enable dynamic routing and UI key governance.
                    </p>
                    {isSuperAdmin && (
                      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                        ＋ Add First LLM Key
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}

            {keys.map((k) => {
              const pStyle = PROVIDER_COLORS[k.provider] || PROVIDER_COLORS.deepseek;
              const isCoolingDown =
                k.status === 'rate_limited' || (k.cooldownUntil && new Date(k.cooldownUntil) > new Date());
              const cooldownDate = k.cooldownUntil ? new Date(k.cooldownUntil) : null;
              const remainingSec = cooldownDate
                ? Math.max(0, Math.round((cooldownDate.getTime() - Date.now()) / 1000))
                : 0;

              return (
                <tr key={k._id}>
                  {/* Provider */}
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: pStyle.bg,
                        color: pStyle.text,
                        border: `1px solid ${pStyle.border}`,
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      ● {k.provider}
                    </span>
                  </td>

                  {/* Label & Mask */}
                  <td>
                    <div style={{ fontWeight: 600, color: '#f8fafc' }}>{k.label}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>{k.keyMasked}</div>
                  </td>

                  {/* Model */}
                  <td>
                    <div style={{ fontWeight: 500, color: '#e2e8f0', fontSize: '13px' }}>{k.model}</div>
                    {k.baseUrl && (
                      <div style={{ fontSize: '11px', color: '#64748b', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {k.baseUrl}
                      </div>
                    )}
                  </td>

                  {/* Priority */}
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: k.priority === 1 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        color: k.priority === 1 ? 'var(--success-light)' : '#cbd5e1',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: `1px solid ${k.priority === 1 ? 'rgba(16, 185, 129, 0.3)' : 'var(--border)'}`,
                      }}
                    >
                      Priority {k.priority} {k.priority === 1 && '⭐'}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    {!k.isActive ? (
                      <span className="badge badge-gray" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Disabled
                      </span>
                    ) : isCoolingDown ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: 'var(--warning-bg)',
                            color: 'var(--warning)',
                            border: '1px solid var(--warning-border)',
                            fontSize: '11px',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Clock size={12} /> Cooldown ({remainingSec}s)
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          style={{ fontSize: '11px', padding: '2px 6px', height: 'auto' }}
                          onClick={() => handleResetCooldown(k)}
                        >
                          <RotateCcw size={10} style={{ marginRight: '4px' }} /> Reset
                        </button>
                      </div>
                    ) : (
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: 'var(--success-light)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          fontSize: '11px',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <CheckCircle2 size={12} /> Active
                      </span>
                    )}
                  </td>

                  {/* Usage Stats */}
                  <td>
                    <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                      Calls: <strong>{k.stats?.totalCalls || 0}</strong>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Success: {k.stats?.successCalls || 0} | Fail: {k.stats?.failedCalls || 0}
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {/* Test Connection Button */}
                      <button
                        type="button"
                        className="btn btn-ghost btn-icon"
                        title="Test Connection"
                        disabled={testingId === k._id}
                        onClick={() => handleQuickTest(k)}
                      >
                        {testingId === k._id ? <div className="spinner spinner-sm" /> : <Play size={14} />}
                      </button>

                      {/* Enable/Disable Toggle */}
                      <button
                        type="button"
                        className={`btn ${k.isActive ? 'btn-ghost' : 'btn-primary'}`}
                        style={{ fontSize: '11px', padding: '4px 8px', height: '28px' }}
                        onClick={() => handleToggle(k)}
                      >
                        {k.isActive ? 'Disable' : 'Enable'}
                      </button>

                      {/* Edit Button (Super Admin) */}
                      {isSuperAdmin && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-icon"
                          title="Edit Configuration"
                          onClick={() => {
                            setEditingKey(k);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit2 size={14} />
                        </button>
                      )}

                      {/* Delete Button (Super Admin) */}
                      {isSuperAdmin && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-icon"
                          title="Delete Key"
                          style={{ color: 'var(--danger)' }}
                          onClick={() => setDeleteTarget(k)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Explanatory Routing Information Card */}
      <div
        className="card"
        style={{
          marginTop: '24px',
          padding: '20px',
          background: 'var(--bg-card-elevated)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'rgba(56, 189, 248, 0.15)',
            color: 'var(--info)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Sparkles size={20} />
        </div>
        <div>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#f8fafc' }}>
            How TuitionMaster Dynamic AI Routing Works
          </h4>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
            Customer inquiries are automatically routed to the lowest priority number (e.g. <strong>Priority 1</strong>).
            If Provider #1 (e.g. DeepSeek or Groq) encounters an HTTP 429 rate limit or temporary provider downtime, the engine
            automatically marks it in a 60-second cooldown and <strong>cascades seamlessly to Priority 2</strong> (e.g. Gemini
            or OpenAI) within the <em>exact same request</em>. Your users never experience downtime or interruption!
          </p>
        </div>
      </div>

      {/* Add / Edit Key Modal */}
      <AddEditKeyModal
        isOpen={isModalOpen}
        initialData={editingKey}
        onClose={() => {
          setIsModalOpen(false);
          setEditingKey(null);
        }}
        onSaved={loadKeys}
      />

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <ConfirmModal
          title="Delete LLM Provider Key"
          message={`Are you sure you want to delete "${deleteTarget.label}" (${deleteTarget.provider})? The AI assistant will no longer route queries to this key.`}
          confirmLabel="Delete Key"
          confirmClass="btn-danger"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
