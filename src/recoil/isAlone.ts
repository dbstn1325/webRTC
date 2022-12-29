import { atom } from "recoil";

/*
모달이 열려 있는지 확인하는 Atom
*/

export const isAloneState = atom<boolean>({
  key: "isAloneState",
  default: true,
});
