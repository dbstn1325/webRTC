import { atom } from "recoil";

export const LocalVideo = atom({
  key: "LocalVideo",
  default: null,
  dangerouslyAllowMutability: true,
});
