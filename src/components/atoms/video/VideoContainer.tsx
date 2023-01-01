import styled from "styled-components";

const VideoContainer = styled.div<VideoContainerProps>`
  ${(props) => (props.isRoomFull ? "position : relative;" : "")}
  width: 100%;
`;

interface VideoContainerProps {
  isRoomFull: boolean;
}

export default VideoContainer;
