import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import tw from "twin.macro";
import styled from "styled-components";
import SideNav from "../../components/SideNav";
import { getPostAge } from "../../utils/convertDate";
import { getSinglePost } from "../../schema/post.schema";
import {
  FaHistory,
  FaRegBookmark,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { Button } from "../../components/AskNewButton";

const View = styled.div`
  ${tw`
    height[1000px]
    flex
`}
`;
const QuestionContainer = styled.div`
  ${tw`
   flex
   flex-col
   pl-10
    pt-10
   `}
`;
const TitleSection = styled.div`
  ${tw`
   flex
   flex-col
   border-b-4
   border-gray-100
   pb-10
   
`}
`;
const Title = styled.h1`
  ${tw`
    text-4xl
    text-gray-700
`}
`;
const QuestionPropsContianer = styled.div`
  ${tw`
flex 
mt-4 
`}
`;
const SubField = styled.h1`
  ${tw`
    text-xl
    text-gray-400
    pl-2
    pr-2
`}
`;
const SubFieldValue = styled.h1`
  ${tw`
    text-xl
    text-gray-700
`}
`;
const BodySection = styled.div`
  ${tw`
   flex
   pb-10
`}
`;
const QuestionSideProps = styled.div`
  ${tw`
   flex
   flex-col
   justify-items-start
   width[100px]
   align-items[center]
`}
`;
const UpVotes = styled.h1`
  ${tw`
text-xl
text-gray-400
`}
`;
const BookmarkCount = styled.h1`
  ${tw`
text-lg
text-gray-400
`}
`;
const UpVote = styled(FaChevronUp)`
  ${tw`
text-4xl 
text-gray-400
hover:text-gray-500
cursor-pointer 
`}
`;
const DownVote = styled(FaChevronDown)`
  ${tw`
  text-4xl 
  text-gray-400
  hover:text-gray-500
  cursor-pointer
  `}
`;
const Bookmark = styled(FaRegBookmark)`
  ${tw`
text-xl
text-gray-400
hover:text-gray-500
cursor-pointer
mt-auto
mb-auto
`}
`;
const History = styled(FaHistory)`
  ${tw`
text-xl
text-gray-400
hover:text-gray-500
cursor-pointer
`}
`;
const Body = styled.p`
  ${tw`
    flex
    text-2xl
    mt-5
    ml-5
`}
`;

const SinglePostPage = () => {
  const router = useRouter();

  const postId = router.query.postId as string;

  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  const postAge = getPostAge(data.createdAt);
  const modifiedAge = getPostAge(data.updatedAt);
  const viewCount = "1.1k";
  const upVotes = "822";
  const bookmarkCount = "109";
  return (
    <View>
      <SideNav />
      <QuestionContainer>
        <TitleSection>
          <Title>{data.title}</Title>
          <QuestionPropsContianer>
            <SubField>Asked</SubField>
            <SubFieldValue>{postAge}</SubFieldValue>
            <SubField>Modified</SubField>
            <SubFieldValue>{modifiedAge}</SubFieldValue>
            <SubField>Viewed</SubField>
            <SubFieldValue>{viewCount} times</SubFieldValue>
          </QuestionPropsContianer>
        </TitleSection>
        <BodySection>
          <QuestionSideProps>
            <UpVote />
            <UpVotes>{upVotes}</UpVotes>
            <DownVote />
            <div className="flex mt-2 mb-2">
              <Bookmark />
              <BookmarkCount>{bookmarkCount}</BookmarkCount>
            </div>
            <History text-gray-400 />
          </QuestionSideProps>
          <Body>{data.body}</Body>
        </BodySection>
      </QuestionContainer>
    </View>
  );
};

export default SinglePostPage;
