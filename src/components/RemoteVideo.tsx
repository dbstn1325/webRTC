import { IRemoteVideo } from "@connectlive/connectlive-web-sdk";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { AudioOccupants } from "../recoil/audioOccupants";
import MainVideo from "./atoms/MainVideo";
import SubVideo from "./atoms/SubVideo";

/*
    참석자의 비디오를 띄워주는 컴포넌트
*/
const RemoteVideo = ({ remoteVideo, isMain }: RemoteVideoInterface) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [audioOccupants] = useRecoilState(AudioOccupants);

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

  return isMain ? (
    <>
      <div>참가자 아이디 : {remoteVideo.participantId}</div>
      <MainVideo
        ref={ref}
        width={27}
        height={30}
        muted
        autoPlay
        playsInline
      ></MainVideo>
    </>
  ) : (
    <>
      <div>참가자 아이디 : {remoteVideo.participantId}</div>
      <SubVideo
        ref={ref}
        width={10}
        height={15}
        muted
        autoPlay
        playsInline
      ></SubVideo>
    </>
  );
};

interface RemoteVideoInterface {
  remoteVideo: any;
  isMain: boolean;
}

export default RemoteVideo;
