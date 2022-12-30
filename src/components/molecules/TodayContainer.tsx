import React from "react";
import TodayInnerContainer from "../atoms/TodayMedical/TodayInnerContainer";
import TodayOuterContainer from "../atoms/TodayMedical/TodayOuterContainer";

const TodayContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <TodayOuterContainer>
      <TodayInnerContainer>{children}</TodayInnerContainer>
    </TodayOuterContainer>
  );
};

export default TodayContainer;
