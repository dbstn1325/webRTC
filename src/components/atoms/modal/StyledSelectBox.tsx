import styled from "styled-components";

/**
 * 카메라, 마이크 선택에 관한 SelectBox 컴포넌트
 */
const StyledSelectBox = styled.select`
  width: 100%;
  height: 3rem;
  font-family: "PretendardMedium";
  font-size: 1rem;
  padding: 0 1.2rem 0 1.2rem;
  border: 1px solid #018ddc;
  border-radius: 8px;
  -webkit-appearance: none; /* 크롬 화살표 없애기 */
  -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
  appearance: none; /* 화살표 없애기 */
`;

export default StyledSelectBox;
