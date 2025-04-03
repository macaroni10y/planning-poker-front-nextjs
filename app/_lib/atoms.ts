import { atomWithStorage } from "jotai/vanilla/utils";

export const nameNotSet = "no name";
type UserName = string | typeof nameNotSet;
export const userNameAtom = atomWithStorage<UserName>("userName", nameNotSet);

export type ThemeColor = "pink" | "blue" | "green" | "purple" | "orange";
export const themeColorAtom = atomWithStorage<ThemeColor>("themeColor", "pink");
