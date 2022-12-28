import React from "react";

const RoomIdInput = ({ roomId, setRoomId }: RoomIdInterface) => {
  return (
    <input
      type="string"
      placeholder="입장하실 방 번호"
      onChange={(event) => {
        setRoomId(event.target.value);
      }}
      required
    />
  );
};

interface RoomIdInterface {
  roomId: string;
  setRoomId: Function;
}

export default RoomIdInput;
