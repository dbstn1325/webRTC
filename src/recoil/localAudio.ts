import { atom } from "recoil";

export const LocalAudio = atom({
  key: "LocalAudio",
  default: null,
  dangerouslyAllowMutability: true,
});
