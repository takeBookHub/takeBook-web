import { useAtom } from "jotai";
import { currentHomeContentAtom } from "../../atoms/siteStates.ts";

import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Chat from "./Chat";
import Community from "./Community";
import Profile from "./Profile";

export default function Content() {
  const [currentHomeContent] = useAtom(currentHomeContentAtom);

  return (
    <div className="h-full w-full">
      {currentHomeContent === "home" && <Home />}
      {currentHomeContent === "leaderboard" && <Leaderboard />}
      {currentHomeContent === "chat" && <Chat />}
      {currentHomeContent === "community" && <Community />}
      {currentHomeContent === "profile" && <Profile />}
    </div>
  );
}
