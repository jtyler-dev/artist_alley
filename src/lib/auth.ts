import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { sendEmail, EmailTypes, EmailVerficiationTemplate } from "@/lib/email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    requireEmailVerification: true, // require email verification, as of right now it doesnt do anything with the username plugin
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }) {
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
