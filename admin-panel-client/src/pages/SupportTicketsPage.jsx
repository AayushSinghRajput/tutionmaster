import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supportAdminService } from '../services/supportAdminService';

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Inspection & Reply Modal state
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState('Resolved');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [activeTab, page]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await supportAdminService.getTickets({
        page,
        limit: 15,
        status: activeTab,
        search,
      });
      setTickets(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch support tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchTickets();
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await supportAdminService.updateStatus(ticketId, newStatus);
      toast.success(`Ticket status updated to ${newStatus}`);
      fetchTickets();
      if (selectedTicket && selectedTicket._id === ticketId) {
        setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      toast.error('Reply message cannot be empty');
      return;
    }

    setSubmittingReply(true);
    try {
      const res = await supportAdminService.replyToTicket(selectedTicket._id, {
        replyMessage,
        status: replyStatus,
      });
      toast.success('Reply submitted and user notified!');
      setSelectedTicket(res.data);
      setReplyMessage('');
      fetchTickets();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Open':
        return 'badge-danger';
      case 'In Progress':
        return 'badge-warning';
      case 'Resolved':
        return 'badge-success';
      case 'Closed':
        return 'badge-secondary';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>🎫 Customer Support Tickets</h1>
          <p>Inspect, manage status, and send replies for user support requests.</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((tab) => (
              <button
                key={tab}
                className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                style={{ fontSize: '13px', padding: '6px 14px' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search form */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search ID, name, email, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '260px' }}
            />
            <button type="submit" className="btn btn-secondary">
              🔍 Search
            </button>
          </form>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div className="spinner" />
          </div>
        ) : tickets.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No support tickets found.
          </div>
        ) : (
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Ticket ID</th>
                <th style={{ padding: '12px 16px' }}>User / Contact</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Subject</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, fontFamily: 'monospace' }}>
                    {ticket.ticketId}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600 }}>{ticket.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ticket.contactEmail}</div>
                    {ticket.contactPhone && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>📞 {ticket.contactPhone}</div>}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="badge" style={{ background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                      {ticket.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', maxWidth: '240px' }} className="truncate">
                    {ticket.subject}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      className={`badge ${getStatusBadgeClass(ticket.status)}`}
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                      style={{ border: 'none', cursor: 'pointer', fontWeight: 600, padding: '4px 8px', borderRadius: '6px' }}
                    >
                      <option value="Open">🔴 Open</option>
                      <option value="In Progress">🟡 In Progress</option>
                      <option value="Resolved">🟢 Resolved</option>
                      <option value="Closed">⚪ Closed</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: '12px', padding: '4px 10px' }}
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setReplyMessage(ticket.adminReply?.message || '');
                        setReplyStatus(ticket.status === 'Open' ? 'Resolved' : ticket.status);
                      }}
                    >
                      💬 Inspect & Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '16px' }}>
            <button className="btn btn-ghost" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              ← Prev
            </button>
            <span style={{ padding: '6px 12px', fontSize: '14px' }}>
              Page {page} of {totalPages}
            </span>
            <button className="btn btn-ghost" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Ticket Details & Reply Modal */}
      {selectedTicket && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTicket(null);
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px', color: 'var(--brand-primary)' }}>
                  {selectedTicket.ticketId}
                </span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '18px' }}>{selectedTicket.subject}</h2>
              </div>
              <button
                className="btn btn-ghost"
                onClick={() => setSelectedTicket(null)}
                style={{ fontSize: '18px', padding: '4px 8px' }}
              >
                ✖
              </button>
            </div>

            {/* Ticket Info */}
            <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div><strong>User Name:</strong> {selectedTicket.name}</div>
                <div><strong>Category:</strong> {selectedTicket.category}</div>
                <div><strong>Email:</strong> {selectedTicket.contactEmail}</div>
                <div><strong>Phone:</strong> {selectedTicket.contactPhone || 'N/A'}</div>
              </div>
              <div><strong>Submitted Date:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</div>
            </div>

            {/* User Message */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '6px' }}>
                User Request Message:
              </label>
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid var(--border)',
                  padding: '12px',
                  borderRadius: '8px',
                  whiteSpace: 'pre-wrap',
                  fontSize: '14px',
                  color: '#334155',
                }}
              >
                {selectedTicket.message}
              </div>
            </div>

            {/* Existing Admin Reply if any */}
            {selectedTicket.adminReply && selectedTicket.adminReply.message && (
              <div style={{ marginBottom: '20px', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#166534', marginBottom: '4px' }}>
                  Previous Admin Reply (by {selectedTicket.adminReply.repliedBy || 'Admin'} on {new Date(selectedTicket.adminReply.repliedAt).toLocaleString()}):
                </div>
                <div style={{ fontSize: '13px', color: '#14532d', whiteSpace: 'pre-wrap' }}>
                  {selectedTicket.adminReply.message}
                </div>
              </div>
            )}

            {/* Reply Form */}
            <form onSubmit={handleSendReply}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>
                  Write Admin Reply Message:
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Type your official support response to the user..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  style={{ width: '100%', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600 }}>Set Status:</label>
                  <select
                    className="form-control"
                    value={replyStatus}
                    onChange={(e) => setReplyStatus(e.target.value)}
                    style={{ fontSize: '13px', padding: '4px 8px' }}
                  >
                    <option value="In Progress">🟡 In Progress</option>
                    <option value="Resolved">🟢 Resolved</option>
                    <option value="Closed">⚪ Closed</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setSelectedTicket(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submittingReply}>
                    {submittingReply ? 'Sending...' : '✉️ Send Reply'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
