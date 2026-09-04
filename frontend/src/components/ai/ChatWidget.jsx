import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import { aiService } from "../../services/aiService";
import TeacherCard from "../common/TeacherCard";
import SupportTicketCard from "./SupportTicketCard";
import JobVacancyCard from "./JobVacancyCard";
import ChatMessageRenderer from "./ChatMessageRenderer";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm the TuitionMaster AI Assistant. I can help you find private tutors, search tuition vacancies, answer platform questions, or issue a customer support ticket.\n\nTry asking:\n- \"Find a Math tutor in Kathmandu.\"\n- \"Are there tuition vacancies for Science?\"\n- \"Help me with profile creation or issue a support ticket.\"",
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending, isOpen]);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const history = messages
      .filter((message) => message !== WELCOME_MESSAGE)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsSending(true);

    try {
      const response = await aiService.sendMessage(trimmed, history);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.message, results: response.results },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm experiencing a brief network pause, but I'm still here to help!\n\n- Browse our tutor directory at [/teachers](/teachers)\n- Check tuition job vacancies at [/jobs](/jobs)\n- Reach out directly to our support team on **WhatsApp (+977 980-5981168)** or [/contact](/contact).",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-brand-700 hover:bg-brand-800 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm h-[32rem] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-brand-700 text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">TuitionMaster Assistant</h3>
                <span className="text-[10px] text-brand-200">AI Powered Customer Support</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-stone-50">
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div className={`flex items-start gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                      message.role === "user"
                        ? "bg-brand-600 text-white rounded-tr-xs"
                        : "bg-white border border-stone-200 text-gray-800 rounded-tl-xs"
                    }`}
                  >
                    <ChatMessageRenderer content={message.content} role={message.role} />
                  </div>
                </div>

                {/* Interactive Results Cards (Support Tickets, Jobs, Teachers) */}
                {message.results?.length > 0 && (
                  <div className="w-full max-w-full overflow-hidden space-y-2 pt-1">
                    {message.results.map((result) => (
                      <div key={result._id || result.id} className="w-full max-w-full overflow-hidden">
                        {result.type === "support_ticket" && (
                          <SupportTicketCard ticket={result} />
                        )}
                        {result.type === "job" && (
                          <JobVacancyCard job={result} />
                        )}
                        {result.type === "teacher" && (
                          <TeacherCard teacher={result} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs px-3.5 py-2 flex items-center gap-2 text-xs text-gray-500 shadow-xs">
                  <Loader2 size={14} className="animate-spin text-brand-600" />
                  <span>Checking TuitionMaster...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="border-t border-stone-200 p-3 flex items-center gap-2 shrink-0 bg-white">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question or request support..."
              className="flex-1 min-w-0 px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-stone-50/50"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="w-9 h-9 shrink-0 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-40 text-white flex items-center justify-center shadow-xs transition-transform active:scale-95"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
