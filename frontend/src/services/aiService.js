import api from "./api";

export const aiService = {
  // history: array of { role: 'user' | 'assistant', content: string }
  sendMessage: (message, history = []) =>
    api.post("/ai/chat", { message, history }).then((res) => res.data),
};
