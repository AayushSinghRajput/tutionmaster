import { useState, useEffect } from 'react';
import {
  X,
  Eye,
  EyeOff,
  Activity,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  KeyRound,
  Layers,
  Cpu,
  Globe,
  Lock,
  Zap,
} from 'lucide-react';
import { llmKeyAdminService } from '../../services/llmKeyAdminService';
import toast from 'react-hot-toast';

const PROVIDER_PRESETS = {
  deepseek: {
    name: 'DeepSeek',
    badge: 'DeepSeek',
    subtext: 'High quality & affordable',
    color: '#0ea5e9',
    accentBg: 'rgba(14, 165, 233, 0.12)',
    borderHover: 'rgba(14, 165, 233, 0.4)',
    defaultModel: 'deepseek-chat',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    defaultBaseUrl: 'https://api.deepseek.com',
    keyPlaceholder: 'sk-...',
  },
  gemini: {
    name: 'Google Gemini',
    badge: 'Gemini',
    subtext: 'Generous free tier',
    color: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    borderHover: 'rgba(56, 189, 248, 0.4)',
    defaultModel: 'gemini-2.5-flash',
    models: ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'],
    defaultBaseUrl: '',
    keyPlaceholder: 'AIzaSy...',
  },
  groq: {
    name: 'Groq',
    badge: 'Groq',
    subtext: 'Ultra-low latency',
    color: '#f97316',
    accentBg: 'rgba(249, 115, 22, 0.12)',
    borderHover: 'rgba(249, 115, 22, 0.4)',
    defaultModel: 'llama-3.3-70b-versatile',
    models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
    defaultBaseUrl: 'https://api.groq.com/openai/v1',
    keyPlaceholder: 'gsk_...',
  },
  openai: {
    name: 'OpenAI',
    badge: 'OpenAI',
    subtext: 'Industry standard',
    color: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    borderHover: 'rgba(16, 185, 129, 0.4)',
    defaultModel: 'gpt-4o-mini',
    models: ['gpt-4o-mini', 'gpt-4o'],
    defaultBaseUrl: '',
    keyPlaceholder: 'sk-proj-...',
  },
  claude: {
    name: 'Claude',
    badge: 'Claude',
    subtext: 'Complex reasoning',
    color: '#c084fc',
    accentBg: 'rgba(192, 132, 252, 0.12)',
    borderHover: 'rgba(192, 132, 252, 0.4)',
    defaultModel: 'claude-3-5-haiku-20241022',
    models: ['claude-3-5-haiku-20241022', 'claude-3-5-sonnet-20241022'],
    defaultBaseUrl: '',
    keyPlaceholder: 'sk-ant-...',
  },
};

