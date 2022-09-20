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
const MainText = styled.h1`
  ${tw`
  text-2xl
  font-weight[900]
  self-center
  mb-2
  `}
`;

const Mission = () => {
  return (
    <Container>
      <MainText> Knowledge should be free </MainText>

      <MainText>
        Community approach to knowledge, inspired by Satck Overflow{" "}
      </MainText>
      <MainText> Opinionated Structure, inspired by Wikipedia </MainText>
    </Container>
  );
};

export default Mission;
