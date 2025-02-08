import React from "react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import * as Routes from "@/constants/routes";
import { StudioTabs } from "@/constants/StudioTabs";
import { DocumentsTab } from "./(tabs)/DocumentsTab";
import { StudioTabControls } from "./(tabs)/StudioTabControls";

import { Tabs, TabsContent } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Studio | Artist Alley",
};

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = StudioTabs.ACTIVE_QUEUES } = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routes.SIGN_IN);
  }
  return (
    <main>
      <h1>Studio</h1>
      <Tabs defaultValue={tab}>
        <StudioTabControls />
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
    </main>
  );
}
