import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const Button = styled.button`
  ${tw`
bg-blue-400
rounded-xl
h-14
w-60
text-white
hover:bg-blue-500
`}
`;

const AskNewButton = () => {
  // TODO: figure out how to disable button if unauth.
  // const session = useSession();
  // const authStatus = session.status;
  // disabled={authStatus == "unauthenticated"}
  return (
    <Button>
      <Link href="asknew"> Ask a Question</Link>
    </Button>
  );
};

export default AskNewButton;
