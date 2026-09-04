import { CheckCircle2, Ticket, Mail, Phone, Clock, AlertCircle } from "lucide-react";

const SupportTicketCard = ({ ticket }) => {
  if (!ticket) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200 rounded-2xl p-4 shadow-sm space-y-3 font-sans text-xs sm:text-sm my-2">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 leading-tight">Support Ticket Issued</h4>
            <p className="text-[11px] text-emerald-700 font-medium">Recorded in TuitionMaster System</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-mono font-bold text-xs shadow-xs">
          <Ticket size={14} />
          <span>{ticket.ticketId}</span>
        </div>
      </div>

      {/* Ticket Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-emerald-100/60">
        <div>
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Contact Name</span>
          <span className="font-semibold text-gray-800 truncate block">{ticket.name}</span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Category</span>
          <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium text-[11px]">
            {ticket.category}
          </span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Email</span>
          <span className="font-medium text-gray-700 truncate flex items-center gap-1">
            <Mail size={12} className="text-emerald-600 shrink-0" />
            <span className="truncate">{ticket.email}</span>
          </span>
        </div>
        <div>
          <span className="text-gray-400 block text-[10px] uppercase font-semibold">Phone</span>
          <span className="font-medium text-gray-700 flex items-center gap-1">
            <Phone size={12} className="text-emerald-600 shrink-0" />
            <span>{ticket.phone || "N/A"}</span>
          </span>
        </div>
      </div>

      {/* Message Summary */}
      {ticket.message && (
        <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs text-gray-700">
          <span className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">Issue Description</span>
          <p className="italic text-gray-600 leading-relaxed line-clamp-3">"{ticket.message}"</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-xl">
        <Clock size={13} className="shrink-0 text-emerald-600" />
        <span>Status: <strong className="font-semibold text-emerald-900">Open (Under Review)</strong> — Team will reply to {ticket.email}.</span>
      </div>
    </div>
  );
};

export default SupportTicketCard;
