import { atom } from "jotai";

import { ChatInterface } from "../interfaces/Chat.ts";

export const currentViewAtom = atom("landing");
export const currentHomeContentAtom = atom("chat");
export const chatsAtom = atom<ChatInterface[]>([]);
export const firstChatLoadAtom = atom(true);
export const chatsLoadingAtom = atom(true);
export const currentChatIdAtom = atom("");
