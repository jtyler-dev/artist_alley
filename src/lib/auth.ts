import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import {
  sendEmail,
  EmailTypes,
  EmailVerficiationTemplate,
  PasswordResetTemplate,
} from "@/lib/email";

export const auth = betterAuth({
  advanced: {
    cookiePrefix: "paam",
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail(
        EmailTypes.PASSWORD_RESET,
        user.email,
        "Password Reset Request",
        PasswordResetTemplate({ url, userName: user.name, email: user.email }),
        `Password reset link for ${user.email}: ${url}`
      );
    },
  },
  emailVerification: {
    requireEmailVerification: true, // require email verification, as of right now it doesnt do anything with the username plugin
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(
        EmailTypes.VERIFY_EMAIL,
        user.email,
        "Please verify your email for ArtistAlley.moe",
        EmailVerficiationTemplate({ url, userName: user.name }),
        `Verfication link for ${user.email}: ${url}`
      );
    },
  },
  plugins: [username(), nextCookies()], // make sure nextCookies this is the last plugin in the array
});
