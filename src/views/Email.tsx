import { useAtom } from "jotai";
import { useState } from "react";
import Cookies from "universal-cookie";

import { userDataAtom } from "../atoms/userStates.ts";

import { getProfile } from "../utils/api/requests/profile.requests.ts";
import { resendVerification } from "../utils/api/requests/auth.requests.ts";

import Button from "../components/Button.tsx";

export default function Email() {
  const [, setUserData] = useAtom(userDataAtom);

  const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [isResendOnCooldown, setIsResendOnCooldown] = useState(false);

  const cookies = new Cookies();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <img
          className="h-4"
          src={
            isSuccessful === false
              ? "/icons/warning.svg"
              : "/icons/email.svg"
          }
          alt="Email Icon"
        />
        <span className="font-semibold text-lg">
          {isSuccessful === false
            ? "Email was not verified"
            : "Check your email"}
        </span>
      </div>
      <span className="font-light text-lg w-11/12 text-center">
        We’ve sent a verification link to your inbox
      </span>
      <Button
        className="mt-6 w-10/12 sm:w-[340px]"
        disabled={isUserDataLoading}
        onClick={() => {
          if (isSuccessful === false) {
            setIsSuccessful(null);
          } else {
            setIsUserDataLoading(true);
            getProfile(cookies.get("x-auth-token")).then((response) => {
              if (response.success) {
                setUserData(response.data);
                if (response.data.verified === true) {
                  window.location.reload();
                } else {
                  setIsSuccessful(false);
                }
                setIsUserDataLoading(false);
              }
            });
          }
        }}
      >
        {isSuccessful === false ? "Go Back" : "Continue"}
      </Button>
      <Button
        className="mt-2 w-10/12 sm:w-[340px]"
        design="secondary"
        disabled={isSuccessful !== false && isResendOnCooldown}
        onClick={() => {
          if (isSuccessful === false) {
            cookies.remove("x-auth-token");
            window.location.reload();
          } else {
            setIsResendOnCooldown(true);
            resendVerification(cookies.get("x-auth-token")).then(() => {
              setTimeout(() => {
                setIsResendOnCooldown(false);
              }, 60 * 1000);
            });
          }
        }}
      >
        {isSuccessful === false ? "Log Out" : "Resend Email"}
      </Button>
      <div className="flex gap-1 mt-1">
        <span className="text-[#757575] font-light">
          {isSuccessful === false
            ? "Having trouble? Reach out at"
            : "Still nothing? Reach out at"}
        </span>
        <button
          onClick={() => {
            window.location.href = "mailto:contact@takebook.me";
          }}
          className="text-[#757575] font-semibold"
        >
          contact@takebook.me
        </button>
      </div>
    </div>
  );
}
