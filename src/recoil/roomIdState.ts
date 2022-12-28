import { atom } from "recoil";

export const RoomIdState = atom({
  key: "RoomIdState",
  default: Math.random().toString(16).substring(2, 12),
});
