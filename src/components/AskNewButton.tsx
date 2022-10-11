import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Link from "next/link";

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

const AskNewButton = () => {
  return (
    <Button>
      <Link href="asknew"> Ask a Question</Link>
    </Button>
  );
};

export default AskNewButton;
