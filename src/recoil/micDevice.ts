import { atom } from "recoil";

/*
현재 선택된 마이크의 ID를 담고 있는 Atom
*/
export const MicDeviceId = atom({
  key: "MicDeviceId",
  default: "",
});
