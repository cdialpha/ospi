import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const Container = styled.div`
  ${tw`
flex
flex-col
border-2
width[300px]
`}
`;

const NavItems = styled.ul`
  ${tw`
flex
flex-col
mt-10
`}
`;

const NavItem = styled.li`
  ${tw`
    text-xl
    text-gray-600
    ml-auto
    mr-auto
    mt-5
    hover:bg-gray-100
`}
`;

const SideNav = () => {
  return (
    <Container>
      <NavItems>
        <NavItem> Home </NavItem>
        <NavItem> Public </NavItem>
        <NavItem> Questions </NavItem>
        <NavItem> Form Rules </NavItem>
      </NavItems>
    </Container>
  );
};

export default SideNav;
