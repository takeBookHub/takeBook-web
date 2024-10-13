import Markdown from "react-markdown";

import { ChatMessage } from "../../interfaces/Chat.ts";

export default function Message({ author, children }: ChatMessage) {
  switch (author) {
    case "model":
      return (
        <div className="rounded-lg gap-2 w-full flex flex-col justify-start">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full h-11 select-none"
              src="/images/pandy-profile-picture.svg"
              alt="Pandy's Profile Picture"
              draggable="false"
            />
            <span className="font-['Crimson_Text'] text-xl font-semibold select-none">
              Pandy
            </span>
          </div>
          <Markdown className="w-full font-light">{children}</Markdown>
        </div>
      );
    case "user":
      return (
        <div className="w-full flex justify-end">
          <span className="bg-[#C0F4C1] text-[#23771E] max-w-[90%] sm:max-w-[450px] font-semibold rounded-lg p-4">
            {children}
          </span>
        </div>
      );
  }
}
