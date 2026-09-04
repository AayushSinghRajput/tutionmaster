export default function SubjectModal({
  showSubjectModal,
  subjectForm,
  setSubjectForm,
  onClose,
  onSave,
}) {
  if (!showSubjectModal) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Add Subject to Level</div>
        <form onSubmit={onSave}>
          <div className="form-group">
            <label className="form-label">Subject Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Compulsory Mathematics, Organic Chemistry, Python"
              value={subjectForm.name}
              onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Applicable Grades (Comma separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 9, 10, Grade 11, Bachelor's"
              value={subjectForm.grades}
              onChange={(e) => setSubjectForm({ ...subjectForm, grades: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Search & AI Match Tags (Comma separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. algebra, geometry, see, calculus, neb"
              value={subjectForm.searchTags}
              onChange={(e) => setSubjectForm({ ...subjectForm, searchTags: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
