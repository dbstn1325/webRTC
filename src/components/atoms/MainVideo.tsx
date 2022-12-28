import styled from "styled-components";

const MainVideo = styled.video<MainVideoProps>`
  width: ${(props) => props.width}rem;
  height: 70vh;
  object-fit: fill;
  border-radius: 2%;
`;

interface MainVideoProps {
  width: number;
  height: number;
}

export default MainVideo;
