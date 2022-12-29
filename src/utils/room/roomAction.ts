import ConnectLive, {
  IRemoteParticipant,
  IRemoteVideo,
  IRoom,
  IRoomEventRemoteAudioPublished,
} from "@connectlive/connectlive-web-sdk";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LocalVideo } from "../../recoil/localVideo";
import { CameraDeviceId } from "../../recoil/cameraDevice";
import { CameraDeviceActive } from "../../recoil/cameraDeviceActive";
import { Conf } from "../../recoil/conf";
import { LocalAudio } from "../../recoil/localAudio";

import { MicDeviceId } from "../../recoil/micDevice";
import { MicDeviceActive } from "../../recoil/micDeviceActive";
import { RemoteParticipantsState } from "../../recoil/remoteParticipants";
import { RemoteParticipantsVideosState } from "../../recoil/remoteParticipantVideos";
import { RemoteSubscribeVideosState } from "../../recoil/remoteSubscribeVideos";
import { SpeakerDeviceId } from "../../recoil/speakerDevice";
import { AudioOccupants } from "../../recoil/audioOccupants";
import { AlwaysOnAudio } from "../../recoil/alwaysOnAudio";
import { ConnectState } from "../../recoil/connectState";

/**
 * 다른 참여자의 비디오를 가져온다.
 */
async function roomInit({
  conf,
  activeMic,
  micDeviceId,
  setLocalAudio,
  activeCamera,
  cameraDeviceId,
  setLocalVideo,
  setRemoteParticipants,
  setRemoteParticipantVideos,
  setRemoteSubscribeVideos,
  setAudioOccupants,
  setConf,
  speakerDeviceId,
  setAlwaysOnAudio,
}: any) {
  try {
    const _conf: IRoom = conf!;

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
        setRemoteParticipants((oldRemoteParticipants: any[]) => [
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
      setRemoteParticipantVideos((oldRemoteParticipantVideos: any[]) => [
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
      setRemoteParticipantVideos((oldRemoteParticipantVideos: any[]) => {
        return oldRemoteParticipantVideos.filter((remoteVideoId: number) => {
          return event.remoteVideo.videoId !== remoteVideoId;
        });
      });

      setRemoteSubscribeVideos((oldRemoteSubscribeVideos: any[]) => {
        return oldRemoteSubscribeVideos.filter((remoteVideo: IRemoteVideo) => {
          return event.remoteVideo.videoId !== remoteVideo.videoId;
        });
      });
    });

    /*
        참여자가 방에서 나가서 연결이 끊어졌을 때 호출하는 이벤트
      */
    _conf.on("participantLeft", (event) => {
      // setConnect(false);
      setRemoteParticipants((oldRemoteParticipants: any[]) => {
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
      setRemoteSubscribeVideos((oldRemoteSubscribeVideos: any[]) => [
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

        setConf(null);

        ConnectLive.signOut();
      }
    });

    // 기존에 참여하고 있는 구독자 배열을 순회하며, 비디오 구독 및 엘리먼트 생성
    _conf.remoteParticipants.forEach((participant) => {
      // 구독하지 않은 비디오 배열 가져오기
      const unsubscribedVideos = participant.getUnsubscribedVideos();

      // 구독하지 안은 비디오 아이디 추출하기
      if (unsubscribedVideos.length) {
        const videoIds = unsubscribedVideos.map((video) => video.getVideoId());

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
      setRemoteParticipants((oldRemoteParticipants: any) => [
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
}

type audioConstraintType = {
  audio: boolean | object;
};

type videoConstraintType = {
  video: boolean | object;
};

export default roomInit;
