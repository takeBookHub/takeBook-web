import Button from "../components/Button";

import { useAtom } from "jotai";
import { currentViewAtom } from "../atoms/siteStates.ts";

export default function Landing() {
  const [, setCurrentView] = useAtom(currentViewAtom);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-8 items-center justify-center">
      <div className="bg-white rounded-full w-36 p-6 shadow-[rgba(239,239,239,1)_0px_8px_0px_0px]">
        <img
          className="w-full select-none"
          src="/icons/takebook-logo.svg"
          alt="takeBook Logo"
        />
      </div>
      <img
        className="h-10 select-none"
        src="/icons/takebook-text.svg"
        alt="takeBook"
      />
      <span className="font-light text-xl text-center px-2">
        A platform to learn and study with AI
      </span>
      <Button
        onClick={() => {
          setCurrentView("auth");
        }}
        className="w-10/12 sm:w-[340px]"
      >
        <span>Start Learning</span>
        <img
          className="h-5"
          src="/icons/backpack.svg"
          alt="Backpack Icon"
        />
      </Button>
      <div className="hidden sm:block">
        <img
          className="fixed bottom-[-10px] left-[70%] h-[700px] rotate-[10deg] z-[-1]"
          src="/images/bamboo-stick.svg"
          alt="Bamboo Stack"
        />
        <img
          className="fixed bottom-[-30px] left-[60%] lg:left-[65%] h-[600px] rotate-[10deg] z-[-1]"
          src="/images/bamboo-stick.svg"
          alt="Bamboo Stack"
        />
        <img
          className="fixed bottom-[-30px] right-[60%] lg:right-[65%] h-[600px] rotate-[-10deg] z-[-1]"
          src="/images/bamboo-stick.svg"
          alt="Bamboo Stack"
        />
        <img
          className="fixed bottom-[-10px] right-[70%] h-[700px] rotate-[-10deg] z-[-1] transform scale-x-[-1]"
          src="/images/bamboo-stick.svg"
          alt="Bamboo Stack"
        />
      </div>
    </div>
  );
}
