import React from 'react'
import tw from "twin.macro"
import styled from "styled-components"

const Container = styled.div`
${tw`
  flex 
  border-b-2
  shadow-2xl
`}`

const NavItems = styled.div`
${tw`
  flex 
`}`

const NavItem = styled.div`
${tw`
  text-black
`}`

const navbar = () => {
  return (
    <Container> 
      <NavItem>
          OSPI
        </NavItem>
      <NavItems>
      <NavItem>
          Contact Us 
        </NavItem>
        <NavItem>
          Mission
        </NavItem>
        <NavItem>
          Login
        </NavItem>
      </NavItems>
    </Container> 
  )
}

export default navbar