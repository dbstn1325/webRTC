import { atom } from 'recoil';

/*
로컬 참여자의 오디오를 항상 내보내고 싶을 때 설정 여부
*/
export const AlwaysOnAudio = atom({
  key: 'AlwaysOnAudio',
  default: {},
  dangerouslyAllowMutability: true,
});
