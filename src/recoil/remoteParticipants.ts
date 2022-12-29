import { atom } from "recoil";

export const RemoteParticipantsState = atom({
  key: "RemoteParticipantsState",
  default: [],
  dangerouslyAllowMutability: true,
});
