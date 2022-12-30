import React from "react";
import TodayInnerContainer from "../../atoms/TodayMedical/TodayInnerContainer";
import TodayOuterContainer from "../../atoms/TodayMedical/TodayOuterContainer";

/**
 * Outer와 Inner 컴포넌트의 레이아웃 담당
 */
const TodayContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <TodayOuterContainer>
      <TodayInnerContainer>{children}</TodayInnerContainer>
    </TodayOuterContainer>
  );
};

export default TodayContainer;
