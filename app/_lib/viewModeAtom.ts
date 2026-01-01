import { atomWithStorage } from "jotai/vanilla/utils";

export type ViewMode = "table" | "cards";
export const viewModeAtom = atomWithStorage<ViewMode>("viewMode", "table");
