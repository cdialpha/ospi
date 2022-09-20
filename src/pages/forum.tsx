import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  ${tw`
  flex 
  flex-col
  border-b-2
  ml-10
  mr-10
  mt-10
  height[1000px]
`}
`;
const TitleContainer = styled.div`
  ${tw`
flex
justify-between
mr-10
`}
`;

const Title = styled.h1`
  ${tw`
  text-4xl
  text-black
  font-bold
`}
`;

export const Button = styled.button`
  ${tw`
  bg-blue-400
  border-radius[15px]
  height[50px]
  width[200px]
  text-white
  hover:bg-blue-500
`}
`;

const Forum = () => {
  return (
    <Container>
      <TitleContainer>
        <Title> All questions </Title>
        <Button>
          <Link href="asknew"> Ask a Question</Link>
        </Button>
      </TitleContainer>
    </Container>
  );
};

export default Forum;
