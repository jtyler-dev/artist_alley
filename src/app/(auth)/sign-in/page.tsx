import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as Routes from "@/constants/routes";
import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
  title: "Sign in | Artist Alley",
};

export default function SignInPage() {
  return (
    <main className="flex flex-col h-full justify-center items-center">
      <div>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>
      <div className="mt-10">
        <div>
          <SignInForm />
        </div>
        <p className="mt-2 text-sm leading-6 text-gray-500 flex justify-center">
          <Link
            href={Routes.FORGOT_PASSWORD}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </p>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href={Routes.SIGN_UP}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
        <div className="mt-10">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-gray-900">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button>Oauth</Button>
            <Button>Oauth</Button>
            <Button>Oauth</Button>
            <Button>Oauth</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
