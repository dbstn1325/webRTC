import React, { useEffect, useState } from "react";

import ConnectLive, {
  IRoom,
  ILocalMedia,
  ILocalScreen,
} from "@connectlive/connectlive-web-sdk";

import { useSetRecoilState } from "recoil";
import { CameraDeviceId } from "../recoil/cameraDevice";
import SelectBoxContainer from "./molecules/SelectBoxContainer";
import StyledSelectBox from "./atoms/StyledSelectBox";
import SelectBoxLabel from "./atoms/SelectBoxLabel";

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
      <SelectBoxContainer>
        <SelectBoxLabel>카메라</SelectBoxLabel>
        <StyledSelectBox onChange={handleSelect}>
          {localCameraDevice.map((item, index) => {
            return (
              <option key={index} value={item.deviceId}>
                {item.label}
              </option>
            );
          })}
        </StyledSelectBox>
      </SelectBoxContainer>
    );
  } else {
    return <div>카메라 없다</div>;
  }
};

interface LocalMediaInterface {
  localMedia: ILocalMedia;
}

export default LocalCameraDevice;