export default function AddEditKeyModal({ isOpen, onClose, onSaved, initialData }) {
  const isEditing = Boolean(initialData?._id);

  const [provider, setProvider] = useState(initialData?.provider || 'deepseek');
  const [label, setLabel] = useState(initialData?.label || '');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(initialData?.model || 'deepseek-chat');
  const [customModel, setCustomModel] = useState(false);
  const [baseUrl, setBaseUrl] = useState(initialData?.baseUrl || '');
  const [priority, setPriority] = useState(initialData?.priority || 1);
  const [weight, setWeight] = useState(initialData?.weight || 1);
  const [isActive, setIsActive] = useState(initialData?.isActive !== undefined ? initialData.isActive : true);

  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setProvider(initialData.provider || 'deepseek');
      setLabel(initialData.label || '');
      setModel(initialData.model || '');
      setBaseUrl(initialData.baseUrl || '');
      setPriority(initialData.priority || 1);
      setWeight(initialData.weight || 1);
      setIsActive(initialData.isActive !== undefined ? initialData.isActive : true);
      setApiKey('');
    } else {
      const preset = PROVIDER_PRESETS.deepseek;
      setProvider('deepseek');
      setLabel('DeepSeek Primary');
      setModel(preset.defaultModel);
      setBaseUrl(preset.defaultBaseUrl);
      setPriority(1);
      setWeight(1);
      setIsActive(true);
      setApiKey('');
    }
    setTestResult(null);
  }, [initialData, isOpen]);

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
    const preset = PROVIDER_PRESETS[newProvider];
    if (preset) {
      if (!isEditing || !label) {
        setLabel(`${preset.badge} Primary`);
      }
      setModel(preset.defaultModel);
      setBaseUrl(preset.defaultBaseUrl);
    }
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    if (!isEditing && !apiKey.trim()) {
      toast.error('Please enter an API Key to test');
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const payload = isEditing && !apiKey.trim()
        ? { id: initialData._id }
        : {
            provider,
            apiKey: apiKey.trim(),
            model: model.trim(),
            baseUrl: baseUrl.trim() || undefined,
          };

      const res = await llmKeyAdminService.test(payload);
      if (res.data?.success) {
        setTestResult({
          success: true,
          latencyMs: res.data.data?.latencyMs,
          message: res.data.data?.message || 'Connection test succeeded!',
        });
        toast.success(`Connected! Latency: ${res.data.data?.latencyMs}ms`);
      } else {
        setTestResult({
          success: false,
          error: res.data?.data?.error || 'Test failed',
        });
        toast.error('Connection failed');
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Connection failed';
      setTestResult({
        success: false,
        error: errMsg,
      });
      toast.error(errMsg);
    } finally {
      setTesting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!label.trim()) {
      toast.error('Please provide a label');
      return;
    }
    if (!isEditing && !apiKey.trim()) {
      toast.error('Please enter an API Key');
      return;
    }
    if (!model.trim()) {
      toast.error('Please provide a model name');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        provider,
        label: label.trim(),
        model: model.trim(),
        baseUrl: baseUrl.trim() || null,
        priority: Number(priority) || 1,
        weight: Number(weight) || 1,
        isActive,
      };

      if (apiKey.trim()) {
        payload.apiKey = apiKey.trim();
      }

      if (isEditing) {
        await llmKeyAdminService.update(initialData._id, payload);
        toast.success('LLM Key updated successfully');
      } else {
        await llmKeyAdminService.create(payload);
        toast.success('LLM Key added successfully');
      }

      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save LLM Key');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const currentPreset = PROVIDER_PRESETS[provider] || PROVIDER_PRESETS.deepseek;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        style={{
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(138, 56, 97, 0.35), rgba(47, 122, 94, 0.2))',
                border: '1px solid var(--border-brand)',
                color: 'var(--brand-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
                {isEditing ? 'Configure LLM Key' : 'Add New LLM Key'}
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
                Set provider credentials, model parameters, and priority fallback
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            style={{ width: '32px', height: '32px', borderRadius: '8px' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Provider Selector Cards */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} style={{ color: 'var(--brand-400)' }} />
              <span>Select LLM Provider</span>
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '8px',
              }}
            >
              {Object.entries(PROVIDER_PRESETS).map(([key, info]) => {
                const selected = provider === key;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isEditing}
                    onClick={() => handleProviderChange(key)}
                    style={{
                      position: 'relative',
                      padding: '12px 6px',
                      borderRadius: '10px',
                      border: selected
                        ? `1.5px solid ${info.color}`
                        : '1px solid var(--border)',
                      background: selected ? 'var(--bg-card-elevated)' : 'var(--bg-input)',
                      boxShadow: selected
                        ? `0 0 0 1px ${info.color}, 0 4px 14px rgba(0, 0, 0, 0.4)`
                        : 'none',
                      cursor: isEditing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: isEditing && !selected ? 0.45 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: info.color,
                        boxShadow: selected ? `0 0 8px ${info.color}` : 'none',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: selected ? '#ffffff' : '#cbd5e1',
                        letterSpacing: '-0.2px',
                      }}
                    >
                      {info.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Label */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Key Label / Friendly Name</span>
              <span style={{ color: 'var(--danger)', fontSize: '12px' }}>*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. DeepSeek Production Primary"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>

          {/* API Key Input */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={14} style={{ color: 'var(--brand-400)' }} />
                <span>{isEditing ? 'Replace API Key (Optional)' : 'Provider API Key'}</span>
                {!isEditing && <span style={{ color: 'var(--danger)', fontSize: '12px' }}>*</span>}
              </label>
              {isEditing && (
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontFamily: 'monospace' }}>
                  Current: {initialData?.keyMasked}
                </span>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type={showKey ? 'text' : 'password'}
                className="form-input"
                placeholder={isEditing ? 'Leave blank to preserve current key' : currentPreset.keyPlaceholder}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestResult(null);
                }}
                required={!isEditing}
                style={{ paddingRight: '42px', fontFamily: apiKey ? 'monospace' : 'inherit' }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                }}
                title={showKey ? 'Hide Key' : 'Reveal Key'}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Security Callout Pill */}
            <div
              style={{
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#64748b',
              }}
            >
              <Lock size={12} style={{ color: 'var(--gold-400)' }} />
              <span>AES-256-GCM encrypted before database storage. Plaintext is never logged or exposed.</span>
            </div>
          </div>

          {/* Model and Priority Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '14px',
              marginBottom: '16px',
            }}
          >
            {/* Model Field */}
            <div className="form-group" style={{ margin: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={14} style={{ color: 'var(--brand-400)' }} />
                  <span>Model Identifier</span>
                  <span style={{ color: 'var(--danger)', fontSize: '12px' }}>*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setCustomModel(!customModel)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.74rem',
                    color: 'var(--info)',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                  }}
                >
                  {customModel ? 'Use Presets' : '+ Custom Model'}
                </button>
              </div>

              {!customModel ? (
                <select
                  className="form-select"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  {currentPreset.models.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. deepseek-reasoner"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              )}
            </div>

            {/* Priority Field */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} style={{ color: 'var(--gold-400)' }} />
                <span>Priority (1 = Highest)</span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="form-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </div>

          {/* Base URL (Optional) */}
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} style={{ color: 'var(--brand-400)' }} />
              <span>Base URL (Optional Custom API Endpoint)</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder={currentPreset.defaultBaseUrl || 'Default vendor endpoint'}
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>

          {/* Enable Switch Row */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'var(--bg-card-elevated)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#f8fafc' }}>
                Enable for Live Routing
              </div>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                When enabled, the AI Agent will immediately route inquiries to this key.
              </div>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <span className="toggle-track"></span>
              <span className="toggle-thumb"></span>
            </label>
          </div>

          {/* Test Connection Diagnostic Banner */}
          {testResult && (
            <div
              style={{
                marginBottom: '18px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: testResult.success ? 'var(--success-bg)' : 'var(--danger-bg)',
                border: `1px solid ${testResult.success ? 'var(--success-border)' : 'var(--danger-border)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.84rem',
              }}
            >
              {testResult.success ? (
                <CheckCircle2 size={18} style={{ color: 'var(--success-light)', flexShrink: 0 }} />
              ) : (
                <AlertCircle size={18} style={{ color: 'var(--danger)', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, color: testResult.success ? 'var(--success-light)' : '#fca5a5' }}>
                {testResult.success ? (
                  <span>
                    <strong>Connection Verified!</strong> Response received in{' '}
                    <span style={{ fontWeight: 700 }}>{testResult.latencyMs}ms</span>.
                  </span>
                ) : (
                  <span>
                    <strong>Verification Failed:</strong> {testResult.error}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleTestConnection}
              disabled={testing || saving || (!isEditing && !apiKey.trim())}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
              }}
            >
              <Activity size={16} className={testing ? 'spinner' : ''} />
              <span>{testing ? 'Testing Connection...' : 'Test Connection'}</span>
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
                style={{ minWidth: '110px' }}
              >
                {saving ? (
                  <span className="spinner spinner-sm" />
                ) : isEditing ? (
                  'Save Changes'
                ) : (
                  'Add Key'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
