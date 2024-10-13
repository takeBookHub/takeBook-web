import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import Cookie from "universal-cookie";

import {
  createChat,
  deleteChat,
  getChats,
  uploadNotes,
  chat,
} from "../../utils/api/requests/ai.requests.ts";

import {
  chatsAtom,
  chatsLoadingAtom,
  currentChatIdAtom,
  firstChatLoadAtom,
} from "../../atoms/siteStates.ts";

import Input from "../Input";
import Button from "../Button";
import Message from "../Chat/Message.tsx";

import { ChatInterface, ChatMessage } from "../../interfaces/Chat.ts";

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
  const [isNotesPopupOpen, setIsNotesPopupOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [isNotesUploadLoading, setIsNotesUploadLoading] = useState(false);
  const [notesErrorMessage, setNotesErrorMessage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const cookies = new Cookie();
  const token = cookies.get("x-auth-token");

  const createChatRequest = async () => {
    setIsCreationLoading(true);
    const response = await createChat(token, subjectInput);
    if (response.success) {
      await getChatsRequest();
      setIsSubjectPopupOpen(false);
      setSubjectInput("");
    } else {
      setErrorMessage(response.error);
    }
    setIsCreationLoading(false);
  };

  const deleteChatRequest = async (subject: string) => {
    await deleteChat(token, subject);
    await getChatsRequest();
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

  const uploadNotesRequest = async () => {
    setIsNotesUploadLoading(true);
    const response = await uploadNotes(token, currentChatId, notes);
    if (!response.success) {
      setNotesErrorMessage(response.error);
    } else {
      setIsNotesPopupOpen(false);
    }
    setIsNotesUploadLoading(false);
  };

  const chatRequest = async () => {
    setIsThinking(true);
    const currentChat = chats.find((element) => element._id === currentChatId);
    currentChat?.history.push({ role: "user", message: prompt });
    const updatedChats = chats.map((chat) => {
      if (chat._id === currentChatId) return currentChat;
      return chat;
    });
    setChats(updatedChats as ChatInterface[]);
    const response = await chat(token, currentChatId, prompt);
    if (response.success) {
      const updatedChats = await getChats(token);
      setChats(updatedChats.chats);
    }
    setIsThinking(false);
  };

  useEffect(() => {
    if (chats.length === 0 && firstLoad) getChatsRequest();

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (errorMessage.length > 0) {
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }

    if (notesErrorMessage.length > 0) {
      setTimeout(() => {
        setNotesErrorMessage("");
      }, 10000);
    }
  }, [errorMessage, notesErrorMessage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats, currentChatId]);

  return (
    <div className={"w-full h-full flex justify-center relative p-4 "+(chats.length === 0 ? "items-center" : "items-start")}>
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

      {isNotesPopupOpen && (
        <div className="w-full h-full absolute">
          <div
            className="h-full w-full left-0 bg-black opacity-30 fixed z-10"
            onClick={() => setIsNotesPopupOpen(false)}
          />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[800px] h-[80%] lg:h-[50%] flex flex-col items-center justify-center p-4 bg-white rounded-lg gap-6 z-20">
            <span className="font-bold">Upload notes</span>
            <div className="flex flex-col w-full h-full gap-1">
              <textarea
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                className="bg-[#EFEFEF] border border-[#D8D8D8] resize-none h-full rounded-lg outline-none p-2"
              />
            </div>
            {notesErrorMessage.length > 0 && (
              <span className="font-semibold text-red-400">
                {notesErrorMessage}
              </span>
            )}
            <Button
              disabled={isNotesUploadLoading}
              onClick={() => uploadNotesRequest()}
              className="w-full"
            >
              Upload
            </Button>
          </div>
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
        <div className="w-full h-full max-w-[800px] flex flex-col items-center justify-between">
          <div className="w-full p-4 bg-[#C0F4C1] flex items-center gap-3 rounded-lg">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img
                className="h-[14px] select-none"
                src="/icons/hamburger-menu.svg"
                alt="Hamburguer Menu Icon"
                draggable="false"
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
              <div
                className="w-full h-full flex flex-col gap-8 py-6 px-2 overflow-y-auto"
                style={{
                  height: "100%",
                  maxHeight:
                    screenHeight - (screenWidth <= 1024 ? 250 : 150) + "px",
                  scrollbarWidth: "none",
                }}
                ref={chatContainerRef}
              >
                {chats
                  .find((element) => element._id === currentChatId)
                  ?.history.map(
                    (
                      item: {
                        role: ChatMessage["author"];
                        message: string;
                      },
                      index: number,
                    ) => (
                      <Message key={index} author={item.role}>
                        {item.message}
                      </Message>
                    ),
                  )}
                {isThinking && <Message author="model">Thinking...</Message>}
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await chatRequest();
                }}
                className="bg-[#EFEFEF] rounded-lg w-full flex p-4 gap-3"
              >
                <button onClick={() => setIsNotesPopupOpen(true)} type="button">
                  <img
                    className="select-none"
                    src="/icons/add-file.svg"
                    alt="Add File Icon"
                    draggable="false"
                  />
                </button>
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent placeholder:text-[#999999] placeholder:select-none outline-none font-light"
                  placeholder="Enter your prompt...."
                />
                <button type="submit">
                  <img
                    className="select-none"
                    src="/icons/send.svg"
                    alt="Send Icon"
                    draggable="false"
                  />
                </button>
              </form>
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
