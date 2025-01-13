import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  return {
    title: `${params.username} | Artist Alley`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h1>Profile page: {user.username}</h1>
    </div>
  );
}
