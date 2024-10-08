import {
  register,
  login,
  isSessionValid,
} from "../api/requests/auth.requests.ts";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export async function registerProcess(
  username: string,
  email: string,
  password: string,
) {
  const response = await register({ username, email, password });
  if (response.success) {
    cookies.set("x-auth-token", response.cookie, { path: "/" });
    window.location.reload();
  }
  return response;
}

export async function loginProcess(username: string, password: string) {
  const response = await login({ username, password });
  if (response.success) {
    cookies.set("x-auth-token", response.cookie, { path: "/" });
    window.location.reload();
  }
  return response;
}

export async function checkSession() {
  const token = cookies.get("x-auth-token");
  if (!token) return { success: false, error: "No stored token." };
  const response = await isSessionValid(token);
  if (response.success === false) {
    cookies.remove("x-auth-token");
  }
  return response;
}
