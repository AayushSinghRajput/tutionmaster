import { MapPin } from 'lucide-react';
import { NEPAL_STATES } from '../../constants';

export default function AddressStep({
  formData,
  setFormData,
  isCustomCity,
  customCityName,
  setCustomCityName,
  onStateChange,
  onCitySelectChange,
  citiesForSelectedState,
}) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(189, 138, 46, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-300)',
          }}
        >
          <MapPin size={18} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
            Step 2: Profile & Address Information
          </h3>
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Personal details, province, and city aligned with Nepal geography
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ramesh Karki"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contact Email *</label>
          <input
            type="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="tutor@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+977 98XXXXXXXX"
          />
        </div>
      </div>

      {/* Exact Address Fields: Street, Province, City */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        <div className="form-group">
          <label className="form-label">Street Address *</label>
          <input
            type="text"
            className="form-input"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="e.g. Tinkune, New Baneshwor"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">State / Province *</label>
          <select
            className="form-select"
            value={formData.state}
            onChange={onStateChange}
            required
          >
            {NEPAL_STATES.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">City *</label>
          <select
            className="form-select"
            value={isCustomCity ? 'Other' : formData.city}
            onChange={onCitySelectChange}
            required
          >
            {citiesForSelectedState.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="Other">Other (Specify Custom City)</option>
          </select>
        </div>

        {isCustomCity && (
          <div className="form-group">
            <label className="form-label">Specify Custom City *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Banepa, Dhading Besi, Gorkha Bazar"
              value={customCityName}
              onChange={(e) => {
                const val = e.target.value;
                setCustomCityName(val);
                setFormData((prev) => ({ ...prev, city: val }));
              }}
              required
            />
          </div>
        )}
      </div>
    </div>
  );
}
