import { IRemoteParticipant } from "@connectlive/connectlive-web-sdk";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const ParticipantState = atom<IRemoteParticipant[]>({
  key: "ParticipantState",
  default: [],
  dangerouslyAllowMutability: true,
  //   effects_UNSTABLE: [persistAtom],
});
