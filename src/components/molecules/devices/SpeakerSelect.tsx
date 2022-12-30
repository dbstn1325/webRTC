import { ILocalMedia } from "@connectlive/connectlive-web-sdk";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { SpeakerDeviceId } from "../../../recoil/speakerDevice";
import SelectBoxLabel from "../../atoms/modal/SelectBoxLabel";
import StyledSelectBox from "../../atoms/modal/StyledSelectBox";
import SelectBoxContainer from "../../atoms/modal/SelectBoxContainer";

/**
 * 사용자의 스피커를 선택할 수 있는 컴포넌트
 */
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
      <SelectBoxContainer>
        <SelectBoxLabel>스피커</SelectBoxLabel>
        <StyledSelectBox onChange={handleSelect}>
          {localSpeakerDevice.map((item, index) => {
            return (
              <option key={index} value={item.deviceId}>
                {item.label}
              </option>
            );
          })}
        </StyledSelectBox>
      </SelectBoxContainer>
    );
  }
  return (
    <SelectBoxContainer>
      <SelectBoxLabel>스피커</SelectBoxLabel>
      <StyledSelectBox onChange={handleSelect}>
        <option>출력장치를 찾을 수 없음.</option>
      </StyledSelectBox>
    </SelectBoxContainer>
  );
};

interface LocalSpeakerInterface {
  localMedia: ILocalMedia;
}

export default LocalSpeakerDevice;
