import { atom } from "recoil";

/*
모달이 열려 있는지 확인하는 Atom
*/

export const isOpenModalState = atom<boolean>({
  key: "isOpenModalState",
  default: true,
});
