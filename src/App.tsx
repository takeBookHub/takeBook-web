import Landing from "./views/Landing";
import Auth from "./views/Auth";
import Home from "./views/Home";
import Email from "./views/Email";
import Loading from "./views/Loading";

import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import { currentViewAtom } from "./atoms/siteStates.ts";
import { isAuthenticatedAtom } from "./atoms/authStates.ts";
import { userDataAtom } from "./atoms/userStates.ts";

import { checkSession } from "./utils/functions/auth.functions.ts";
import { getProfile } from "./utils/api/requests/profile.requests.ts";

export default function App() {
  const [currentView] = useAtom(currentViewAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userData, setUserData] = useAtom(userDataAtom);

  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const cookie = new Cookies();

  useEffect(() => {
    (async () => {
      setIsRequestLoading(true);

      const sessionResponse = await checkSession();
      setIsAuthenticated(sessionResponse.success);

      const profileResponse = await getProfile(cookie.get("x-auth-token"));
      if (profileResponse.success) {
        setUserData(profileResponse.data);
      }

      setIsRequestLoading(false);
    })();
  }, []);

  if (isRequestLoading) {
    return <Loading />;
  }

  if (userData.verified === false) {
    return <Email />;
  }

  if (isAuthenticated) {
    return <Home />;
  }

  switch (currentView) {
    case "landing":
      return <Landing />;
    case "auth":
      return <Auth />;
    default:
      return <div>404</div>;
  }
}
