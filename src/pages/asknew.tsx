import React, { useEffect, useState, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useForm, useFormContext } from "react-hook-form";
import { createPostInput, getS3UrlInput } from "../schema/post.schema";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import SupportCard from "../components/SupportCard";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ImageUpload from "../components/ImageUpload";

// if I need an embeded text editor later, I could use:
// https://www.tiny.cloud/docs/tinymce/6/react-pm-host/
//  https://ckeditor.com/ https://www.tinymce.com/

const Container = styled.div`
  ${tw`
  flex
  flex-col
  border-b-2
  pb-10
  height[1500px]
  2xl:width[80%]
  2xl:ml-auto
  2xl:mr-auto
`}
`;
const Header = styled.h1`
  ${tw`
text-4xl
font-weight[900]
mt-5
ml-0
align-self[center]
md:align-self[flex-start]
md:mt-10
md:ml-10
`}
`;
const CardContainer = styled.div`
  ${tw`
    grid
    grid-rows-2
    grid-cols-1
    lg:grid-rows-1
    lg:grid-cols-2
    column-gap[0px]
    row-gap[50px]
    lg:column-gap[0%]
    lg:row-gap[50px]
`}
`;
const SupportCardsContainer = styled.div`
  ${tw`
    flex
    flex-col
    md:width[90%]
    lg:width[90%]
    mt-5
    ml-auto
    mr-auto
    lg:mt-10
    lg:ml-0
`}
`;
const NewQuestionContainer = styled.div`
  ${tw`
    border-radius[10px]
    width[90%]
    pl-5
    mt-5
    ml-auto
    mr-auto
    border-2
    shadow-xl
    lg:mt-10
    lg:ml-10
    lg:pl-10
    lg:width[80%]
`}
`;
const NewQuestionTitle = styled.div`
  ${tw`
    text-xl
    font-weight[600]
    mt-5
`}
`;
const LabelContainer = styled.div`
  ${tw`
  flex
  `}
`;
const Subtitle = styled.p`
  ${tw`
  ml-2
  text-gray-600
  align-self[flex-end]
  `}
`;
const TitleInput = styled.input`
  ${tw`
    width[95%]
    lg:width[90%]  
    mt-2    
    border-2
`}
`;
const BodyInput = styled.textarea`
  ${tw`
  width[95%]
  lg:width[90%]   
    height[150px]
    mt-2
    border-2
`}
`;
const TagsInputContainer = styled.div`
  ${tw`
border-2
mr-10
min-height[100px]
`}
`;
const TagsInput = styled.input`
  ${tw`
  width[95%]
  lg:width[90%]   
  mt-2
`}
`;
const Tag = styled.p`
  ${tw`
  flex
  text-black
  bg-gray-100
  pl-2
  border-radius[15px]
  margin[5px 5px 5px 5px]
`}
`;
const CloseButton = styled(AiOutlineCloseCircle)`
  ${tw`
  mt-auto
  mb-auto
  ml-1
  mr-1
  text-red-800
  text-lg

`}
`;
const Button = styled.button`
  ${tw`
bg-blue-400
border-radius[15px]
height[50px]
width[200px]
text-white
hover:bg-blue-500
mb-5
mt-2
`}
`;

const SupportCards = [
  {
    title: "Step 1: Summarize the Problem",
    content:
      "The community is here to help you with specific coding, algorithm, or language problems. Avoid asking opinion-based questions.",
  },
  {
    title: "Step 2: Describe What you've tried",
    content:
      "Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.",
  },
  {
    title: "Step 3: review your question",
    content:
      "Review your question for spelling mistakes and make sure there is a clear question. Avoid asking several questions at once. It can make searching for answers more difficult ",
  },
  { title: "Extra", content: "Read how to write a good question here." },
];

// unfortunately pressing enter will auto-submit form.
//Which is not good if I want enter to be used to submit a tag.
// https://github.com/react-hook-form/react-hook-form/discussions/2549

const asknew = () => {
  const { handleSubmit, register, setValue, getValues } =
    useForm<createPostInput>();
  const router = useRouter();
  const [tags, setTags] = useState(["example1", "example2"]);
  const [images, setImages] = useState<File[] | []>([]);
  console.log("images sent up to asknew component: ", images);

  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess: ({ postId }) => {
      router.push(`/posts/${postId}`);
    },
  });

  const numberOfImages = images?.length; // as number ;

  type useQueryProps = [string, getS3UrlInput];

  const { data } = trpc.useQuery(["s3.s3", { numberOfImages }], {});

  const onSubmit = async (values: createPostInput) => {
    let trimmedUrls: string[] = [];
    //post each image to s3 bucket
    data.forEach(async (url: string, index: number) => {
      const image = images[index];
      const config = {
        method: "PUT",
        headers: { "Content-type": image?.type },
        body: image,
      };
      const res = fetch(url, config);
      res.then(() => console.log("image uploaded"));
      trimmedUrls.push(url.split("?")[0]);
    });
    setValue("images", trimmedUrls);
    values = getValues();
    console.log(values);
    mutate(values); // I need to mutate values before I post them to the S3 bucket. I don't want extra photos if the post failed.
  };

  // Prevent Enter from submitting form, default nature of RHF.
  const checkKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Enter") e.preventDefault();
  };

  // checks to see if enter is pressed on tag input, adds tag, clears input
  // for some reason console logs before setvalue
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (e.key != "Enter") return;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setValue("tags", tags);
    target.value = "";
  };

  // removes tag where (x) is clicked
  const removeTag = (index: number) => {
    setTags(tags.filter((el, i) => i != index));
  };

  //register tags

  return (
    <Container>
      <Header> Ask a question</Header>
      <CardContainer>
        <NewQuestionContainer>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            {error && error.message}

            <NewQuestionTitle>Title</NewQuestionTitle>
            <TitleInput
              type="text"
              placeholder="Your post title"
              {...register("title")}
            />
            <br />
            <NewQuestionTitle>Body</NewQuestionTitle>
            <BodyInput
              placeholder=" Question body & supporting details"
              {...register("body")}
            />
            <br />
            <LabelContainer className="mb-2">
              <NewQuestionTitle>Add Images</NewQuestionTitle>
              <Subtitle>(select up to 5) </Subtitle>
            </LabelContainer>
            <ImageUpload setImages={setImages} images={images} />
            <input {...register("images")} className="invisible" />
            <br />
            <NewQuestionTitle>Tags</NewQuestionTitle>
            <TagsInputContainer>
              {tags?.map((tag, index) => {
                return (
                  <div className="inline-block">
                    <Tag key={index}>
                      {tag}
                      <CloseButton onClick={() => removeTag(index)} />
                    </Tag>
                  </div>
                );
              })}
              <TagsInput
                {...register("tags", {
                  setValueAs: (v) => tags,
                })}
                disabled={tags.length > 4 ? true : false}
                placeholder=" Include up to 5 tags..."
                onKeyDown={handleKeyDown}
                // onChange={(e) => {}}
              />
            </TagsInputContainer>
            <br />
            <Button type="submit">Create post</Button>
          </form>
        </NewQuestionContainer>
        <SupportCardsContainer>
          {SupportCards.map((x) => (
            <SupportCard key={x.title} title={x.title} content={x.content} />
          ))}
        </SupportCardsContainer>
      </CardContainer>
    </Container>
  );
};

export default asknew;
