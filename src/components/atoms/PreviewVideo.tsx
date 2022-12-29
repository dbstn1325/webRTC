import styled from "styled-components";

const PreviewVideo = styled.video<PreviewVideoProps>`
  width: 100%;
  height: ${(props) => props.height}rem;
  border-radius: 7px;
  object-fit: fill;
  margin-bottom: 20px;
`;

interface PreviewVideoProps {
  height: number;
}

export default PreviewVideo;
