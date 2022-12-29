import { IRemoteVideo } from "@connectlive/connectlive-web-sdk";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { AudioOccupants } from "../recoil/audioOccupants";
import { centerCameraState } from "../recoil/centerCameraState";
import { isAloneState } from "../recoil/isAlone";

import Video from "./atoms/Video";
import SubVideo from "./atoms/Video";

/*
    참석자의 비디오를 띄워주는 컴포넌트
*/
const RemoteVideo = ({ remoteVideo }: RemoteVideoInterface) => {
  const [isAlone, setIsAlone] = useRecoilState(isAloneState);
  const ref = useRef<HTMLVideoElement>(null);
  const [audioOccupants] = useRecoilState(AudioOccupants);
  const [isMain, setCenterCamera] = useRecoilState(centerCameraState);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!remoteVideo) {
      return;
    }

    ref.current.srcObject = remoteVideo.getMediaStream();
  }, [ref, remoteVideo]);

  //   const onClick = () => {
  //     click(remoteVideo);
  //   };

  return (
    <Video
      isAlone={isAlone}
      ref={ref}
      isMain={isMain}
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
