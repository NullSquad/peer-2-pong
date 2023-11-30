import type { OAuth2ClientConfig } from "kv_oauth/mod.ts";
import { deleteCookie } from "$std/http/cookie.ts";
import { createHelpers, getRequiredEnv } from "kv_oauth/mod.ts";
import type { Plugin } from "$fresh/server.ts";

function createAuth0OAuthConfig(
  config: {
    scope: string | string[];
  },
): OAuth2ClientConfig {
  const domain = getRequiredEnv("AUTH0_DOMAIN");
  const baseURL = `https://${domain}/oauth`;
  return {
    clientId: getRequiredEnv("AUTH0_CLIENT_ID"),
    clientSecret: getRequiredEnv("AUTH0_CLIENT_SECRET"),
    authorizationEndpointUri: `${baseURL}/authorize`,
    tokenUri: `${baseURL}/oauth/token`,
    redirectUri: config.redirectUri,
    defaults: { scope: config.scope },
  };
}

const { signIn, handleCallback, signOut, getSessionId } = createHelpers(
  createAuth0OAuthConfig({
    redirectUri: "https://peer-2-pong.deno.dev/",
    scope: "public",
  }),
);

export default {
  name: "kv-oauth",
  routes: [
    {
      path: "/oauth/signin",
      async handler(req) {
        return await signIn(req);
      },
    },
    {
      path: "/oauth/callback",
      async handler(req) {
        const { response } = await handleCallback(req);
        return response;
      },
    },
    {
      path: "/oauth/signout",
      async handler(req) {
        //deleteCookie(response, 'token');
        return await signOut(req);
      },
    },
  ],
} as Plugin;
