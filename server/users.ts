"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const signInGoogle = async () => {
  await auth.api.signInSocial({ body: { provider: "google" } });
};

export const signInGitHub = async () => {
  await auth.api.signInSocial({ body: { provider: "github" } });
};

export const signInEmail = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({ body: { email, password } });
    return {
      success: true,
      message: "Sign-in successful",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Sign-in failed",
    };
  }
};

export async function signOut(postId?: string) {
  try {
    await auth.api.signOut({ headers: await headers() });
    revalidatePath(`/blog/${postId}`);
    revalidatePath("/blog");
    return {
      success: true,
      message: "Sign-out successful",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "Sign-out failed",
    };
  }
}
