import { atom } from "recoil";

/*
현재 오디오 리시버를 점유하고 있는 Remote Participant의 목록
*/
export const AudioOccupants = atom({
  key: "AudioOccupants",
  default: [],
  dangerouslyAllowMutability: true,
});


