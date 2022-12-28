import { atom } from "recoil";

/*
현재 출력장치의 ID를 담고 있는 atom
*/
export const SpeakerDeviceId = atom({
  key: "speakerDeviceId",
  default: "",
});
