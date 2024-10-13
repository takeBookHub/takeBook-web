import call from "../call";
import aiEndpoints from "../endpoints/ai.endpoints";

export function createChat(token: string, subject: string) {
  return call(aiEndpoints.createChat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ subject }),
  });
}

export function deleteChat(token: string, subject: string) {
  return call(aiEndpoints.deleteChat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ subject }),
  });
}

export function getChats(token: string) {
  return call(aiEndpoints.getChats, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}

export function uploadNotes(token: string, chatId: string, notes: string) {
  return call(aiEndpoints.uploadNotes, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ chatId, notes }),
  });
}

export function chat(token: string, chatId: string, message: string) {
  return call(aiEndpoints.chat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ chatId, message }),
  });
}
