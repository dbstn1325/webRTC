import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import ConnectLive, {
  ILocalMedia,
  IRemoteParticipant,
} from "@connectlive/connectlive-web-sdk";

import { CameraDeviceActive } from "../recoil/cameraDeviceActive";
import LocalVideo from "../components/molecules/video/LocalVideo";
import { Conf } from "../recoil/conf";
import RoomIdInput from "../components/RoomIdInput";
import { delay } from "../utils/delay";
import Room from "../pages/Room";
import { ConnectState } from "../recoil/connectState";
import VideoContainer from "../components/atoms/video/VideoContainer";
import StyledRoomButton from "../components/atoms/modal/RoomButton";
import { isOpenModalState } from "../recoil/isOpenModal";
import Modal from "../components/molecules/modal/Modal";

import { isRoomFullState } from "../recoil/isRoomFullState";

import Container from "../components/atoms/Container";
import TodayContainer from "../components/molecules/today/TodayContainer";
import TodayInputBox from "../components/molecules/today/TodayInputBox";
import TodayButtonContainer from "../components/atoms/TodayMedical/TodayButtonContainer";
import TodayButton from "../components/atoms/TodayMedical/TodayButton";
import { centerCameraState } from "../recoil/centerCameraState";
import { LocalAudio } from "../recoil/localAudio";
import DeviceSelect from "../components/organisms/DeviceSelect";
import LocalPreviewVideo from "../components/molecules/modal/LocalPreviewVideo";

import { ParticipantState } from "../recoil/participants";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { RoomParticipantsState } from "../recoil/roomParticipants";
import { MicDeviceActive } from "../recoil/micDeviceActive";
import microphoneOnOff from "../utils/mic_on_off";
import cameraOnOff from "../utils/camera_on_off";

