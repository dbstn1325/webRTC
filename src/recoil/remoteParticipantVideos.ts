import { atom } from "recoil";

export const RemoteParticipantsVideosState = atom({
  key: "RemoteParticipantsVideosState",
  default: [],
  dangerouslyAllowMutability: true,
});
