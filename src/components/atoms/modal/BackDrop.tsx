import styled from "styled-components";

const Backdrop = styled.div`
  width: 110vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
`;

export default Backdrop;
