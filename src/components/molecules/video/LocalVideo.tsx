import React, { useEffect, useRef } from "react";

import { ILocalMedia } from "@connectlive/connectlive-web-sdk";
import { useRecoilState } from "recoil";
import { CameraDeviceId } from "../../../recoil/cameraDevice";
import { centerCameraState } from "../../../recoil/centerCameraState";
import { isOpenModalState } from "../../../recoil/isOpenModal";
import { isRoomFullState } from "../../../recoil/isRoomFullState";
import Video from "../../atoms/video/Video";

/*
    LocalVideo
    나의 카메라에 관련된 컴포넌트

    props1 {localMedia : ILocalMedia} // ConnectLive.createLocalMedia()을 통해 반환되는 객체의 타입
    props2 {activeCamera : boolean} // 카메라 권한이 활성화 되었는지 확인
    prop3 {isMain : boolean } // 메인 화면인지 여부
*/
const LocalVideo = ({ localMedia, activeCamera }: LocalVideoInterface) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [cameraDeviceId] = useRecoilState(CameraDeviceId);
  const [isMain, setCenterCamera] = useRecoilState(centerCameraState);

  const [isOpenModal, setOpenModal] = useRecoilState(isOpenModalState);
  const [isRoomFull, setIsRoomFull] = useRecoilState(isRoomFullState);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!localMedia) {
      return;
    }
    ref.current.srcObject = localMedia.video!.getMediaStream();
  }, [ref, localMedia, cameraDeviceId]);

  return (
    <Video
      isActive={activeCamera}
      isLocal={true}
      ref={ref}
      isMain={!isMain}
      muted
      autoPlay
      playsInline
      isRoomFull={isRoomFull}
    ></Video>
  );
};

interface LocalVideoInterface {
  localMedia: ILocalMedia;
  activeCamera: boolean;
}

export default LocalVideo;
