import styled from "styled-components";

/**
 * 모달 창에서 입장하기 부분관련
 */
const StyledRoomButton = styled.button<StyledRoomButtonProps>`
  width: 100%;
  height: ${(props) => props.height}rem;
  background-color: #018ddc;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  font-family: "PretendardBold";
  font-size: 1.3rem;
  color: #ffffff;
`;

interface StyledRoomButtonProps {
  width: number;
  height: number;
}

export default StyledRoomButton;
