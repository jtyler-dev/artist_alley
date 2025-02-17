import React from "react";
import { Metadata } from "next";
import { FormBuilder } from "@/components/FormBuilder";

export const metadata: Metadata = {
  title: "New Form | Artist Alley",
};

export default function NewFormPage() {
  return (
    <>
      <h1>New Form</h1>
      <FormBuilder />
    </>
  );
}
