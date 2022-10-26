import React, { useState } from "react";
import Image from "next/image";
import tw from "twin.macro";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { getPostAge } from "../utils/convertDate";
import { useForm } from "react-hook-form";
import { editCommentType } from "../schema/comment.schema";
import { trpc } from "../utils/trpc";
import ReplyForm from "./ReplyForm";

export const Action = styled.p`
  ${tw`
ml-2 text-sm text-gray-500
hover:text-gray-800
hover:underline
cursor-pointer
`}
`;

export type Comment = {
  commentId: string;
  User: User;
  commentedById: string;
  parentId?: string;
  postId: string;
  text: string;
  createdAt: Date;
  selectedAnswer: boolean;
  upVotes: number;
  updatedAt?: Date;
  images?: string[];
  replies?: Comment[];
};

// could consolodate with existing User type from postcard.tsx
export type User = {
  name: String;
  image: String;
  userId: String;
};

const Comment: React.FC<Comment> = ({
  User,
  text,
  commentId,
  selectedAnswer,
  upVotes,
  images,
  createdAt,
  commentedById,
  postId,
  replies,
  parentId,
}) => {
  const { name, image } = User;
  console.log(replies);
  const session = useSession();
  const [displayReply, setDisplayReply] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const commentAge = getPostAge(createdAt);
  const payload = JSON.stringify({ commentId, commentedById });
  // TODO: add editcomment type.
  const { handleSubmit, register, reset } = useForm<editCommentType>();
  // TODO: disable reply feature when no user is logged in

  const toggleDisplayReply = () => {
    setDisplayReply(!displayReply);
  };

  const toggleDisplayEdit = () => {
    setDisplayEdit(!displayEdit);
    // if dirty and user tries to leave site, display modal "are you sure?" ?
  };

  return (
    <div className={parentId ? "ml-20" : ""}>
      <div className="mt-2 flex border-2 align-items[center] rounded-lg">
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
          <div className="flex mb-1">
            <h2 className="font-bold text-sm">{name}</h2>
            <h2 className="text-sm ml-2 text-gray-400"> {commentAge} </h2>
          </div>
          {displayEdit ? (
            <form>
              <input
                value={text}
                {...register("text")}
                className="border-2 border-gray-200 mt-auto mb-auto ml-2 pl-2 rounded-xl"
              />
              <button
                type="submit"
                className="rounded-xl border-2 border-gray-200 pl-2 pr-2 ml-2 hover:bg-gray-100"
              >
                submit
              </button>
              <button className="rounded-xl border-2 border-gray-200 pl-2 pr-2 ml-2 hover:bg-gray-100">
                cancel
              </button>
            </form>
          ) : (
            <h1>{text}</h1>
          )}
          {images && images.length
            ? images.map((image, index) => (
                <Image key={index} src={image} height={100} width={100} />
              ))
            : null}
        </div>
      </div>
      <div className="flex">
        {name == session.data?.user?.name ? (
          <>
            <Action onClick={toggleDisplayReply}>reply</Action>
            <Action onClick={toggleDisplayEdit}> edit </Action>
            <Action data-modal="modal-one" data-payload={payload}>
              delete
            </Action>
          </>
        ) : (
          <>
            <Action> upvote </Action>
            <Action> downvote </Action>
            <Action> reply </Action>
            <Action> report </Action>
          </>
        )}
      </div>
      {replies && replies.length > 0
        ? replies.map((reply: Comment) => {
            return (
              <Comment
                key={reply.commentId}
                commentId={reply.commentId}
                commentedById={reply.commentedById}
                postId={reply.postId}
                text={reply.text}
                User={reply.User}
                createdAt={reply.createdAt}
                selectedAnswer={reply.selectedAnswer}
                upVotes={reply.upVotes}
                parentId={reply.parentId}
              />
            );
          })
        : null}
      {displayReply && <ReplyForm postId={postId} commentId={commentId} />}
    </div>
  );
};

export default Comment;
