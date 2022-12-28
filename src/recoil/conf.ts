import { IRoom } from "@connectlive/connectlive-web-sdk";
import { Room } from "@connectlive/connectlive-web-sdk/es6/modules/room/room";
import { atom } from "recoil";

/*
 생성된 방의 정보를 담고 있는 상태변수
 Conf : ConnecLive.createRoom()으로 생성된 변수
*/
export const Conf = atom({
  key: "Conf",
  default: null,
  dangerouslyAllowMutability: true,
});
