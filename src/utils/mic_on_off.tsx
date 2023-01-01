function microphoneOnOff(
  setMicActive: (param1: boolean) => void,
  isActive: boolean
) {
  setMicActive(!isActive);
}

export default microphoneOnOff;
