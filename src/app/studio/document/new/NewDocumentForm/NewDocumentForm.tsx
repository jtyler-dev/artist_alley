"use client";
import React from "react";
import { DocumentForm } from "@/components/DocumentForm";
import { newDocumentFormAction } from "./actions";

export const NewDocumentForm = () => {
  return <DocumentForm action={newDocumentFormAction} />;
};
