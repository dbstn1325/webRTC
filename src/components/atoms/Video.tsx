import styled from "styled-components";

const Video = styled.video<VideoProps>`
  ${(props) => (props.isMain || props.isAlone ? "" : "position : absolute;")};
  width: ${(props) => (props.isMain || props.isAlone ? "100%" : "20%")};
  height: ${(props) => (props.isMain || props.isAlone ? "90vh" : "13rem")};
  border-radius: ${(props) => (props.isMain || props.isAlone ? "2%" : "10px")};
  ${(props) => (props.isMain || props.isAlone ? "" : "right : 1.5em;")}
  ${(props) => (props.isMain || props.isAlone ? "" : "bottom : 4rem;")}
  object-fit: fill;
`;

interface VideoProps {
  isMain: boolean;
  isAlone: boolean;
}

export default Video;
