import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
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

const HeroContainer = styled.div`
  ${tw`

`}
`;

const HeroImage = styled.div`
  ${tw`
  relative
  w-screen
  height[500px]
  bg-blue-300
  z-0  
`}
`;

const HeroText = styled.div`
  ${tw`
  absolute
  top[350px]
  left[10%]
  height[150px]
  width[80vw]
  z-10
  font-weight[900]
  font-size[50px]
  text-center
`}
  background-color:rgba(20,20,20,0.1)
`;

const RulesContainer = styled.div`
  ${tw`
flex
flex-col
`}
`;

const Home: NextPage = () => {
  //where was I going with this? Size image automatically?
  // function getWindowDimensions() {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height,
  //   };
  // }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <HeroContainer>
          <HeroImage>
            <Image src={savannah} height={1000} width={3000} />
          </HeroImage>
          <HeroText> The comprehensive guide for small scale farmers </HeroText>
        </HeroContainer>

        <RulesContainer>
          <h1>Community Rules</h1>
          <h2> 1. No hate </h2>
          <h2>
            2. Before you post, search the site to make sure your question
            hasn’t been answered.
          </h2>
          <h2> 3. No advertizing or self promoting </h2>
          <h2> 4. Ask good questions </h2>
        </RulesContainer>
      </Container>
    </>
  );
};

export default Home;
