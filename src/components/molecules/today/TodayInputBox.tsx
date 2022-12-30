import TodayInput from "../../atoms/TodayMedical/TodayInput";
import TodayInputContianer from "../../atoms/TodayMedical/TodayInputContainer";
import TodayInputLabel from "../../atoms/TodayMedical/TodayInputLabel";

const TodayInputBox = ({ title, height, value }: TodayInputBox) => {
  return (
    <TodayInputContianer>
      <TodayInputLabel>{title}</TodayInputLabel>
      <TodayInput height={height} value={value} readOnly />
    </TodayInputContianer>
  );
};

interface TodayInputBox {
  title: string;
  height: number;
  value?: string;
}

export default TodayInputBox;
