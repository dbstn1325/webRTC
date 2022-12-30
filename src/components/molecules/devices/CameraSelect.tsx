import React, { useEffect, useState } from "react";

import { ILocalMedia } from "@connectlive/connectlive-web-sdk";

import { useSetRecoilState } from "recoil";
import { CameraDeviceId } from "../../../recoil/cameraDevice";
import SelectBoxContainer from "../../atoms/modal/SelectBoxContainer";
import StyledSelectBox from "../../atoms/modal/StyledSelectBox";
import SelectBoxLabel from "../../atoms/modal/SelectBoxLabel";

/**
 * 카메라 선택을 하는 컴포넌트
 */
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

  // 사용자의 카메라를 들고온다
  useEffect(() => {
    (async () => {
      if (localMedia) {
        const devices = await localMedia.getCameraDevices();
        setLocalCameraDevice(devices);
      }
    })();
  }, [localMedia]);

  /**
   * 사용자의 카메라가 정상적으로 있을 때 컴포넌트
   */
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
    /**
     * 사용자의 카메라가 없을 때 컴포넌트
     */
  } else {
    return (
      <SelectBoxContainer>
        <SelectBoxLabel>카메라</SelectBoxLabel>
        <StyledSelectBox onChange={handleSelect}>
          <option>카메라를 찾을 수 없음</option>
        </StyledSelectBox>
      </SelectBoxContainer>
    );
  }
};

interface LocalMediaInterface {
  localMedia: ILocalMedia;
}

export default LocalCameraDevice;
