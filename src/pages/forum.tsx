import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import AskNewButton from "../components/AskNewButton";
import PostCard from "../components/PostCard";
import { trpc } from "../utils/trpc";
import Error from "next/error";
import { postProps } from "../components/PostCard";
import SideNav from "../components/SideNav";

const View = styled.div`
  ${tw`
  flex
  height[1500px]
`}
`;
const ForumContainer = styled.div`
  ${tw`
  flex 
  flex-col
  width[100%]
  border-b-2
  ml-10
  mr-10
  mt-10
`}
`;
const TitleContainer = styled.div`
  ${tw`
flex
justify-between
`}
`;
const Title = styled.h1`
  ${tw`
  text-4xl
  text-black
  font-bold
`}
`;
const FilterContainer = styled.div`
  ${tw`
flex
justify-end
mt-10
`}
`;
const Filter = styled.div`
  ${tw`
height[50px]
text-gray-600
border-2
border-gray-200
padding[10px 10px 10px 10px]
hover:bg-gray-100
ml-2
mr-2
`}
`;

const Forum = () => {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);
  if (isLoading) {
    return <p>Loading posts...</p>;
  }
  if (!data) {
    return <Error statusCode={404} />;
  }

  console.log(data);

  return (
    <View>
      <SideNav />
      <ForumContainer>
        <TitleContainer>
          <Title> All questions </Title>
          <AskNewButton />
        </TitleContainer>
        <FilterContainer>
          <Filter>Newest</Filter>
          <Filter>Trending</Filter>
          <Filter>This Week</Filter>
          <Filter>This Month</Filter>
        </FilterContainer>
        {data.map((post: postProps) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            author={post.author}
            views={post.views}
            createdAt={post.createdAt}
            numberOfComments={post.numberOfComments}
            upVotes={post.upVotes}
          />
        ))}
      </ForumContainer>
    </View>
  );
};

export default Forum;
