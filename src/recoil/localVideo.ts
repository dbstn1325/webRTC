import { atom } from "recoil";

export const LocalVideoState = atom({
  key: "LocalVideoState",
  default: null,
  dangerouslyAllowMutability: true,
});
