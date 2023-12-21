import { getRequiredEnv } from "kv_oauth/mod.ts";
export class IntraApi {
  async getAccessToken(code: string, state: string) {
    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("client_id", getRequiredEnv("AUTH0_CLIENT_ID"));
    formData.append("client_secret", getRequiredEnv("AUTH0_CLIENT_SECRET"));
    formData.append("code", code);
    formData.append("redirect_uri", getRequiredEnv("REDIRECT_URI"));
    formData.append("state", state);
    const response = await fetch(
      "https://api.intra.42.fr/oauth/token",
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (!response.ok) {
      console.error(await response.text());
      return null;
    }
    const data = await response.json();
    const accessToken = data["access_token"];
    if (typeof accessToken !== "string") {
      console.error("Access token was not a string.");
    }
    return accessToken;
  }

  async getUserData(accessToken: string) {
    const response = await fetch("https://api.intra.42.fr/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.error(await response.text());
      return null;
    }
    const userData = await response.json();
    return {
      userId: userData.id as number,
      userName: userData.login as string,
      avatarUrl: userData.image.link as string,
    };
  }
  async getUsers(accessToken: string) {
    const response = await fetch(
      `https://api.intra.42.fr/v2/campus/46/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      console.error(await response.text());
      return null;
    }

    const users = await response.json();
    return users;
  }
}

export const intraApi = new IntraApi();
