import { IRemoteVideo } from "@connectlive/connectlive-web-sdk";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { AudioOccupants } from "../recoil/audioOccupants";

/*
    참석자의 비디오를 띄워주는 컴포넌트
*/
const RemoteVideo = ({ remoteVideo }: RemoteVideoInterface) => {
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

  return (
    <>
      <div>{remoteVideo.participantId}</div>
      <video ref={ref} muted autoPlay playsInline></video>
    </>
  );
};

interface RemoteVideoInterface {
  remoteVideo: any;
}

export default RemoteVideo;