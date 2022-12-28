import { atom } from "recoil";

/*
현재 마이크가 할성화 되어 있는지 담고 있는 atom
*/
export const MicDeviceActive = atom({
  key: "micDeviceActive",
  default: true,
});
