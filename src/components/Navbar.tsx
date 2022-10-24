import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Container = styled.div`
  ${tw`
  flex 
  justify-around
  border-b-2
  shadow-xl
  bg-gray-200
  height[75px]

  `}
`;

const NavItems = styled.ul`
  ${tw`
  flex 
  justify-around
  relative
`}
`;

const NavItem = styled.li`
  ${tw`
  text-black
  ml-4
  mr-4
  mt-auto
  mb-auto
  list-style[none]
  font-weight[900]
  hover:text-gray-600
  hover:cursor-pointer

`}
`;

const ProfileImage = styled(Image)`
  ${tw`
  height[50px]
  border-radius[50%]
`}
`;

const Navbar = () => {
  const session = useSession();
  console.log(session);

  return (
    <Container>
      <NavItems>
        <NavItem>
          <Link href="/"> EN </Link>
        </NavItem>
        <div className="mt-auto mb-auto">|</div>
        <NavItem>
          <Link href="/"> FR </Link>
        </NavItem>
        <NavItem>
          <Link href="/"> OSPI </Link>
        </NavItem>
      </NavItems>
      <NavItems>
        <NavItem>
          <Link href="/forum"> Forum </Link>
        </NavItem>
        <NavItem>
          <Link href="/learn"> Learning Center</Link>
        </NavItem>
        <NavItem>
          <Link href="/mission"> Mission </Link>
        </NavItem>
      </NavItems>

      <NavItems>
        {session.status === "unauthenticated" && (
          <NavItem>
            <Link href="/api/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Login
              </a>
            </Link>
          </NavItem>
        )}
        {session.status === "authenticated" && (
          <>
            <div className="relative mt-auto mb-auto">
              <ProfileImage
                src={session.data.user?.image!}
                width={50}
                height={50}
              />
            </div>
            <NavItem>
              <a href={`/profile/${session.data.user?.id}`}>
                {session.data.user?.name}
              </a>
            </NavItem>
            <NavItem>
              <Link href="/api/auth/signout">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Logout
                </a>
              </Link>
            </NavItem>
          </>
        )}
      </NavItems>
    </Container>
  );
};

export default Navbar;
