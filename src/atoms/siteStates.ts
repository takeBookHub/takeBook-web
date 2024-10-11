import { atom } from "jotai";

interface ChatInterface {
  _id: string;
  user: string;
  subject: string;
  notes: string;
}

export const currentViewAtom = atom("landing");
export const currentHomeContentAtom = atom("chat");
export const chatsAtom = atom<ChatInterface[]>([]);
export const firstChatLoadAtom = atom(true);
export const chatsLoadingAtom = atom(true);
export const currentChatIdAtom = atom("");
