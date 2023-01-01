import TodayInput from "../../atoms/TodayMedical/TodayInput";
import TodayInputContianer from "../../atoms/TodayMedical/TodayInputContainer";
import TodayInputLabel from "../../atoms/TodayMedical/TodayInputLabel";

const TodayInputBox = ({ title, height, value }: TodayInputBox) => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      // alert("복사 성공!");
    } catch (error) {
      // alert("복사 실패!");
    }
  };
  return (
    <TodayInputContianer>
      <TodayInputLabel>{title}</TodayInputLabel>
      <TodayInput
        height={height}
        value={value}
        readOnly
        onClick={() => {
          handleCopyClipBoard(value!);
        }}
      />
    </TodayInputContianer>
  );
};

interface TodayInputBox {
  title: string;
  height: number;
  value?: string;
}

export default TodayInputBox;
