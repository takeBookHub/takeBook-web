import { API_URL } from "../url.ts";

const aiEndpoints = {
  createChat: API_URL + "ai/create-chat/",
  deleteChat: API_URL + "ai/delete-chat/",
  getChats: API_URL + "ai/get-chats/",
  uploadNotes: API_URL + "ai/upload-notes/",
  chat: API_URL + "ai/chat/",
};

export default aiEndpoints;
