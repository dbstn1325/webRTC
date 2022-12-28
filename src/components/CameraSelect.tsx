import React, { useEffect, useState } from "react";

import ConnectLive, {
  IRoom,
  ILocalMedia,
  ILocalScreen,
} from "@connectlive/connectlive-web-sdk";

import { useSetRecoilState } from "recoil";
import { CameraDeviceId } from "../recoil/cameraDevice";

const LocalCameraDevice = ({ localMedia }: LocalMediaInterface) => {
  const [localCameraDevice, setLocalCameraDevice] = useState<MediaDeviceInfo[]>(
    []
  );
  const setCameraDeviceId = useSetRecoilState(CameraDeviceId);

  /*
  카메라 선택시, 상태 변수인 CameraDeviceId에
  선택된 카메라를 업데이트 하는 변수
  */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localMedia.switchCamera(e.target.value).then(() => {
      setCameraDeviceId(e.target.value);
    });
  };

  useEffect(() => {
    (async () => {
      if (localMedia) {
        const devices = await localMedia.getCameraDevices();
        setLocalCameraDevice(devices);
      }
    })();
  }, [localMedia]);

  if (localCameraDevice.length) {
    return (
      <div>
        <select onChange={handleSelect}>
          {localCameraDevice.map((item, index) => {
            return (
              <option key={index} value={item.deviceId}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else {
    return <div>카메라 없다</div>;
  }
};

interface LocalMediaInterface {
  localMedia: ILocalMedia;
}

export default LocalCameraDevice;
