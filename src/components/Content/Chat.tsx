import { useState } from "react";

import Input from "../Input";
import Button from "../Button.tsx";

export default function Chat() {
  const [isSubjectPopupOpen, setIsSubjectPopupOpen] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {isSubjectPopupOpen && (
        <div className="w-full h-full absolute">
          <div
            className="h-full w-full left-0 bg-black opacity-30 fixed z-10"
            onClick={() => setIsSubjectPopupOpen(false)}
          />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-96 flex flex-col items-center justify-center p-4 bg-white rounded-lg gap-6 z-20">
            <span className="font-bold">Add a new subject</span>
            <div className="flex flex-col w-full gap-1">
              <span className="font-semibold text-sm">Subject name</span>
              <Input
                className="w-full"
                type="text"
                placeholder="Science, Literature, Marketing..."
              />
            </div>
            <Button className="w-full">
              <span>Create</span>
              <img
                className="h-5"
                src="/icons/half-open-book.svg"
                alt="Half-open Book Icon"
              />
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 items-center">
        <span className="font-semibold">There’s nothing here yet!</span>
        <span>
          Tap the <strong>+</strong> button to add your first subject
        </span>
      </div>
      <button
        className="absolute bottom-4 right-4 p-4 bg-[#C0F4C1] rounded-lg"
        onClick={() => setIsSubjectPopupOpen(true)}
      >
        <img src="/icons/plus.svg" alt="Plus Icon" />
      </button>
    </div>
  );
}
