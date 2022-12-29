import React, { PropsWithChildren } from "react";
import Backdrop from "../../atoms/modal/BackDrop";
import DialogBox from "../../atoms/modal/DialogBox";
import ModalContainer from "../../atoms/modal/ModalContainer";

const Modal = ({
  onClickToggleModal,
  isHost,
  children,
}: PropsWithChildren<ModalDefaultType>) => {
  return (
    <ModalContainer>
      <DialogBox isHost={isHost}>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
};

interface ModalDefaultType {
  onClickToggleModal: () => void;
  isHost: boolean;
}

export default Modal;
