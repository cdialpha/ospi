import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";

const FooterContainer = styled.div`
  ${tw`
    bottom[0]
    w-full
    h-96
    flex
    pt-6
    pl-2
    pr-2
    lg:pt-14
    lg:pr-16
    lg:pl-16
    text-black
    items-center
    flex-col
    bg-gray-200

`}
`;
const Wrapper = styled.div`
  ${tw`  flex
  flex-col
  w-full
  h-full
  justify-center
  max-w-6xl
  lg:max-w-7xl
  `}
`;
const TopSection = styled.div`
  ${tw`   flex
    w-full
    justify-center
    lg:justify-start
    `}
`;
const InnerContainer = styled.div`
  ${tw`  w-full
    flex
    flex-col
    lg:flex-row
    flex-wrap
    pt-16
    lg:pt-9
    justify-between
    lg:justify-start
    h-full
    `}
`;
const LeftInnerContainer = styled.div`
  ${tw`   flex
    flex[5]
    w-full
    h-full
    justify-between
    lg:justify-start
    `}
`;
const RightInnerContainer = styled.div`
  ${tw` 
    flex
    flex-col
    lg:flex-row
    flex[1]
    w-full
    h-full
    mb-5
    lg:mb-0
    flex-wrap
    `}
`;
const Menu = styled.ul`
  ${tw` 
    flex
    flex-col
    list-none
    mr-3
    lg:ml-5
    lg:mr-16
    `}
`;
const MenuItem = styled.li`
  ${tw`     
    flex
    text-sm
    lg:text-base
    mt-2
    `}
`;

const BottomSection = styled.div`
  ${tw`  w-full
    flex
    flex-wrap
    items-center
    justify-between
    pl-4
    pr-4
    h-28
    lg:h-14
    bottom-0
    border-t
    border-t-gray-300
    border-opacity-50
    `}
`;

const Copyright = styled.span`
  ${tw` 
font-size[x-small]
    w-full
    lg:w-auto
    text-center
    `}
`;

const SmallText = styled.span`
  ${tw` font-size[small]
`}
`;

const SocialMedia = styled.div`
  ${tw`
    flex
    justify-center
`}
`;

const Icon = styled.span`
  ${tw`
    h-6
    flex
    mr-4
    cursor-pointer
    transition-colors

`}
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Wrapper>
        <TopSection className="text-2xl font-extrabold">OSPI</TopSection>
        <InnerContainer>
          <LeftInnerContainer>
            <Menu>
              <MenuItem>Home</MenuItem>
              <MenuItem>Explore</MenuItem>
              <MenuItem>Ask a question</MenuItem>
            </Menu>
            <Menu>
              <MenuItem>About Us</MenuItem>
              <MenuItem>Contact Us</MenuItem>
            </Menu>
            <Menu>
              <MenuItem>Company</MenuItem>
              <MenuItem>Careers</MenuItem>
            </Menu>
          </LeftInnerContainer>
          <RightInnerContainer>
            <SocialMedia>
              <Icon>
                <SiFacebook size={25} />
              </Icon>
              <Icon>
                <SiInstagram size={25} />
              </Icon>
              <Icon>
                <SiTwitter size={25} />
              </Icon>
            </SocialMedia>
          </RightInnerContainer>
        </InnerContainer>
        <BottomSection>
          <Copyright>
            © {new Date().getFullYear()} BOSTONSPREAD. All rights reserved.
          </Copyright>
          <SmallText>
            <a href="somewhere">Terms of Service</a>
          </SmallText>
          <SmallText>
            <a href="somewhere">Privacy Policy</a>
          </SmallText>
          <SmallText>
            <a href="somewhere">Security</a>
          </SmallText>
          <SmallText>
            <a href="somewhere">Sitemap</a>
          </SmallText>
        </BottomSection>
      </Wrapper>
    </FooterContainer>
  );
};

export default Footer;
