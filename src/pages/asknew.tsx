import React, { useEffect, useState, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { createPostInput } from "../schema/post.schema";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { Button } from "./forum";
import SupportCard from "../components/SupportCard";

const Container = styled.div`
  ${tw`
  flex
  flex-col
  border-b-2
  shadow-xl
  bg-gray-100
  pb-10
  height[1500px]
  2xl:width[80%]
  2xl:ml-auto
  2xl:mr-auto
`}
`;
const Header = styled.h1`
  ${tw`
text-4xl
font-weight[900]
mt-5
ml-0
align-self[center]
md:align-self[flex-start]
md:mt-10
md:ml-10
`}
`;
const CardContainer = styled.div`
  ${tw`
    grid
    grid-rows-2
    grid-cols-1
    lg:grid-rows-1
    lg:grid-cols-2
    column-gap[0px]
    row-gap[50px]
    lg:column-gap[0%]
    lg:row-gap[50px]
`}
`;
const SupportCardsContainer = styled.div`
  ${tw`
    flex
    flex-col
    md:width[90%]
    lg:width[90%]
    mt-5
    ml-auto
    mr-auto
    lg:mt-10
    lg:ml-0
`}
`;
const NewQuestionContainer = styled.div`
  ${tw`
    border-radius[10px]
    width[90%]
    pl-5
    mt-5
    ml-auto
    mr-auto
    border-2
    shadow-xl
    lg:mt-10
    lg:ml-10
    lg:pl-10
    lg:width[80%]
`}
`;
const NewQuestionTitle = styled.div`
  ${tw`
    text-xl
    font-weight[600]
    mt-5
`}
`;
const TitleInput = styled.input`
  ${tw`
    width[95%]
    lg:width[90%]  
    mt-2    
`}
`;
const BodyInput = styled.textarea`
  ${tw`
  width[95%]
  lg:width[90%]   
    height[150px]
    mt-2
`}
`;

const SupportCards = [
  {
    title: "Step 1: Summarize the Problem",
    content:
      "The community is here to help you with specific coding, algorithm, or language problems. Avoid asking opinion-based questions.",
  },
  {
    title: "Step 2: Describe What you've tried",
    content:
      "Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.",
  },
  { title: "Extra", content: "Read how to write a good question here." },
];

const asknew = () => {
  const { handleSubmit, register } = useForm<createPostInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess: ({ id }) => {
      router.push(`/posts/${id}`);
    },
  });

  function onSubmit(values: createPostInput) {
    mutate(values);
  }

  return (
    <Container>
      <Header> Ask a question</Header>
      <CardContainer>
        <NewQuestionContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && error.message}

            <NewQuestionTitle>Title</NewQuestionTitle>
            <TitleInput
              type="text"
              placeholder="Your post title"
              {...register("title")}
            />
            <br />
            <NewQuestionTitle>Body</NewQuestionTitle>
            <BodyInput placeholder="Your post title" {...register("body")} />
            <br />
            <Button className="mb-5 mt-2">Create post</Button>
          </form>
        </NewQuestionContainer>
        <SupportCardsContainer>
          {SupportCards.map((x) => (
            <SupportCard title={x.title} content={x.content} />
          ))}
        </SupportCardsContainer>
      </CardContainer>
    </Container>
  );
};

export default asknew;