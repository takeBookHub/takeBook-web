import { useAtom } from "jotai";
import { currentHomeContentAtom } from "../../atoms/siteStates.ts";

import Button from "./Button.tsx";

export default function Navigation() {
  const [, setCurrentHomeContent] = useAtom(currentHomeContentAtom);

  return (
    <div className="w-[100vw] lg:w-fit flex lg:flex-col justify-between items-center px-6 py-6 border-t lg:border-r border-[#d8d8d8]">
      <div className="hidden flex-col gap-16 lg:flex">
        <button
          className="outline-none"
          onClick={() => {
            setCurrentHomeContent("home");
          }}
        >
          <img
            className="h-10 select-none"
            src="/icons/takebook-logo.svg"
            alt="takeBook Logo"
            draggable={false}
          />
        </button>
        <div className="flex flex-col gap-8">
          <Button target="home" />
          <Button target="chat" />
          <Button target="leaderboard" />
          <Button target="community" />
        </div>
      </div>
      <div className="hidden lg:flex">
        <Button target="profile" />
      </div>
      <div className="w-full lg:hidden flex justify-between items-center">
        <Button target="home" />
        <Button target="leaderboard" />
        <Button target="chat" />
        <Button target="community" />
        <Button target="profile" />
      </div>
    </div>
  );
}
