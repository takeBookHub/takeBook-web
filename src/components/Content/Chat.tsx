import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import Cookie from "universal-cookie";

import { createChat, getChats } from "../../utils/api/requests/ai.requests.ts";

import {
  chatsAtom,
  chatsLoadingAtom,
  firstChatLoadAtom,
} from "../../atoms/siteStates.ts";

import Input from "../Input";
import Button from "../Button";

export default function Chat() {
  const [chats, setChats] = useAtom(chatsAtom);
  const [firstLoad, setFirstLoad] = useAtom(firstChatLoadAtom);
  const [chatsLoading, setChatsLoading] = useAtom(chatsLoadingAtom);

  const [subjectInput, setSubjectInput] = useState("");
  const [isCreationLoading, setIsCreationLoading] = useState(false);
  const [isSubjectPopupOpen, setIsSubjectPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cookies = new Cookie();
  const token = cookies.get("x-auth-token");

  const createChatRequest = async () => {
    setIsCreationLoading(true);
    const response = await createChat(token, subjectInput);
    if (response.success) {
      await getChatsRequest();
      setIsSubjectPopupOpen(false);
    } else {
      setErrorMessage(response.error);
    }
    setIsCreationLoading(false);
  };

  const getChatsRequest = async () => {
    const response = await getChats(token);
    if (response.success) {
      setChats(response.chats);
      setChatsLoading(false);
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    if (Object.keys(chats).length === 0 && firstLoad) getChatsRequest();
  }, []);

  useEffect(() => {
    if (errorMessage.length > 0) {
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  }, [errorMessage]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {isSubjectPopupOpen && (
        <div className="w-full h-full absolute">
          <div
            className="h-full w-full left-0 bg-black opacity-30 fixed z-10"
            onClick={() => setIsSubjectPopupOpen(false)}
          />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await createChatRequest();
            }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-96 flex flex-col items-center justify-center p-4 bg-white rounded-lg gap-6 z-20"
          >
            <span className="font-bold">Add a new subject</span>
            <div className="flex flex-col w-full gap-1">
              <span className="font-semibold text-sm">Subject name</span>
              <Input
                className="w-full"
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Science, Literature, Marketing..."
              />
            </div>
            <Button className="w-full" disabled={isCreationLoading}>
              <span>Create</span>
              <img
                className="h-5"
                src="/icons/half-open-book.svg"
                alt="Half-open Book Icon"
              />
            </Button>
            {errorMessage.length > 0 && (
              <span className="text-red-400 text-center">{errorMessage}</span>
            )}
          </form>
        </div>
      )}

      {chatsLoading && <span>Loading...</span>}

      {Object.keys(chats).length === 0 ? (
        !chatsLoading && (
          <div className="flex flex-col gap-2 items-center">
            <span className="font-semibold">There’s nothing here yet!</span>
            <span>
              Tap the <strong>+</strong> button to add your first subject
            </span>
          </div>
        )
      ) : (
        <div>chats</div>
      )}

      {Object.keys(chats).length === 0 && !chatsLoading && (
        <button
          className="absolute bottom-4 right-4 p-4 bg-[#C0F4C1] rounded-lg"
          onClick={() => setIsSubjectPopupOpen(true)}
        >
          <img src="/icons/plus.svg" alt="Plus Icon" />
        </button>
      )}
    </div>
  );
}
