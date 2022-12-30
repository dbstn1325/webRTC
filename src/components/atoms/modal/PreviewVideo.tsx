import styled from "styled-components";

/**
 ** 모달창에서 미리 보기로 나오는 나의 카메라에 대한 컴포넌트
 */
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
