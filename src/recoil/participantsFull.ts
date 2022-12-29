import { atom } from "recoil";

export const ParticipantsFullState = atom<boolean>({
  key: "ParticipantsFullState",
  default: false,
});
