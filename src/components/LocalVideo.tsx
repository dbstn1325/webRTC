import React, { useEffect, useRef } from "react";

import { ILocalMedia } from "@connectlive/connectlive-web-sdk";
import { useRecoilState } from "recoil";
import { CameraDeviceId } from "../recoil/cameraDevice";
/*
    LocalVideo
    카메라를 선택하면 나오는 화면에 관련된 컴포넌트
    카메라로 비춰지는 나의 모습이 나오는 컴포넌트

    props1 {localMedia : ILocalMedia} // ConnectLive.createLocalMedia()을 통해 반환되는 객체의 타입
    props2 {activeCamera : boolean} // 카메라 권한이 활성화 되었는지 확인
*/
const LocalVideo = ({ localMedia, activeCamera }: LocalVideoInterface) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [cameraDeviceId] = useRecoilState(CameraDeviceId);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!localMedia) {
      return;
    }
    ref.current.srcObject = localMedia.video!.getMediaStream();
  }, [ref, localMedia, cameraDeviceId]);

  return <video ref={ref} autoPlay playsInline></video>;
};

interface LocalVideoInterface {
  localMedia: ILocalMedia;
  activeCamera: boolean;
}

export default LocalVideo;
