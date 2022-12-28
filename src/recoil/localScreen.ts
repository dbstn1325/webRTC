import { atom } from "recoil";

export const LocalScreen = atom({
  key: "LocalScreen",
  default: null,
  dangerouslyAllowMutability: true,
});
