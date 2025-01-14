import React from "react";
import { Metadata } from "next";
import Tiptap from "@/components/TipTap/TipTap";

export const metadata: Metadata = {
  title: "Home | Artist Alley",
};

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Tiptap />
    </div>
  );
}