const Lobby = () => {
  const location = useLocation();

  /**
   * 마이크/카메라 활성화 여부와 관련된 상태변수
   */
  const [activeMic, setActiveMic] = useRecoilState(MicDeviceActive);
  const [activeCamera, setActiveCamera] = useRecoilState(CameraDeviceActive);
  /**
   * 카메라 화면 전환에 곤련된 변수
   */
  const [isMain, setCenterCamera] = useRecoilState(centerCameraState);

  // 모달창 Open과 Close
  const [isOpenModal, setOpenModal] = useRecoilState(isOpenModalState);

  const navigate = useNavigate();
  const [isMyCameraCenter, setMyCameraCenter] = useState(true);
  const [isRoomFull, setIsRoomFull] = useRecoilState(isRoomFullState);
  /*
   접속정보 관련 상태 변수
  */
  const [isConnecting, setIsConnecting] = useState(false);
  const [complete, setComplete] = useRecoilState(ConnectState);

  /**
   * 접속 시 메세지를 담고 있는 변수
   */
  const [connectingMsg, setConnectingMsg] = useState("");
  const [conf, setConf] = useRecoilState<any>(Conf);

  /**
   * 나의 카메라를 담고 있는 상태변수
   */
  const [localMedia, setLocalMedia] = useState<ILocalMedia>();

  /*
    현재 쓰고 있는 로컬오디오와 비디오
  */
  const [localAudio, setLocalAudio] = useRecoilState<any>(LocalAudio);
  const [isConnect, setIsConnect] = useRecoilState(ConnectState);

  /** */
  const [roomId, setRoomId] = useState<string>(
    Math.random().toString(16).substring(2, 12)
  );
  const [isHost, setIsHost] = useState(false);

  const [roomParticipatans, setRoomParticipatans] = useRecoilState<any>(
    RoomParticipantsState
  );

  useEffect(() => {
    // TODO : 변수명 바꾸기
    setRoomParticipatans((a: any) => ({
      ...a,
    }));

    if (location.pathname === "/host") {
      setIsHost(true);
      setConnectingMsg("방 생성하기");
      return;
    }

    setConnectingMsg("방 입장하기");
    setIsHost(false);
  }, [location]);

  /*
  로컬 참여자가 생성하는 로컬오디오와 로컬 비디오 처리를 위해서 LocalMedia 객체를 만든다.
  params1 {audio : true} 오디오 객체 생성
  params2 {video : true} 비디오 객체 생성
  */
  useEffect(() => {
    (async () => {
      const _localMedia = await ConnectLive.createLocalMedia({
        audio: true,
        video: true,
      });
      setLocalMedia(_localMedia);
    })();
  }, [complete, setComplete, conf]);

  /**
   * 메인 카메라 전환하는 메소드
   */
  const handleChangeCam = () => {
    setCenterCamera(!isMain);
  };

  /**
   * 모달 On/OFF
   */
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  /*
   * 사용자가 방에 접속할 때 호출하는 이벤트 함수
   */
  const handleSubmit = async (event: any) => {
    console.log("zzzzz", roomId);
    event.preventDefault();
    console.log(roomParticipatans.roomId);
    console.log(roomId);
    console.log(roomParticipatans.roomId === roomId);
    console.log(roomParticipatans.isFull);
    console.log(roomParticipatans.roomId === roomId && isRoomFull === true);
    if (
      roomParticipatans.roomId === roomId &&
      roomParticipatans.isFull === true
    ) {
      alert("인원 초과된 방입니다.");
      return;
    }

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
    방 생성 진행 과정을 계산하고, 해당 접속 정보를 통해
    Room에 연결을 한다.
    */
    console.log("-----", _conf.remoteParticipants);
    _conf.on("connecting", async (event) => {
      const progress = Math.floor(event.progress);

      if (progress <= 33) {
        setConnectingMsg("방 찾기 완료");
      } else if (progress <= 66) {
        setConnectingMsg("방 정보 불러오는 중..");
      } else if (progress <= 100) {
        setConnectingMsg("방 정보 불러오기 완료");
        await delay(2000);

        setIsConnecting(false);
        setComplete(true);
        setOpenModal(false);
        // '연결 중' 제한을 2초로 설정하여 해당 시간 경과 시, 연결 종료
      }
    });

    /**
     * 정상적으로 방에 접속 했을 때 이벤트
     * 방에 접속 해있는 참여자들의 수를 개수해서
     * 방에 나 혼자 있는지, 다른 사람들이 같이 있는지 계산
     */
    _conf.on("connected", async (event) => {
      console.log("qqqqq", event.remoteParticipants.length);

      console.log(roomId);

      if (event.remoteParticipants.length >= 1) {
        setRoomParticipatans((a: any) => ({
          ...a,
          roomId: roomId,
          isFull: true,
        }));
        console.log(isRoomFull);
        setIsRoomFull(true);
        console.log(isRoomFull);
      }
      console.log("aaaaaa", isRoomFull);
      setRoomParticipatans((a: any) => ({
        ...a,
        roomId: roomId,
        isFull: isRoomFull,
      }));
      console.log("===", roomParticipatans.roomId);

      console.log(isRoomFull);
    });

    /**
     * 다른 참여자가 방에 들어왔을 때 발생하는 이벤트
     * 혼자 있는지 확인하는 변수 setIsRoomFull을 False
     */

    // _conf.on("participantEntered", (evt) => {
    //   console.log("==1", remoteParticipants);
    //   setRemoteParticipants((oldRemoteParticipants) => [
    //     ...oldRemoteParticipants,
    //     evt.remoteParticipant,
    //   ]);
    //   console.log("==2", remoteParticipants);
    // });

    console.log("-----------", isRoomFull);
    console.log(_conf);
    setComplete(false);
    setIsConnecting(true);
    setConf(_conf);

    await _conf.connect(roomId);
  };

  /**
   * 접속을 끊었을 때, 오디오를 끄고
   * 다시 방 입장 모달창이 띄워진다.
   */
  const handleDisconnect = () => {
    setLocalAudio(null);
    setConf(null);
    setIsConnect(false);
    conf.disconnect();

    ConnectLive.signOut();
    window.localStorage.removeItem("isRoomFullState");
    navigate("/");
    setConnectingMsg("입장하기");
    setOpenModal(true);
  };

  /**
   * 마이크 ON/OFF 함수
   */
  const handleOnMicActive = () => {
    microphoneOnOff(setActiveMic, activeMic);
  };

  const handleOnCameraActive = () => {
    cameraOnOff(setActiveCamera, activeCamera);
  };

  return (
    <Container>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal} isHost={isHost}>
          <LocalPreviewVideo
            localMedia={localMedia!}
            activeCamera={activeCamera}
          ></LocalPreviewVideo>
          <DeviceSelect localMedia={localMedia!} />
          {!isHost && <RoomIdInput roomId={roomId} setRoomId={setRoomId} />}
          <StyledRoomButton width={20} height={4} onClick={handleSubmit}>
            {connectingMsg}
          </StyledRoomButton>
        </Modal>
      )}
      {complete ? (
        <VideoContainer isRoomFull={isRoomFull}>
          <LocalVideo localMedia={localMedia!} activeCamera={activeCamera} />
          <Room roomId={roomId} isCenter={isMyCameraCenter} />
        </VideoContainer>
      ) : (
        <LocalVideo localMedia={localMedia!} activeCamera={activeCamera} />
      )}
      <TodayContainer>
        <TodayInputBox
          title="방 번호"
          height={2}
          value={roomId}
        ></TodayInputBox>
        <TodayInputBox title="진료 내용" height={10}></TodayInputBox>
        <TodayInputBox title="진료 소견" height={2}></TodayInputBox>
        <TodayInputBox title="치료 방법" height={5}></TodayInputBox>
        <TodayInputBox title="처방 내용" height={5}></TodayInputBox>
        <TodayButtonContainer>
          <TodayButton
            onClick={() => {
              handleChangeCam();
            }}
          >
            화면 전환
          </TodayButton>
          <TodayButton
            onClick={() => {
              handleDisconnect();
            }}
          >
            상담 종료
          </TodayButton>
          <TodayButton
            onClick={() => {
              handleOnMicActive();
            }}
          >
            {activeMic ? "마이크 끄기" : "마이크 켜기"}
          </TodayButton>
          <TodayButton
            onClick={() => {
              handleOnCameraActive();
            }}
          >
            {activeCamera ? "카메라 끄기" : "카메라 켜기"}
          </TodayButton>
        </TodayButtonContainer>
      </TodayContainer>
    </Container>
  );
};

export default Lobby;
