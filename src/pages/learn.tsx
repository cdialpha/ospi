import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import savannah from "../../public/savannah.jpg";
import Image from "next/image";

const Container = styled.div`
  ${tw`
  flex 
  flex-col
  border-b-2
  shadow-xl
  bg-gray-100
  height[1000px]
`}
`;

const Learn = () => {
  return <Container>learn</Container>;
};

export default Learn;
