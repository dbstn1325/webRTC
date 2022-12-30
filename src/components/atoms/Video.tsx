import styled from "styled-components";

const Video = styled.video<VideoProps>`
  ${(props) =>
    props.isMain || props.isRoomFull ? "" : "position : absolute;"};
  width: ${(props) => (props.isMain || props.isRoomFull ? "100%" : "20%")};
  height: ${(props) => (props.isMain || props.isRoomFull ? "90vh" : "13rem")};
  border-radius: ${(props) =>
    props.isMain || props.isRoomFull ? "2%" : "10px"};
  ${(props) => (props.isMain || props.isRoomFull ? "" : "right : 1.5em;")}
  ${(props) => (props.isMain || props.isRoomFull ? "" : "bottom : 4rem;")}
  object-fit: fill;
`;

interface VideoProps {
  isMain: boolean;
  isRoomFull: boolean;
}

export default Video;
