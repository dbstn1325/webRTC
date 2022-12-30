import styled from "styled-components";

/**
 * 나의 카메라와 사용자의 카메라에 관련된 컴포넌트
 * isMain의 여부에 따라서 메인(큰) 카메라와 오른쪽 아래의 서브(작은) 카메라 크기 담당
 * 초기값
 * 사용자의 카메라 => isMain : False, 참여자의 카메라 => isMain : True
 * 상태를 통해 isMain의 값이 서로 바뀌게 된다.
 */
const Video = styled.video<VideoProps>`
  ${(props) =>
    props.isMain || props.isRoomFull ? "" : "position : absolute;"};
  width: ${(props) => (props.isMain || props.isRoomFull ? "100%" : "33%")};
  height: ${(props) => (props.isMain || props.isRoomFull ? "95vh" : "15rem")};
  border-radius: ${(props) =>
    props.isMain || props.isRoomFull ? "2%" : "10px"};
  ${(props) => (props.isMain || props.isRoomFull ? "" : "right : 1.1em;")}
  ${(props) => (props.isMain || props.isRoomFull ? "" : "bottom : 1rem;")}
  object-fit: fill;
`;

/**
 * isRoomFull은 참여자가 없이 나 혼자 들어갔을 떼 상태를 알려주는 변수
 */
interface VideoProps {
  isMain: boolean;
  isRoomFull: boolean;
}

export default Video;
