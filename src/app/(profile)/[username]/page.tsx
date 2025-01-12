import React from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    userName: string;
  };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  return {
    title: `${params.userName} | Artist Alley`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userName } = params;

  const user = await prisma.user.findUnique({
    where: {
      username: userName,
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
