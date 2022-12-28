import { atom } from "recoil";

/*
현재 선택된 카메라의 ID를 담고 있는 Atom
*/
export const CameraDeviceId = atom({
  key: "CameraDeviceId",
  default: "",
});
