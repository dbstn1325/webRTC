import { LocalVideoState } from "./../../recoil/localVideo";
import ConnectLive from "@connectlive/connectlive-web-sdk";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Conf } from "../../recoil/conf";
import { ConnectState } from "../../recoil/connectState";
import { LocalAudio } from "../../recoil/localAudio";

function handleDisconnect(setConnect: any) {
  const [localAudio, setLocalAudio] = useRecoilState<any>(LocalAudio);
  const [localVideo, setLocalVideo] = useRecoilState<any>(LocalVideoState);
  const [conf, setConf] = useRecoilState<any>(Conf);

  const [isConnect, setIsConnect] = useRecoilState(ConnectState);
  const navigate = useNavigate();
  setLocalAudio(null);
  setLocalVideo(null);

  conf.disconnect();

  setConf(null);

  ConnectLive.signOut();

  setConnect(false);
  setIsConnect(false);
  navigate("/");
}

export default handleDisconnect;
