"use client"; // for testing
import React from "react";
import { authClient } from "@/lib/auth-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Artist Alley",
};

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={async () => {
          await authClient.sendVerificationEmail({
            email: "zerojt@gmail.com",
          });
        }}
      >
        send verification email
      </button>
    </div>
  );
}
