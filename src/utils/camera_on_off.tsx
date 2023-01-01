function cameraOnOff(
  setCameraActive: (param1: boolean) => void,
  isActive: boolean
) {
  setCameraActive(!isActive);
  console.log("액티브", isActive);
}

export default cameraOnOff;
