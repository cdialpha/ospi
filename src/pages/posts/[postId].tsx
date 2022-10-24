import { useState } from "react";
import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import tw from "twin.macro";
import styled from "styled-components";
import SideNav from "../../components/SideNav";
import { getPostAge } from "../../utils/convertDate";
import {
  createCommentType,
  createCommentInput,
} from "../../schema/comment.schema";
import { createPostInput } from "../../schema/post.schema";
import {
  FaHistory,
  FaRegBookmark,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { MdSort } from "react-icons/md";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/ImageUpload";
import { getS3UrlInput } from "../../schema/post.schema";
import Comment, { CommentProps } from "../../components/Comment";

const View = styled.div`
  ${tw`
    min-height[1000px]
    flex
`}
`;
const QuestionContainer = styled.div`
  ${tw`
   flex
   flex-col
   pl-10
    pt-10
    w-4/5
   `}
`;
const TitleSection = styled.div`
  ${tw`
   flex
   flex-col
   border-b-4
   border-gray-100
   pb-5
   
`}
`;
const Title = styled.h1`
  ${tw`
    text-4xl
    text-gray-700
`}
`;
const QuestionPropsContianer = styled.div`
  ${tw`
flex-col
mt-4 
`}
`;
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

const UpVotes = styled.h1`
  ${tw`
text-xl
text-gray-400
`}
`;
const BookmarkCount = styled.h1`
  ${tw`
text-lg
text-gray-400
`}
`;
const UpVote = styled(FaChevronUp)`
  ${tw`
text-4xl 
text-gray-400
hover:text-gray-500
cursor-pointer 
`}
`;
const DownVote = styled(FaChevronDown)`
  ${tw`
  text-4xl 
  text-gray-400
  hover:text-gray-500
  cursor-pointer
  `}
`;
const ProfilePic = styled(Image)`
  ${tw`
border-radius[50%]
`}
`;
const Bookmark = styled(FaRegBookmark)`
  ${tw`
text-xl
text-gray-400
hover:text-gray-500
cursor-pointer
mt-auto
mb-auto
`}
`;
const History = styled(FaHistory)`
  ${tw`
text-xl
text-gray-400
hover:text-gray-500
cursor-pointer

`}
`;

const SinglePostPage = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const { handleSubmit, register, setValue, getValues, reset } =
    useForm<createCommentType>();

  const postId = router.query.postId as string;
  // Load single post & it's comments
  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);
  const getComments = trpc.useQuery([
    "comments.all-one-post-comments",
    { postId },
  ]);
  console.log(getComments);

  type useQueryProps = [string, getS3UrlInput];
  const numberOfImages = images?.length;
  const s3 = trpc.useQuery(["s3.s3", { numberOfImages }]);

  const { mutate, error } = trpc.useMutation(["comments.create-comment"], {
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = async (values: createCommentType) => {
    let trimmedUrls: string[] = [];
    values = { ...getValues(), postId };
    s3.data.forEach(async (url: string, index: number) => {
      const image = images[index];
      const config = {
        method: "PUT",
        headers: { "Content-type": image?.type },
        body: image,
      };
      const res = fetch(url, config);
      res.then(() => console.log("image uploaded"));
      trimmedUrls.push(url.split("?")[0]);
    });
    // need to figure this out. Probably just need to break into two forEach loops.
    // Have to raster through the upload urls to trim URL. So can't mutate immediately.
    // (1) trim url, add to array, (2) mutate values (3) onsuccess post to s3
    setValue("images", trimmedUrls);
    mutate(values);
  };

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  const comments = [
    { id: 1, text: "hi", author: "", time: "", likes: "11" },
    { id: 4, text: "hi", author: "mike", time: "22", likes: "10" },
    { id: 3, text: "hi", author: "calvin", time: "", likes: "12" },
  ];

  const postAge = getPostAge(data.createdAt);
  const modifiedAge = getPostAge(data.updatedAt);
  const viewCount = "1.1k";
  const upVotes = "822";
  const bookmarkCount = "109";

  return (
    <View>
      <SideNav />
      <QuestionContainer>
        <TitleSection>
          <Title>{data.title}</Title>
          <div className="flex flex-col mt-4">
            <div className="flex">
              <SubField>Asked</SubField>
              <SubFieldValue>{postAge}</SubFieldValue>
              <SubField>Modified</SubField>
              <SubFieldValue>{modifiedAge}</SubFieldValue>
              <SubField>Viewed</SubField>
              <SubFieldValue>{viewCount} times</SubFieldValue>
            </div>
          </div>
        </TitleSection>
        <div className="border-b-4 border-gray-200 pb-5">
          <div className="flex">
            <div className="flex flex-col justify-items-start width[100px] align-items[center]">
              <UpVote />
              <UpVotes>{upVotes}</UpVotes>
              <DownVote />
              <div className="flex mt-2 mb-2">
                <Bookmark />
                <BookmarkCount>{bookmarkCount}</BookmarkCount>
              </div>
              <History />
            </div>
            <div className="ml-5 w-4/5">
              <p className="flex text-2xl mt-5 ml-5">{data.body}</p>
              <div className="flex relative ml-5 mt-5">
                {data.images?.map((element: string, index: number) => {
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
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-4/5 ml-auto mr-5 text-gray-400 text-xl ">
            <div className="mt-auto mb-auto mr-5"> Asked by: </div>

            <ProfilePic src={data.author.image} height={50} width={50} />
            <a
              href={`/profile/${data.author.id}`}
              className="ml-2 mt-auto mb-auto  hover:text-gray-800"
            >
              {data.author.name}
            </a>
          </div>
        </div>

        <div className="mt-10 ml-20 w-4/5 mr-auto border-2 border-green-50">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <textarea
                {...register("text")}
                className="block w-full border-2 border-gray-200"
              />
            </div>
            <div className="flex justify-between">
              <div className="mt-2">
                <ImageUpload setImages={setImages} images={images} />
                <input {...register("images")} className="invisible" />
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="border-2 border-gray-200 bg-gray-200 ml-20 rounded pl-4 pr-4"
                >
                  submit
                </button>
                <button className="border-2 border-gray-200 bg-gray-200 ml-5 rounded pl-4 pr-4">
                  cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="ml-20 w-4/5">
          {getComments.isLoading && <h1> Loading... </h1>}

          {getComments.status == "success" &&
            getComments?.data &&
            getComments.data.map((comment: CommentProps) => {
              return (
                <Comment
                  key={comment.commentId}
                  text={comment.text}
                  User={comment.User}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  selectedAnswer={comment.selectedAnswer}
                  upVotes={comment.upVotes}
                  images={comment.images}
                />
              );
            })}
        </div>
      </QuestionContainer>
    </View>
  );
};

export default SinglePostPage;
