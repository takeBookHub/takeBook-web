import call from "../call";
import profileEndpoints from "../endpoints/profile.endpoints";

export function getProfile(token: string) {
  return call(profileEndpoints.profile, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}
