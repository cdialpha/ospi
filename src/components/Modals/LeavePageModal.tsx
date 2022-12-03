import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ModalShell from "./ModalShell";
import { ModalManagerProps } from "./ModalManager";
import { ModalProps } from "./DeleteCommentModal";

const ModalMask = styled.div`
  ${tw`
  fixed
  [top:0px]
  [bottom:0px]
  [left:0px]
  [right:0px]
  z-10
  bg-opacity-50
  bg-black
  `}
`;
const ModalBody = styled.div`
  ${tw`
    flex
    flex-col
    [position:fixed]
    [width:300px]
    [height:200px]
    [border-radius:10px]
    border-4

  `}
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1000;
`;
const Header = styled.div`
  ${tw`
    flex
    justify-between
    [align-items:center]
    [padding:20px]
`}
`;
const ModalTitle = styled.h1`
  ${tw`
[font-weight:900]
text-3xl
`}
`;
const Actions = styled.div`
  ${tw`
  flex
  justify-center
  `}
`;
const CancelButton = styled.button`
  ${tw`
    [width:200px]
    border-2
    border-gray-700
    bg-gray-50
    text-gray-700
    mt-5
    [border-radius:10px]
    hover:bg-gray-100
    hover:border-gray-900
    hover:text-gray-900
    `}
`;
const SubmitButton = styled.button`
  ${tw`
    [width:200px]
    border-2
    border-red-700
    bg-red-50
    text-red-700
    mt-5
    ml-5
    [border-radius:10px]
    hover:bg-red-100
    hover:border-red-900
    hover:text-red-900
    `}
`;

const LeaveModal = ({ closeFn, open = false, payload }: ModalProps) => {
  //   if (payload.length) payload = JSON.parse(payload);

  return (
    <ModalShell open={open}>
      <ModalMask>
        <ModalBody>
          <Header>
            <ModalTitle>Are you sure you want to leave the page?</ModalTitle>
            <ModalTitle>All data will be lost </ModalTitle>
          </Header>
          <Actions>
            <CancelButton onClick={closeFn}>cancel</CancelButton>
            <SubmitButton onClick={closeFn}>yes</SubmitButton>
          </Actions>
        </ModalBody>
      </ModalMask>
    </ModalShell>
  );
};

export default LeaveModal;
