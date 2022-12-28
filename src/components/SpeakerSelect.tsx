import { ILocalMedia } from "@connectlive/connectlive-web-sdk";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { SpeakerDeviceId } from "../recoil/speakerDevice";

const LocalSpeakerDevice = ({ localMedia }: LocalSpeakerInterface) => {
  const [localSpeakerDevice, setLocalSpeakerDevice] = useState<
    MediaDeviceInfo[]
  >([]);
  const setSelectedSpeakerId = useSetRecoilState(SpeakerDeviceId);

  /*
  출력장치 선택시, 상태 변수인 SpeakerDeviceId에
  선택된 출력장치를 업데이트 하는 변수
  */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpeakerId(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (localMedia) {
        setLocalSpeakerDevice(await localMedia.getSpeakerDevices());
        console.log(localMedia.getSpeakerDevices());
      }
    })();
  }, [localMedia]);

  if (localSpeakerDevice.length) {
    return (
      <select onChange={handleSelect}>
        {localSpeakerDevice.map((item, index) => {
          return (
            <option key={index} value={item.deviceId}>
              {item.label}
            </option>
          );
        })}
      </select>
    );
  }
  return <div>출력장치 없다</div>;
};

interface LocalSpeakerInterface {
  localMedia: ILocalMedia;
}

export default LocalSpeakerDevice;