import styled from "styled-components";

const VideoContainer = styled.div<VideoContainerProps>`
  position: relative;
  width: ${(props) => props.width}rem;
`;

interface VideoContainerProps {
  width: number;
}

export default VideoContainer;