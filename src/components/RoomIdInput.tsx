import React from "react";
import SelectBoxLabel from "./atoms/modal/SelectBoxLabel";
import StyledRoomInput from "./atoms/modal/StyledRoomInput";
import SelectBoxContainer from "./atoms/modal/SelectBoxContainer";

const RoomIdInput = ({ roomId, setRoomId }: RoomIdInterface) => {
  return (
    <SelectBoxContainer>
      <SelectBoxLabel>방 번호</SelectBoxLabel>

      <StyledRoomInput
        type="string"
        placeholder="입장하실 방 번호"
        onChange={(event) => {
          setRoomId(event.target.value);
        }}
        required
      />
    </SelectBoxContainer>
  );
};

interface RoomIdInterface {
  roomId: string;
  setRoomId: Function;
}

export default RoomIdInput;
