import styled from "styled-components";

const Video = styled.video<VideoProps>`
  ${(props) => (props.isMain || props.isAlone ? "" : "position : absolute;")};
  width: ${(props) => (props.isMain || props.isAlone ? "27rem" : "10rem")};
  height: ${(props) => (props.isMain || props.isAlone ? "90vh" : "10rem")};
  border-radius: ${(props) => (props.isMain || props.isAlone ? "2%" : "10px")};
  ${(props) => (props.isMain || props.isAlone ? "" : "right : 5px;")}
  ${(props) => (props.isMain || props.isAlone ? "" : "bottom : 2.2rem;")}
  object-fit: fill;
`;

interface VideoProps {
  isMain: boolean;
  isAlone: boolean;
}

export default Video;
