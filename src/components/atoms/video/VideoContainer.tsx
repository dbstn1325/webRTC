import styled from "styled-components";

const VideoContainer = styled.div<VideoContainerProps>`
  position: relative;
  width: 100%;
`;

interface VideoContainerProps {
  isAlone: boolean;
}

export default VideoContainer;
