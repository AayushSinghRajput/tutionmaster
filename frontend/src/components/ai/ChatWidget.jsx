import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { aiService } from "../../services/aiService";
import TeacherCard from "../common/TeacherCard";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm the TuitionMaster assistant. I can help you find tutors by name, subject, location, hourly rate, teaching mode, availability, or experience.\n\nTry asking:\n- \"Find a Math tutor in Kathmandu.\"\n- \"Is there a teacher named Aayush?\"\n- \"Find a tutor under Rs. 500/hour who teaches online.\"",
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
          content: "Sorry, something went wrong reaching the assistant. Please try again.",
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
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-brand-700 hover:bg-brand-800 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm h-[32rem] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
          <div className="bg-brand-700 text-white px-4 py-3 flex items-center gap-2 shrink-0">
            <Bot size={20} />
            <span className="font-semibold">TuitionMaster Assistant</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-stone-50">
            {messages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                      message.role === "user"
                        ? "bg-brand-600 text-white rounded-br-sm"
                        : "bg-white border border-stone-200 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>

                {message.results?.length > 0 && (
                  <div className="space-y-3">
                    {message.results.map((result) => (
                      <div key={result._id} className="scale-[0.97] origin-top-left">
                        <TeacherCard teacher={result} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="border-t border-stone-200 p-3 flex items-center gap-2 shrink-0 bg-white">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about tutors, subjects, or TuitionMaster..."
              className="flex-1 min-w-0 px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="w-9 h-9 shrink-0 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-40 text-white flex items-center justify-center"
              aria-label="Send"
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
