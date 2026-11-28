import api from "./api";

export const supportService = {
  createTicket: (ticketData) => api.post("/support/tickets", ticketData),
};
