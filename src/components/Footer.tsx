import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const Container = styled.div`
  ${tw`
  flex 
  justify-around
  border-b-2
  shadow-xl
  bg-gray-200
`}
`;

const Footer = () => {
  return <Container>Footer</Container>;
};

export default Footer;
