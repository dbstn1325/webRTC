import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const RoomParticipantsState = atom({
  key: "RoomParticipantsState",
  default: {
    roomId: "",
    isFull: false,
  },
  effects_UNSTABLE: [persistAtom],
});
