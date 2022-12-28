import styled from "styled-components";

const SubVideo = styled.video<SubVideoProps>`
  position: absolute;
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  border-radius: 10px;
  right: 5px;
  bottom: 10px;
  object-fit: fill;
`;

interface SubVideoProps {
  width: number;
  height: number;
}

export default SubVideo;
