import styled from "styled-components";

const DialogBox = styled.dialog<DialogInterface>`
  position: relative;
  width: 30%;
  height: ${(props) => (props.isHost ? "84%" : "95%")};
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0.7rem;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

interface DialogInterface {
  isHost: boolean;
}
export default DialogBox;
