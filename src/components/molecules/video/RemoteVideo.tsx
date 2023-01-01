import { IRemoteVideo } from "@connectlive/connectlive-web-sdk";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { centerCameraState } from "../../../recoil/centerCameraState";
import { isRoomFullState } from "../../../recoil/isRoomFullState";
import { RoomParticipantsState } from "../../../recoil/roomParticipants";

import Video from "../../atoms/video/Video";
import SubVideo from "../../atoms/video/Video";

/*
    참석자의 비디오를 띄워주는 컴포넌트
*/
const RemoteVideo = ({ remoteVideo }: RemoteVideoInterface) => {
  const [isRoomFull, setIsRoomFull] = useRecoilState(isRoomFullState);
  const [roomParticipatans, setRoomParticipatans] = useRecoilState<any>(
    RoomParticipantsState
  );

  const ref = useRef<HTMLVideoElement>(null);

  const [isMain, setCenterCamera] = useRecoilState(centerCameraState);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!remoteVideo) {
      return;
    }

    ref.current.srcObject = remoteVideo.getMediaStream();
    console.log("파티시먼트", roomParticipatans);
  }, [ref, remoteVideo, roomParticipatans]);

  return (
    <Video
      isRoomFull={roomParticipatans.isFull}
      ref={ref}
      isMain={!isMain}
      muted
      autoPlay
      playsInline
    ></Video>
  );
};

interface RemoteVideoInterface {
  remoteVideo: any;
}

export default RemoteVideo;
