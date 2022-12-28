import React, { useEffect, useState } from "react";

import { ILocalMedia } from "@connectlive/connectlive-web-sdk";
import { useSetRecoilState } from "recoil";
import { MicDeviceId } from "../recoil/micDevice";

/*
마이크를 선택할 수 있는 Select Box가 뜨는 컴포넌트
*/
const LocalMicDevice = ({ localMedia }: LocalMicInterface) => {
  const [localMicDevice, setLocalMicDevice] = useState<MediaDeviceInfo[]>([]);
  const setMicDeviceId = useSetRecoilState(MicDeviceId);

  /*
  마이크 선택시, 상태 변수인 CameraDeviceId에
  선택된 마이크를 업데이트 하는 변수
  */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localMedia.switchMic(e.target.value).then(() => {
      setMicDeviceId(e.target.value);
    });
  };

  useEffect(() => {
    (async () => {
      if (localMedia) {
        const devices = await localMedia.getMicDevices();
        setLocalMicDevice(devices);
      }
    })();
  }, [localMedia]);

  if (localMicDevice.length) {
    return (
      <select onChange={handleSelect}>
        {localMicDevice.map((item, index) => {
          return (
            <option key={index} value={item.deviceId}>
              {item.label}
            </option>
          );
        })}
      </select>
    );
  }
  return <div>마이크 없다</div>;
};

interface LocalMicInterface {
  localMedia: ILocalMedia;
}

export default LocalMicDevice;
