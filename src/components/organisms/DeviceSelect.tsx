import { ILocalMedia } from "@connectlive/connectlive-web-sdk";
import React from "react";
import CameraSelect from "../molecules/devices/CameraSelect";
import MicSelect from "../molecules/devices/MicSelect";
import SpeakerSelect from "../molecules/devices/SpeakerSelect";

const DeviceSelect = ({ localMedia }: DeviceSelectTypes) => {
  return (
    <>
      <CameraSelect localMedia={localMedia!} />
      <MicSelect localMedia={localMedia!}></MicSelect>
      <SpeakerSelect localMedia={localMedia!}></SpeakerSelect>
    </>
  );
};

interface DeviceSelectTypes {
  localMedia: ILocalMedia;
}

export default DeviceSelect;
