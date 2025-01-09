import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import * as Routes from "@/constants/routes";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password | Artist Alley",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-col h-full justify-center items-center">
      <div>
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500 flex justify-center">
          No worries! Enter your email that you signed up with and we will send
          you a link to reset your password.
        </p>
      </div>
      <div className="mt-10">
        <div>
          <ForgotPasswordForm />
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-500 flex justify-center">
          <Link
            href={Routes.SIGN_IN}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Remember your password?
          </Link>
        </p>
      </div>
    </main>
  );
}
