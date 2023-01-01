import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
/*
모달이 열려 있는지 확인하는 Atom
*/

export const isRoomFullState = atom<boolean>({
  key: "isRoomFullState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
