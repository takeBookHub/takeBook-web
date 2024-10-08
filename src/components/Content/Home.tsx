import React from "react";

import { useAtom } from "jotai";
import { currentHomeContentAtom } from "../../atoms/siteStates.ts";
import { userDataAtom } from "../../atoms/userStates.ts";

interface ButtonProps {
  children: React.ReactNode;
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Home() {
  const [, setCurrentHomeContent] = useAtom(currentHomeContentAtom);
  const [userData] = useAtom(userDataAtom);

  const Button = ({ children, icon, onClick, disabled }: ButtonProps) => {
    return (
      <button
        className="w-full max-w-72 px-4 py-3 bg-[#c0f4c1] rounded-full justify-between items-center flex disabled:opacity-50"
        onClick={onClick}
        disabled={disabled}
      >
        <div className="text-center text-[#23771e] text-[14px] font-normal font-['Inter']">
          {children}
        </div>
        <img
          className="h-5 select-none"
          src={icon}
          alt="Icon"
          draggable={false}
        />
      </button>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-4 pl-4 md:pr-4">
      <div className="w-full max-w-[1000px] h-full max-h-[600px] pb-[5px] bg-[#aadcab] rounded-tl-[72px] rounded-bl-[72px] md:rounded-tr-[72px] md:rounded-br-[72px] flex-col justify-start items-center flex">
        <div className="self-stretch h-full pl-4 md:pr-4 pt-2 pb-[17px] bg-[#c0f4c1] rounded-tl-[72px] rounded-bl-[72px] md:rounded-tr-[72px] md:rounded-br-[72px] flex-col justify-start items-center flex">
          <div className="self-stretch h-full pb-[19px] bg-[#eeeeee] rounded-tl-[72px] rounded-bl-[72px] md:rounded-tr-[72px] md:rounded-br-[72px] flex-col justify-start items-center flex">
            <div className="relative w-full h-full px-6 py-7 bg-white rounded-tl-[72px] rounded-bl-[72px] md:rounded-tr-[72px] md:rounded-br-[72px] flex-col md:flex-row justify-around items-center flex">
              <div className="hidden md:flex absolute inset-0 bg-gradient-to-r from-transparent from-50% via-[rgba(0,0,0,0.2)] via-50% to-transparent to-55% opacity-50 pointer-events-none"/>
              <div className="w-full flex flex-col gap-1 items-center justify-center font-['Crimson_Text']">
                <span className="text-center text-[18px]">
                  - Chapter {userData.chapter} -
                </span>
                <span className="text-center font-semibold text-4xl">
                  {userData.username}
                </span>
                <div className="flex w-full flex-col items-center gap-2 mt-3">
                  <div className="w-full max-w-72 h-3 rounded-full bg-[#eeeeee]"></div>
                  <span className="text-center">
                    You are <strong>100 Pages</strong> away from{" "}
                    <strong>Chapter 2</strong>
                  </span>
                </div>
                <div className="md:flex gap-3 hidden mt-7">
                  <img
                    className="h-6 select-none"
                    src="../src/assets/icons/takebook-logo.svg"
                    alt="takeBook Logo"
                    draggable={false}
                  />
                  <img
                    className="h-5 select-none"
                    src="../src/assets/icons/takebook-text.svg"
                    alt="takeBook"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <Button
                  icon="../src/assets/icons/chat.svg"
                  onClick={() => setCurrentHomeContent("chat")}
                >
                  Learn with Pandy
                </Button>
                <Button
                  icon="../src/assets/icons/leaderboard.svg"
                  onClick={() => setCurrentHomeContent("leaderboard")}
                >
                  Our best students
                </Button>
                <Button
                  icon="../src/assets/icons/profile.svg"
                  onClick={() => setCurrentHomeContent("profile")}
                >
                  Customize your profile
                </Button>
                <Button
                  icon="../src/assets/icons/group.svg"
                  onClick={() => setCurrentHomeContent("community")}
                  disabled={true}
                >
                  Help other students
                </Button>
              </div>
              <div className="flex gap-3 md:hidden">
                <img
                  className="h-6 select-none"
                  src="../src/assets/icons/takebook-logo.svg"
                  alt="takeBook Logo"
                  draggable={false}
                />
                <img
                  className="h-5 select-none"
                  src="../src/assets/icons/takebook-text.svg"
                  alt="takeBook"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
