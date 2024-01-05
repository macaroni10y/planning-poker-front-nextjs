import { useAtom } from "jotai";
import {atomWithStorage} from "jotai/vanilla/utils";

export const nameNotSet = "no name";
type UserName = string | typeof nameNotSet;
export const userNameAtom = atomWithStorage<UserName>("userName", nameNotSet);
