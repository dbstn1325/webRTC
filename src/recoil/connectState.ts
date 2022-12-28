import { atom } from "recoil";

/*
화상 대화의 현재 연결 상태를 담고 있는 Atom
*/

export const ConnectState = atom<boolean>({
  key: "ConnectState",
  default: false,
});
