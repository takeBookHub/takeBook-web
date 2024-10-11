import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import Cookie from "universal-cookie";

import {
  createChat,
  deleteChat,
  getChats,
} from "../../utils/api/requests/ai.requests.ts";

import {
  chatsAtom,
  chatsLoadingAtom,
  currentChatIdAtom,
  firstChatLoadAtom,
} from "../../atoms/siteStates.ts";

import Input from "../Input";
import Button from "../Button";

interface ChatInterface {
  _id: string;
  user: string;
  subject: string;
  notes: string;
}

export default function Chat() {
  const [chats, setChats] = useAtom<ChatInterface[]>(chatsAtom);
  const [firstLoad, setFirstLoad] = useAtom(firstChatLoadAtom);
  const [chatsLoading, setChatsLoading] = useAtom(chatsLoadingAtom);
  const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom);

  const [subjectInput, setSubjectInput] = useState("");
  const [isCreationLoading, setIsCreationLoading] = useState(false);
  const [isSubjectPopupOpen, setIsSubjectPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const deleteChatRequest = async (subject: string) => {
    const response = await deleteChat(token, subject);
    if (response.success) {
      await getChatsRequest();
    }
  };

  const getChatsRequest = async () => {
    const response = await getChats(token);
    if (response.success) {
      if (response.chats.length !== 0) setCurrentChatId(response.chats[0]._id);
      setChats(response.chats);
      setChatsLoading(false);
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    if (chats.length === 0 && firstLoad) getChatsRequest();
  }, []);

  useEffect(() => {
    if (errorMessage.length > 0) {
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  }, [errorMessage]);

  return (
    <div className="w-full h-full flex items-center justify-center relative p-4">
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

      {chats.length === 0 ? (
        !chatsLoading && (
          <div className="flex flex-col gap-2 items-center">
            <span className="font-semibold">There’s nothing here yet!</span>
            <span>
              Tap the <strong>+</strong> button to add your first subject
            </span>
          </div>
        )
      ) : (
        <div className="h-full w-full max-w-[800px] flex flex-col items-center justify-between">
          <div className="w-full p-4 bg-[#C0F4C1] flex items-center gap-3 rounded-lg">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img
                className="h-[14px]"
                src="/icons/hamburger-menu.svg"
                alt="Hamburguer Menu Icon"
              />
            </button>
            <span className="text-[#23771e] font-semibold">
              {isMenuOpen
                ? "Your subjects"
                : chats.find((element) => element._id === currentChatId)
                    ?.subject}
            </span>
          </div>
          {isMenuOpen ? (
            <div className="w-full h-full flex flex-col items-center">
              <div className="h-full w-full">
                {chats.map((chat) => (
                  <button
                    key={chat._id}
                    className="w-full p-4 flex items-center justify-between gap-3"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setCurrentChatId(chat._id);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className="h-[14px]"
                        src="/icons/open-book.svg"
                        alt="Open Book Icon"
                      />
                      <span className="font-medium">{chat.subject}</span>
                    </div>
                    <button
                      className="p-4"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await deleteChatRequest(chat.subject);
                      }}
                    >
                      <img src="/icons/minus.svg" alt="Minus Icon" />
                    </button>
                  </button>
                ))}
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="p-4 bg-[#C0F4C1] rounded-lg"
                  onClick={() => setIsSubjectPopupOpen(true)}
                >
                  <img src="/icons/plus.svg" alt="Plus Icon" />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center">
              <div className="h-full w-full"></div>
              <div className="bg-[#EFEFEF] rounded-lg w-full flex p-4 gap-3">
                <button>
                  <img src="/icons/add-file.svg" alt="Add File Icon" />
                </button>
                <input
                  className="w-full bg-transparent placeholder:text-[#999999] outline-none font-light"
                  placeholder="Enter your prompt...."
                />
                <button>
                  <img src="/icons/send.svg" alt="Send Icon" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {chats.length === 0 && !chatsLoading && (
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
