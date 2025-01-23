import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import * as Routes from "@/constants/routes";

export const metadata: Metadata = {
  title: "Studio | Artist Alley",
};

export default async function StudioPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routes.SIGN_IN);
  }
  return (
    <div>
      <h1>Studio</h1>
    </div>
  );
}
