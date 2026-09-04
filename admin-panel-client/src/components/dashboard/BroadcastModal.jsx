import { Megaphone } from 'lucide-react';

export default function BroadcastModal({
  showBroadcastModal,
  broadcastMessage,
  setBroadcastMessage,
  onClose,
  onSend,
}) {
  if (!showBroadcastModal) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Broadcast Announcement</div>
        <div className="modal-message">
          Send a real-time banner announcement to all active tutors and students on TuitionMaster.
        </div>
        <form onSubmit={onSend}>
          <div className="form-group">
            <label className="form-label">Announcement Content</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="e.g. Special IOE and Medical Entrance preparation workshops launching this week!"
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Megaphone size={16} />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
