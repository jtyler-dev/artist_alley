import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import * as Routes from "@/constants/routes";
import { StudioTabs } from "@/constants/StudioTabs";
import { DocumentsTab } from "./(tabs)/DocumentsTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Studio | Artist Alley",
};

export default async function StudioPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routes.SIGN_IN);
  }
  return (
    <main className="flex flex-col gap-4">
      <h1>Studio</h1>
      <div>
        <Tabs defaultValue={StudioTabs.ACTIVE_QUEUES}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={StudioTabs.ACTIVE_QUEUES}>
              Active Queues
            </TabsTrigger>
            <TabsTrigger value={StudioTabs.COMMISSION_TYPES}>
              Commission Types
            </TabsTrigger>
            <TabsTrigger value={StudioTabs.DOCUMENTS}>Documents</TabsTrigger>
            <TabsTrigger value={StudioTabs.FORMS}>Forms</TabsTrigger>
          </TabsList>
          <TabsContent value={StudioTabs.ACTIVE_QUEUES}>
            Active Queues
          </TabsContent>
          <TabsContent value={StudioTabs.COMMISSION_TYPES}>
            Commission Types
          </TabsContent>
          <TabsContent value={StudioTabs.DOCUMENTS}>
            <DocumentsTab userId={session.user.id} />
          </TabsContent>
          <TabsContent value={StudioTabs.FORMS}>Forms</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
