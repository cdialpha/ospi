import React from "react";
import ReactDOM from "react-dom";
// Modal Components
import DeleteCommentModal from "./DeleteCommentModal";
import LeaveModal from "./LeavePageModal";

export type ModalManagerProps = {
  closeFn: () => void;
  modal: string;
  payload: any;
};

const ModalManager = ({ closeFn, modal, payload }: ModalManagerProps) => {
  console.log("modal", modal);

  return (
    <>
      <DeleteCommentModal
        closeFn={closeFn}
        open={modal === "modal-one"}
        payload={payload}
      />
      <LeaveModal
        closeFn={closeFn}
        open={modal === "modal-two"}
        payload={payload}
      />
    </>
  );
};

export default ModalManager;
