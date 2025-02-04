"use client";
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudioTabs, STUDIO_TAB_SEARCH_PARAM } from "@/constants/StudioTabs";
import { useRouter, usePathname } from "next/navigation";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

export const StudioTabControls = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  const onTabClick = (tabId: StudioTabs) => {
    router.push(
      `${pathname}?${createQueryString(STUDIO_TAB_SEARCH_PARAM, tabId)}`
    );
  };

  return (
    <TabsList>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger
          value={StudioTabs.ACTIVE_QUEUES}
          onClick={() => onTabClick(StudioTabs.ACTIVE_QUEUES)}
        >
          Active Queues
        </TabsTrigger>
        <TabsTrigger
          value={StudioTabs.COMMISSION_TYPES}
          onClick={() => onTabClick(StudioTabs.COMMISSION_TYPES)}
        >
          Commission Types
        </TabsTrigger>
        <TabsTrigger
          value={StudioTabs.DOCUMENTS}
          onClick={() => onTabClick(StudioTabs.DOCUMENTS)}
        >
          Documents
        </TabsTrigger>
        <TabsTrigger
          value={StudioTabs.FORMS}
          onClick={() => onTabClick(StudioTabs.FORMS)}
        >
          Forms
        </TabsTrigger>
      </TabsList>
    </TabsList>
  );
};
