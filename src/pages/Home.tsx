import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConnectLive, {
  IRoom,
  ILocalMedia,
  ILocalScreen,
} from "@connectlive/connectlive-web-sdk";
import CameraSelect from "../components/CameraSelect";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CameraDeviceActive } from "../recoil/cameraDeviceActive";
import LocalVideo from "../components/LocalVideo";
import MicSelect from "../components/MicSelect";
import SpeakerSelect from "../components/SpeakerSelect";
import { Conf } from "../recoil/conf";
import RoomIdInput from "../components/RoomIdInput";

import { delay } from "../utils/delay";
import { RoomIdState } from "../recoil/roomIdState";
import Room from "../pages/Room";

const Home = () => {
  const [title, setTitle] = useState("로비");
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  /*
   접속정보 관련 상태 변수
  */
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingMsg, setConnectingMsg] = useState("");
  const [conf, setConf] = useRecoilState<any>(Conf);

  const [localMedia, setLocalMedia] = useState<ILocalMedia>();
  const [activeCamera, setActiveCamera] = useRecoilState(CameraDeviceActive);

  const [roomId, setRoomId] = useState<string>(
    Math.random().toString(16).substring(2, 12)
  );
  /*
  로컬 참여자가 생성하는 로컬오디오와 로컬 비디오 처리를 위해서 LocalMedia 객체를 만든다.
  params1 {audio : true} 오디오 객체 생성
  params2 {video : true} 비디오 객체 생성
  */
  useEffect(() => {
    (async () => {
      const _localMedia = await ConnectLive.createLocalMedia({
        video: true,
      });
      setLocalMedia(_localMedia);
      console.log(isConnecting);
    })();
  }, []);

  /*
   * 사용자가 방에 접속할 때 호출하는 이벤트 함수
   */

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let auth = {
      serviceId: "S8N34T5LI3Y6",
      serviceSecret: "S8N34T5LI3Y6G0KA:oMOoOnozLdA8pNs3",
      endpoint: "",
    };

    await ConnectLive.signIn(auth);

    /*
    ConnectLive.createRoom()
    새로운 방을 생성하고 접속 정보를 담는다.
    */
    const _conf = ConnectLive.createRoom();

    /*
    진행 과정을 계산하고, 해당 접속 정보를 통해
    Room에 연결을 한다.
    */

    _conf.on("connecting", async (event) => {
      console.log(_conf);
      const progress = Math.floor(event.progress);
      console.log(progress);
      if (progress <= 33) {
        console.log("Room connected");
        setConnectingMsg("Room Connected");
      } else if (progress <= 66) {
        console.log("UpSession Succeed");
        setConnectingMsg("UpSession Succeed");
      } else if (progress <= 100) {
        console.log("DownSession succeed");
        setConnectingMsg("DownSession Succeed");
        await delay(2000);

        setTitle("상담실");
        setComplete(true);
        // '연결 중' 제한을 2초로 설정하여 해당 시간 경과 시, 연결 종료
        setIsConnecting(false);
      }
    });

    setConf(_conf);
    console.log("_conf", _conf);
    console.log("conf", conf);
    setIsConnecting(true);
    await _conf.connect(roomId);
  };
  return (
    <div>
      <div>- {title} - </div>

      <LocalVideo localMedia={localMedia!} activeCamera={activeCamera} />
      <CameraSelect localMedia={localMedia!} />
      <MicSelect localMedia={localMedia!}></MicSelect>
      <SpeakerSelect localMedia={localMedia!}></SpeakerSelect>
      <div>
        {complete ? (
          <div>
            <Room roomId={roomId} />
          </div>
        ) : (
          <div>
            <button onClick={handleSubmit}>방 생성</button>
            <div>
              <button onClick={handleSubmit}>방 입장</button>
              <RoomIdInput roomId={roomId} setRoomId={setRoomId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;