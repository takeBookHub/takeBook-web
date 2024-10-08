import { useAtom } from "jotai";
import { currentHomeContentAtom } from "../../atoms/siteStates.ts";

import Icon from "./Icon.tsx";

export interface ButtonProps {
  target: "home" | "chat" | "leaderboard" | "community" | "profile";
}

export default function Button({ target }: ButtonProps) {
  const [currentHomeContent, setCurrentHomeContent] = useAtom(
    currentHomeContentAtom,
  );

  return (
    <button
      className={
        "p-3 rounded-lg flex justify-start items-center " +
        (currentHomeContent === target && "bg-[#c0f4c1]")
      }
      onClick={() => setCurrentHomeContent(target)}
    >
      <Icon icon={target} />
    </button>
  );
}
