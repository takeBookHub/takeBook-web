import { API_URL } from "../url.ts";

const authEndpoints = {
  register: API_URL + "auth/register/",
  login: API_URL + "auth/login/",
  verify: API_URL + "auth/verify/",
  resendVerification: API_URL + "auth/resend-verification/",
  unintendedUsage: API_URL + "auth/unintended-usage/",
  isSessionValid: API_URL + "auth/is-session-valid/"
};

export default authEndpoints;
