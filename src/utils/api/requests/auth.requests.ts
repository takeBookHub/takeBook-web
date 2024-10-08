import call from "../call";
import authEndpoints from "../endpoints/auth.endpoints";

interface Credentials {
  username: string;
  email?: string;
  password: string;
}

export function register(credentials: Credentials) {
  return call(authEndpoints.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export function login(credentials: Credentials) {
  return call(authEndpoints.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export function resendVerification(token: string) {
  return call(authEndpoints.resendVerification, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}

export function isSessionValid(token: string) {
  return call(authEndpoints.isSessionValid, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}
