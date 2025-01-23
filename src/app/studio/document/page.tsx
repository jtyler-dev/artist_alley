import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import * as Routes from "@/constants/routes";
import { getAllDocumentsByUserId } from "@/lib/prisma/DocumentService";

export const metadata: Metadata = {
  title: "Documents | Artist Alley",
};

export default async function DocumentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routes.SIGN_IN);
  }

  const documents = await getAllDocumentsByUserId({
    userId: session.user.id,
  });

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>{document.name}</li>
        ))}
      </ul>
    </div>
  );
}
