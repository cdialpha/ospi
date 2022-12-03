import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { createReplyType } from "../schema/comment.schema";
import { TbArrowBack } from "react-icons/tb";
import { useRouter } from "next/router";

type ReplyFormProps = {
  commentId: string;
  postId: string;
};

const ReplyForm: React.FC<ReplyFormProps> = ({ commentId, postId }) => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const router = useRouter();
  const replyProfilePic = session.data?.user?.image;
  const { handleSubmit, register, reset, getValues } =
    useForm<createReplyType>();
  const { mutate, error } = trpc.useMutation(["comments.create-reply"], {
    onSuccess: () => {
      reset();
      // refetch
    },
  });

  const onSubmit = () => {
    const values = getValues();
    values.commentId = commentId;
    values.postId = postId;
    values.userId = userId!;
    console.log(values);
    mutate(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ml-10 flex pt-2 pb-2 h-15 align-items[center]">
          <Image
            src={replyProfilePic!}
            height={50}
            width={50}
            className="rounded-3xl mb-auto"
          />
          <input
            placeholder=" reply..."
            {...register("text")}
            className="border-2 border-gray-200 mt-auto mb-auto ml-2 pl-2 rounded-xl"
          />
          <button
            type="submit"
            className="rounded-xl w-7 h-7 hover:bg-green-50 ml-2 mt-auto mb-auto"
          >
            <TbArrowBack className="text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
