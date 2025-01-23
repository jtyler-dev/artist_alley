import React from "react";
import { Metadata } from "next";
import { NewDocumentForm } from "./NewDocumentForm/NewDocumentForm";

export const metadata: Metadata = {
  title: "New Document | Artist Alley",
};

export default function NewDocumentPage() {
  return (
    <div>
      <h1>New Document</h1>
      <NewDocumentForm />
    </div>
  );
}
