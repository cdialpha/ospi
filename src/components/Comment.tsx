import React, { useState } from "react";
import Image from "next/image";
import tw from "twin.macro";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { useSession } from "next-auth/react";

const Action = styled.p`
  ${tw`
ml-2 text-sm text-gray-500
hover:text-gray-800
hover:underline
cursor-pointer
`}
`;

export type CommentProps = {
  commentId: string;
  User: User;
  postId: string;
  text: string;
  createdAt: Date;
  selectedAnswer: boolean;
  upVotes: number;
  updatedAt?: Date;
  images: string[];
};
// could consolodate with existing type from postcard.tsx
export type User = {
  name: String;
  image: String;
};

const Comment: React.FC<CommentProps> = ({
  User,
  text,
  commentId,
  selectedAnswer,
  upVotes,
}) => {
  const { name, image } = User;
  const session = useSession();
  const [displayReply, setDisplayReply] = useState(false);

  return (
    <div key={commentId}>
      <div className="mt-2 flex border-2 align-items[center]">
        <div className="ml-2 flex flex-col mt-auto mb-auto">
          <p className="text-gray-200 text-center"> {upVotes} </p>
          <BsCheck
            className={selectedAnswer ? "text-green-700" : `text-gray-200`}
          />
        </div>
        <div className="relative ml-4 mt-2 mb-auto">
          <Image
            src={image}
            height={50}
            width={50}
            className="rounded-3xl mb-auto"
          />
        </div>
        <div className="ml-2 pt-2 pb-2 mr-10 w-4/5">
          <h2 className="font-bold text-sm">{name}</h2>
          <h1>{text}</h1>
        </div>
      </div>
      <div className="flex">
        {name == session.data?.user?.name ? (
          <>
            <Action onClick={() => setDisplayReply(!displayReply)}>
              reply
            </Action>
            <Action> edit </Action>
            <Action data-modal="modal-one"> delete </Action>
          </>
        ) : (
          <>
            <Action> upvote </Action>
            <Action> reply </Action>
            <Action> report </Action>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
