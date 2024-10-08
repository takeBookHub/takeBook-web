import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  authTypeAtom,
  usernameAtom,
  emailAtom,
  passwordAtom,
} from "../atoms/authStates";
import {
  registerProcess,
  loginProcess,
} from "../utils/functions/auth.functions.ts";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Auth() {
  const [authType, setAuthType] = useAtom(authTypeAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const [errorMessage, setErrorMessage] = useState("");
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  useEffect(() => {
    if (errorMessage.length > 0) {
      setTimeout(() => {
        setErrorMessage("");
      }, 15 * 1000);
    }
  }, [errorMessage]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (authType === 0) {
          setIsRequestLoading(true);
          registerProcess(username, email, password).then((response) => {
            if (response.success === false) {
              setErrorMessage(response.error);
              setIsRequestLoading(false);
            }
          });
        } else {
          setIsRequestLoading(true);
          loginProcess(username, password).then((response) => {
            if (response.success === false) {
              setErrorMessage(response.error);
              setIsRequestLoading(false);
            }
          });
        }
      }}
      className="w-[100vw] h-[100vh] flex flex-col gap-10 items-center justify-center"
    >
      <div className="flex gap-4">
        <img
          className="h-12"
          src="/icons/takebook-logo.svg"
          alt="takeBook Logo"
        />
        <img src="/icons/takebook-text.svg" alt="takeBook" />
      </div>
      <div className="flex flex-col items-center w-11/12 sm:w-96 gap-3">
        <div className="flex flex-col gap-1 w-full">
          <span className="font-semibold">Username</span>
          <Input
            className="w-full"
            type="text"
            placeholder="john_doe"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        {authType === 0 && (
          <div className="flex flex-col gap-1 w-full">
            <span className="font-semibold">Email</span>
            <Input
              className="w-full"
              type="email"
              placeholder="john@doe.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        )}
        <div className="flex flex-col gap-1 w-full">
          <span className="font-semibold">Password</span>
          <Input
            className="w-full"
            type="password"
            placeholder="**************"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center w-11/12 sm:w-96">
        <Button
          className="w-full"
          disabled={isRequestLoading}
          type="submit"
        >
          {authType === 0 ? "Register" : "Log In"}
        </Button>
        {errorMessage.length > 0 && (
          <span className="text-red-400 text-center">{errorMessage}</span>
        )}
        <div className="flex gap-1">
          <span className="text-[#23771e] font-light">
            {authType === 0
              ? "Already have an account?"
              : "Don't have an account?"}
          </span>
          <button
            className="text-[#23771e] font-semibold"
            onClick={() => {
              if (authType === 0) setAuthType(1);
              else setAuthType(0);
            }}
            type="button"
          >
            {authType === 0 ? "Log In" : "Register"}
          </button>
        </div>
      </div>
    </form>
  );
}
