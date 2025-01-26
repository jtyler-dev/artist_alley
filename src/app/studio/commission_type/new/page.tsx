import React from "react";
import { Metadata } from "next";
import { NewCommissionTypeForm } from "./NewCommissionTypeForm/NewCommissionTypeForm";

export const metadata: Metadata = {
  title: "New Commission Type | Artist Alley",
};

export default function NewCommissionTypePage() {
  return (
    <div>
      <h1>New Commission Type</h1>
      <NewCommissionTypeForm />
    </div>
  );
}
