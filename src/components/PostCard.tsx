import React from "react";
import Link from "next/link";
import tw from "twin.macro";
import styled from "styled-components";
import Image from "next/image";
import { getPostAge } from "../utils/convertDate";
import {
  AiOutlineEye,
  AiOutlineLike,
  AiOutlineComment,
  AiFillEye,
  AiFillLike,
} from "react-icons/ai";
const Card = styled.div`
  ${tw`
  flex 
  flex-col
  border-2
  shadow-lg
  mt-5
  pl-5
  pt-5
`}
`;

const DetailsContainer = styled.div`
  ${tw`
  flex 
  mt-2
`}
`;
const Detail = styled.h1`
  ${tw`
  flex
text-gray-700
mr-4
`}
`;

const Title = styled.h1`
  ${tw`
  text-2xl
  font-bold
  hover:underline
  cursor-pointer
`}
`;
const Body = styled.div`
  ${tw`
  text-xl
  mt-5
`}
`;

const TagsContainer = styled.div`
  ${tw`
flex
`}
`;

const Tag = styled.div`
  ${tw`
bg-gray-100
`}
`;

const AskedBy = styled.h1`
  ${tw`
  flex 
  self-end
  mr-10
  mt-10
  mb-5
`}
`;

const AuthorImage = styled(Image)`
  ${tw`
  height[50px]
  border-radius[50%]
`}
`;

const AuthorName = styled.p`
  ${tw`
  ml-5
  mt-auto
  mb-auto
  font-extrabold
`}
`;

export type postProps = {
  postId: string;
  title: string;
  body: string;
  upVotes: number;
  views: number;
  numberOfComments: number;
  createdAt: Date;
  updatedAt?: Date;
  authorId?: String;
  author: Author;
  images: String[];
};
export type Author = {
  name: String;
  image: String;
};

const PostCard: React.FC<postProps> = ({
  postId,
  title,
  body,
  views,
  author,
  createdAt,
  numberOfComments,
  upVotes,
  images,
}) => {
  const questionAge = getPostAge(createdAt);

  return (
    <Card>
      <Title>
        {" "}
        <a href={`/posts/${postId}`}>{title} </a>{" "}
      </Title>
      <DetailsContainer>
        <Detail>
          <AiFillLike className="mt-auto mb-auto mr-2" />
          {upVotes} up votes
        </Detail>
        <Detail>
          <AiOutlineComment className="mt-auto mb-auto mr-2" />
          {numberOfComments} comments
        </Detail>
        <Detail>
          <AiFillEye className="mt-auto mb-auto mr-2" />
          {views} views
        </Detail>
      </DetailsContainer>
      <TagsContainer>
        <Tag></Tag>
      </TagsContainer>
      <AskedBy>
        <AuthorImage src={author.image} height={50} width={50} />
        <AuthorName>
          {author.name} asked {questionAge}
        </AuthorName>
      </AskedBy>
    </Card>
  );
};

export default PostCard;
