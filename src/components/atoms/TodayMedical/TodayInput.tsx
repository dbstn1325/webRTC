import styled from "styled-components";

const TodayInput = styled.input<TodayInputType>`
  box-sizing: border-box;
  background-color: white;
  border: 2px solid #e8e8e8;
  border-radius: 6px;
  width: 100%;
  height: ${(props) => props.height}rem;
  font-family: "PretendardLight";
  font-size: 1rem;
  color: black;
  padding-left: 10px;
  z-index: 1000000;
`;

interface TodayInputType {
  height: number;
}

export default TodayInput;
