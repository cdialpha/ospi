import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Error from "next/error";
import tw from "twin.macro";
import styled from "styled-components";
import Bio from "../../components/Bio";

const View = styled.div`
  ${tw`
  flex
  [min-height:80vh]
  `}
`;
const RecentPosts = styled.div`
  ${tw`
flex
flex-col
[height:1000px]
border-2
border-gray-200
ml-5
mr-5
mt-10
pt-5 pl-5 
pr-5
shadow-xl
`}
`;
const Bookmarks = styled.div`
  ${tw`
  [height:1000px]
  border-2
  border-gray-200
  ml-5
mr-5
mt-10
pt-5 pl-5 
pr-5
rounded-2xl
shadow-xl
`}
`;
const Activity = styled.div`
  ${tw`
  [height:1000px]
border-2
border-gray-200
ml-5
mr-5
mt-10
pt-5
pl-5 
pr-5
rounded-2xl
shadow-xl 
`}
`;

const Profile = () => {
  const router = useRouter();
  const userId = router.query.profileId as string;

  const { data, isLoading } = trpc.useQuery([
    "users.single-user-details",
    { userId },
  ]);

  console.log(userId, data);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <View>
      <Bio data={data} />
      <RecentPosts>
        <h1>Recent Posts: </h1>
        <p> content to add </p>
      </RecentPosts>
      <Bookmarks>
        <h1>Bookmarks</h1>
        <p> content to add </p>
      </Bookmarks>
      <Activity>
        <h1> Activity</h1>
        <p> content to add </p>
      </Activity>
    </View>
  );
};

export default Profile;
