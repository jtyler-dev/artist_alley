export const STUDIO_TAB_SEARCH_PARAM = "tab";

export enum StudioTabs {
  ACTIVE_QUEUES = "active_queue",
  COMMISSION_TYPES = "commission_types",
  DOCUMENTS = "documents",
  FORMS = "forms",
}

export const isValidStudioTab = (
  tab: string | undefined
): tab is StudioTabs => {
  if (!tab) {
    return false;
  }
  return Object.values(StudioTabs).includes(tab as StudioTabs);
};
