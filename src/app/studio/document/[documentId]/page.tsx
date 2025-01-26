import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import * as Routes from "@/constants/routes";
import { getDocumentById } from "@/lib/prisma/DocumentService";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { TipTap } from "@/components/TipTap";

export const metadata: Metadata = {
  title: "Document | Artist Alley",
};

interface DocumentPage {
  params: {
    documentId: string;
  };
}
export default async function DocumentPage({ params }: DocumentPage) {
  const { documentId } = params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routes.SIGN_IN);
  }

  const document = await getDocumentById(documentId);

  if (!document) {
    // TODO: update this to maybe redirect to the documents table page with a message / toast with error
    return notFound();
  }

  return (
    <div>
      <h1>Document</h1>
      <p>{document.name}</p>
      <TipTap
        value={document.content ? JSON.parse(document.content) : ""}
        isEditable={false}
      />
    </div>
  );
}
