import styled from "styled-components";

const VideoContainer = styled.div<VideoContainerProps>`
  position: relative;
  width: 100%;
`;

interface VideoContainerProps {
  isRoomFull?: boolean;
}

export default VideoContainer;
