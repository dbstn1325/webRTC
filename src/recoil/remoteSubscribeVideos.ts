import { atom } from "recoil";

export const RemoteSubscribeVideosState = atom({
  key: "RemoteSubscribeVideosState",
  default: [],
  dangerouslyAllowMutability: true,
});
