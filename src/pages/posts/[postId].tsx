import { useState } from "react";
import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import tw from "twin.macro";
import styled from "styled-components";
import SideNav from "../../components/SideNav";
import { getPostAge } from "../../utils/convertDate";
import {
  FaHistory,
  FaRegBookmark,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { MdSort } from "react-icons/md";
import Image from "next/image";
import { getSinglePost } from "../../schema/post.schema";
import Comment, { CommentProps } from "../../components/Comment";
import CreateComment from "../../components/CreateComment";

const SubField = styled.h1`
  ${tw`
    text-xl
    text-gray-400
    pl-2
    pr-2
`}
`;
const SubFieldValue = styled.h1`
  ${tw`
    text-xl
    text-gray-700
`}
`;

const SinglePostPage = () => {
  const router = useRouter();
  const postId = router.query.postId as string;
  const getSinglePost = trpc.useQuery(["posts.single-post", { postId }]);

  const getComments = trpc.useQuery([
    "comments.all-one-post-comments",
    { postId },
  ]);

  // TODO: add type Comment
  let comments = getComments.data || [];
  const primaryComments = comments.filter(
    (comment) => comment.parentId == null
  );

  const filterReplies = (commentId: string) => {
    const replies = comments
      .filter((comment) => comment.parentId === commentId)
      .sort((a, b) => {
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    return replies;
  };

  if (getSinglePost.isLoading) {
    return <p>Loading post...</p>;
  }

  if (!getSinglePost.data) {
    return <Error statusCode={404} />;
  }

  const postAge = getPostAge(getSinglePost.data.createdAt);
  const modifiedAge = getPostAge(getSinglePost.data.updatedAt);
  const viewCount = "1.1k";
  const upVotes = "822";
  const bookmarkCount = "109";

  return (
    <div className="min-height[1000px] flex">
      <SideNav />
      <div className="flex flex-col pl-10 pt-10 w-4/5">
        <div className="flex flex-col border-b-4 border-gray-100 pb-5">
          <h1 className="text-4xl text-gray-700">{getSinglePost.data.title}</h1>
          <div className="flex flex-col mt-4">
            <div className="flex ">
              {/* flex-col mt-4  ? */}
              <SubField>Asked</SubField>
              <SubFieldValue>{postAge}</SubFieldValue>
              <SubField>Modified</SubField>
              <SubFieldValue>{modifiedAge}</SubFieldValue>
              <SubField>Viewed</SubField>
              <SubFieldValue>{viewCount} times</SubFieldValue>
            </div>
          </div>
        </div>
        <div className="border-b-4 border-gray-200 pb-5">
          <div className="flex">
            <div className="flex flex-col justify-items-start width[100px] align-items[center]">
              <FaChevronUp className="text-4xl text-gray-400 hover:text-gray-500 cursor-pointer " />
              <h1 className="text-xl text-gray-400">{upVotes}</h1>
              <FaChevronDown className="text-4xl text-gray-400 hover:text-gray-500 cursor-pointer" />
              <div className="flex mt-2 mb-2">
                <FaRegBookmark className="text-xl text-gray-400 hover:text-gray-500 cursor-pointer mt-auto mb-auto" />
                <h1 className="text-lg text-gray-400">{bookmarkCount}</h1>
              </div>
              <FaHistory className="text-xl text-gray-400 hover:text-gray-500 cursor-pointer" />
            </div>
            <div className="ml-5 w-4/5">
              <p className="flex text-2xl mt-5 ml-5">
                {getSinglePost.data.body}
              </p>
              <div className="flex relative ml-5 mt-5">
                {getSinglePost.data.images?.map(
                  (element: string, index: number) => {
                    return (
                      <div className="h-40 w-80 relative">
                        <Image
                          src={element}
                          key={index}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-4/5 ml-auto mr-5 text-gray-400 text-xl ">
            <div className="mt-auto mb-auto mr-5"> Asked by: </div>

            <Image
              src={getSinglePost.data.author.image}
              height={50}
              width={50}
              className="rounded-2xl"
            />
            <a
              href={`/profile/${getSinglePost.data.author.id}`}
              className="ml-2 mt-auto mb-auto  hover:text-gray-800"
            >
              {getSinglePost.data.author.name}
            </a>
          </div>
        </div>

        <CreateComment />

        <div className="ml-20 w-4/5 mb-20">
          {getComments.isLoading && <h1> Loading... </h1>}

          {getComments.status == "success" &&
            getComments?.data &&
            primaryComments.map((comment: CommentProps, index: number) => {
              return (
                <Comment
                  key={index}
                  commentId={comment.commentId}
                  commentedById={comment.commentedById}
                  postId={postId}
                  text={comment.text}
                  User={comment.User}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  selectedAnswer={comment.selectedAnswer}
                  upVotes={comment.upVotes}
                  images={comment.images}
                  replies={filterReplies(comment.commentId)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
