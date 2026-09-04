export default function CategoryModal({
  showCategoryModal,
  editingCategory,
  categoryForm,
  setCategoryForm,
  onClose,
  onSave,
}) {
  if (!showCategoryModal) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          {editingCategory ? 'Edit Curriculum Level' : 'Add Curriculum Level'}
        </div>
        <form onSubmit={onSave}>
          <div className="form-group">
            <label className="form-label">Level / Category Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. +2 Level, Bachelor's in IT, SEE Preparation"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Display Badge / Subtitle</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Grade 11–12 · Science & Management"
              value={categoryForm.badge}
              onChange={(e) => setCategoryForm({ ...categoryForm, badge: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="Brief note on curriculum alignment..."
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingCategory ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
