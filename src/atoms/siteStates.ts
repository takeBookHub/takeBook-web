import { atom } from "jotai";

export const currentViewAtom = atom("landing");
export const currentHomeContentAtom = atom("chat");
export const chatsAtom = atom({});
export const firstChatLoadAtom = atom(true);
export const chatsLoadingAtom = atom(true);