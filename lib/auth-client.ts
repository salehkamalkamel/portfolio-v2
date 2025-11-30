import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient();

export const signInGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const signInGitHub = async () => {
  const data = await authClient.signIn.social({
    provider: "github",
  });
};
