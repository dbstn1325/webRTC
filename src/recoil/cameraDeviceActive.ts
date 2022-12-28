import {atom} from 'recoil'

/*
현재 카메라가 할성화 되어 있는지 담고 있는 atom
*/
export const CameraDeviceActive = atom({
    key : 'cameraDeviceActive',
    default : true
})