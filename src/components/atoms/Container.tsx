import styled from "styled-components";

/**
 * 페이지 전체를 둘러싸는 컨테이너
 * 페이지의 전체 패딩과 레이아웃을 담당
 */
const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100vw;
  height: 100vh;
  padding: 20px 20px 20px 20px;
  background-color: #f8f8f8;
`;

export default Container;
