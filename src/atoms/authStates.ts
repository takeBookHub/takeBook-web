import { atom } from "jotai";

export const authTypeAtom = atom(0); // 0: Register, 1: Log In
export const isAuthenticatedAtom = atom(false);
export const usernameAtom = atom("");
export const emailAtom = atom("");
export const passwordAtom = atom("");
