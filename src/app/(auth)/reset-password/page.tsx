import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import * as Routes from "@/constants/routes";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | Artist Alley",
};

export default function ResetPasswordPage() {
  return (
    <main className="flex flex-col h-full justify-center items-center">
      <div>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>
      <div className="mt-10">
        <div>
          <ResetPasswordForm />
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
