import React, { useEffect, useState, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";

const SupportCardContainer = styled.div`
  ${tw`
    
  border-radius[10px]
    border-2
    shadow-md
    mb-5
    
  `}
`;
const SupportCardTitle = styled.div`
  ${tw`
  font-weight[600]
  pt-2
  pb-2
  pl-2
  `}
`;
const SupportCardBody = styled.div`
  ${tw`
    border-2
    shadow-xl
    pl-5
    pr-5   
    height[inherit] 
  `}
`;

const Expand = styled.div`
  ${tw`
mr-5
align-self[center]
border-2
border-radius[50%]

`}
`;

interface SupportCardProps {
  title: string;
  content: string;
}

const SupportCard = ({ title, content }: SupportCardProps) => {
  const [active, setActive] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current?.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (
    <SupportCardContainer onClick={toggleAccordion}>
      <div className="flex justify-between">
        <SupportCardTitle>{title}</SupportCardTitle>
        <Expand>
          <FaAngleDown />
        </Expand>
      </div>
      <SupportCardBody
        ref={contentRef}
        className={active ? `pt-5 pb-5 ` : ` max-h-0 overflow-hidden`}
      >
        {content}
      </SupportCardBody>
    </SupportCardContainer>
  );
};

export default SupportCard;
