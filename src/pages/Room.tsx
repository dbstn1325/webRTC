import ConnectLive, {
  ILocalVideo,
  IRemoteParticipant,
  IRemoteVideo,
  IRoom,
  IRoomEventRemoteAudioPublished,
  IRoomEventRemoteVideoPublished,
} from "@connectlive/connectlive-web-sdk";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boolean } from "yargs";
import RemoteVideo from "../components/RemoteVideo";
import { AlwaysOnAudio } from "../recoil/alwaysOnAudio";
import { AudioOccupants } from "../recoil/audioOccupants";

import { CameraDeviceId } from "../recoil/cameraDevice";
import { CameraDeviceActive } from "../recoil/cameraDeviceActive";
import { Conf } from "../recoil/conf";
import { LocalAudio } from "../recoil/localAudio";
import { LocalScreen } from "../recoil/localScreen";
import { LocalVideo } from "../recoil/localVideo";
import { MicDeviceId } from "../recoil/micDevice";
import { MicDeviceActive } from "../recoil/micDeviceActive";
import { SpeakerDeviceId } from "../recoil/speakerDevice";

const Room = ({ roomId }: RoomProps) => {
  const navigate = useNavigate();
  /*
    원격 참여자들에 관련된 상태변수
  */

  const [remoteParticipants, setRemoteParticipants] = useState<
    IRemoteParticipant[]
  >([]);
  const [remoteParticipantVideos, setRemoteParticipantVideos] = useState<
    IRemoteVideo[]
  >([]);
  const [remoteSubscribeVideos, setRemoteSubscribeVideos] = useState<
    IRemoteVideo[]
  >([]);
  /*
    카메라 또는 마이크가 켜져 있는지
    확인하는 상태 변수
  */
  const [activeMic] = useRecoilState(MicDeviceActive);
  const [activeCamera] = useRecoilState(CameraDeviceActive);

  /*
    카메라 또는 마이크 ID를
    확인하는 상태 변수
  */
  const [cameraDeviceId] = useRecoilState(CameraDeviceId);
  const [micDeviceId] = useRecoilState(MicDeviceId);
  const [speakerDeviceId] = useRecoilState(SpeakerDeviceId);

  /*
    현재 쓰고 있는 로컬오디오와 비디오
  */
  const [localAudio, setLocalAudio] = useRecoilState<any>(LocalAudio);
  const [localVideo, setLocalVideo] = useRecoilState<any>(LocalVideo);

  /*
    생성된 방의 정보를 담고 있는 conf 변수
  */
  const [conf, setConf] = useRecoilState<any>(Conf);
  console.log(conf);

  /*
    참여자의 송출되는 오디오(소리)에 관한 상태변수
  */
  const setAudioOccupants = useSetRecoilState(AudioOccupants);
  const setAlwaysOnAudio = useSetRecoilState(AlwaysOnAudio);

  const setLocalScreen = useSetRecoilState(LocalScreen);

  const init = async () => {
    try {
      const _conf: IRoom = conf!;
      console.log(conf);

      let _localAudio;
      let _localVideo;

      /*
        마스크가 활성화 되었을 때 동작
        activeMic : boolean (마이크의 활성화 여부)
      */
      if (activeMic) {
        let constraint: audioConstraintType = {
          audio: activeMic,
        };

        /*
        마이크가 존재하고, 해당 마이크를 사용할 수 있을 때 동작
        micDeviceId : String (해당 마이크 장치의 번호)
        */
        if (micDeviceId && typeof micDeviceId === "string") {
          constraint.audio = { deviceId: { exact: micDeviceId } };
        }

        /*
        ConnectLive.createLocalMedia(constraint)
        : 방에 들어오는 참여자가 생성하는 로컬 오디오의 처리를 위한 함수
        */
        _localAudio = await ConnectLive.createLocalMedia(constraint);
        setLocalAudio(_localAudio);
      }

      /*
        카메라가 활성화 되었을 경우 로직
      */

      if (activeCamera) {
        let constraint: videoConstraintType = {
          video: activeCamera,
        };

        /*
            활성화된 카메라 디바이스 아이디를
            constarint 객체 내에 저장
        */

        if (cameraDeviceId && typeof cameraDeviceId === "string") {
          constraint.video = { deviceId: { exact: cameraDeviceId } };
        }

        /*
        ConnectLive.createLocalMedia(constraint)
        : 방에 들어오는 참여자가 생성하는 로컬 비디오의 처리를 위한 함수
        */
        _localVideo = await ConnectLive.createLocalMedia(constraint);

        /*
        setExtraValue(value)
        서비스에서 필요한 값을 value로 설정
        */
        _localVideo.video!.setExtraValue("camera");
        setLocalVideo(_localVideo);

        /*
    새로운 참가자가 들어왔을 때 이벤트
    */
        _conf.on("participantEntered", (evt) => {
          setRemoteParticipants((oldRemoteParticipants) => [
            ...oldRemoteParticipants,
            evt.remoteParticipant,
          ]);
        });
      }

      /*
        새로운 참여자가 자신의 비디오(캠)공유를 켰을 때
        호출되는 이벤트
      */
      _conf.on("remoteVideoPublished", (event) => {
        setRemoteParticipantVideos((oldRemoteParticipantVideos) => [
          ...oldRemoteParticipantVideos,
          event.remoteVideo.videoId,
        ]);
      });

      /*
        새로운 참여자가 자신의 비디오(캠)공유를 껐을 때
        호출되는 이벤트
      */
      _conf.on("remoteVideoUnpublished", (event) => {
        /*
            참가자 비디오 배열에서 카메라를 끈 사람을 찾아서
            참여자를 제거한다.
        */
        setRemoteParticipantVideos((oldRemoteParticipantVideos) => {
          return oldRemoteParticipantVideos.filter((remoteVideoId) => {
            return event.remoteVideo.videoId !== remoteVideoId;
          });
        });

        setRemoteSubscribeVideos((oldRemoteSubscribeVideos) => {
          return oldRemoteSubscribeVideos.filter(
            (remoteVideo: IRemoteVideo) => {
              return event.remoteVideo.videoId !== remoteVideo.videoId;
            }
          );
        });
      });

      /*
        참여자가 방에서 나가서 연결이 끊어졌을 때 호출하는 이벤트
      */
      _conf.on("participantLeft", (event) => {
        setRemoteParticipants((oldRemoteParticipants) => {
          return oldRemoteParticipants.filter(
            (participant: IRemoteParticipant) => {
              return event.remoteParticipantId !== participant.id;
            }
          );
        });
      });

      /*
        참여자의 비디오 상태가 변경되면 호출
      */
      _conf.on("remoteVideoStateChanged", () => {
        setRemoteSubscribeVideos((oldRemoteSubscribeVideos) => [
          ...oldRemoteSubscribeVideos,
        ]);
      });

      /*
      원격 참여자가 방에 오디오 송출을 허용 했을 때
      발생하는 이벤트
      */
      _conf.on(
        "remoteAudioPublished",
        (event: IRoomEventRemoteAudioPublished) => {
          setAudioOccupants((oldAudioOccupants: any) => {
            const o = { ...oldAudioOccupants };
            o[+event.remoteParticipant.id] = true;
            return o;
          });
        }
      );

      /*
      로컬 참여자가 Room에 공유 중인 오디오를 공유 해제했을 때 호출
      */
      _conf.on("remoteAudioUnpublished", (event) => {
        setAudioOccupants((oldAudioOccupants: any) => {
          const o = { ...oldAudioOccupants };
          o[event.remoteParticipant.id] = false;
          return o;
        });
      });

      /*
        참여자의 오디오가 변경 됐을 때 호출
      */
      _conf.on("remoteAudioStateChanged", (event) => {
        /*
        로컬 오디오를 항상 내보낼 때
        */
        if (event.remoteAudio.isAlwaysOn) {
          setAlwaysOnAudio(event.remoteParticipant);
        }
        setAlwaysOnAudio({});
      });

      /*
        참가자가 방을 나갔을 때 이벤트
      */
      _conf.on("disconnected", (reason) => {
        if (reason === "destroyed" || reason === "kicked") {
          setLocalAudio(null);
          setLocalVideo(null);
          setLocalScreen(null);

          // setConf(null);

          ConnectLive.signOut();
          console.log("종료됨 ㅋㅋ");
        }
      });

      // 기존에 참여하고 있는 구독자 배열을 순회하며, 비디오 구독 및 엘리먼트 생성
      _conf.remoteParticipants.forEach((participant) => {
        // 구독하지 않은 비디오 배열 가져오기
        const unsubscribedVideos = participant.getUnsubscribedVideos();

        // 구독하지 안은 비디오 아이디 추출하기
        if (unsubscribedVideos.length) {
          const videoIds = unsubscribedVideos.map((video) =>
            video.getVideoId()
          );

          // 해당 비디오 추가
          setRemoteParticipantVideos((oldRemoteParticipantVideos: any) => [
            ...oldRemoteParticipantVideos,
            ...videoIds,
          ]);
        }

        // 오디오 사용자 업데이트
        Object.values(_conf.audioOccupants).forEach((audio) => {
          setAudioOccupants((oldAudioOccupants: any) => {
            const o = { ...oldAudioOccupants };
            o[Number(audio.id)] = true;
            return o;
          });
        });

        // 참여자 업데이트
        setRemoteParticipants((oldRemoteParticipants) => [
          ...oldRemoteParticipants,
          participant,
        ]);
      });

      /*
        switchSpeaker()
        스피커 장치 변경하기
      */
      if (speakerDeviceId !== "") {
        _conf.switchSpeaker(speakerDeviceId);
      }

      /*
        publish([audio, video])
        자신의 오디오와 비디오를 Room에 송충하기
      */
      if (_localAudio) {
        await _conf.publish([_localAudio]);
      }

      if (_localVideo) {
        await _conf.publish([_localVideo]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /*
        접속정보
    */
  useEffect(() => {
    if (conf && !localAudio && !localVideo) {
      init();
      console.log("실행");
    } else {
      navigate("/");
    }
  }, [conf]);

  useEffect(() => {
    (async () => {
      if (!conf) {
        return;
      }

      const unsubscribeVideoIds = remoteSubscribeVideos.map(
        (remoteVideo) => remoteVideo.videoId
      );
      unsubscribeVideoIds.length &&
        (await conf.unsubscribe(unsubscribeVideoIds));

      let remoteVideos: IRemoteVideo[] = [];
      const results = await Promise.allSettled(
        remoteParticipantVideos.map((videoId: any) => conf.subscribe([videoId]))
      );
      results.forEach((res: any) => {
        if (res.value) {
          remoteVideos = [...remoteVideos, ...res.value];
        }
      });
      setRemoteSubscribeVideos([...remoteVideos]);
    })();
  }, [remoteParticipantVideos]);
  return (
    <div>
      <p> 해당 방 번호: {roomId} </p>
      <p>연결된 분</p>
      {remoteSubscribeVideos.map((remoteVideo, i) => {
        return (
          <div key={i}>
            <RemoteVideo remoteVideo={remoteVideo} />
          </div>
        );
      })}
    </div>
  );
};

export default Room;

type RoomProps = {
  roomId?: string;
};

type audioConstraintType = {
  audio: boolean | object;
};

type videoConstraintType = {
  video: boolean | object;
};
