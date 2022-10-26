import React, { useState } from "react";
import {
  createCommentType,
  createCommentInput,
} from "../schema/comment.schema";
import tw from "twin.macro";
import styled from "styled-components";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import ImageUpload from "../components/ImageUpload";
import { getS3UrlInput } from "../schema/post.schema";

const CreateComment = () => {
  const [images, setImages] = useState([]);
  const { handleSubmit, register, setValue, getValues, reset } =
    useForm<createCommentType>();

  const numberOfImages = images?.length;
  type useQueryProps = [string, getS3UrlInput];
  const s3 = trpc.useQuery(["s3.s3", { numberOfImages }]);

  //  I can't pass refetch down to the delte modal, because it exists else where in the component tree.
  // const refetchComments = () => getComments.refetch();

  const { mutate, error } = trpc.useMutation(["comments.create-comment"], {
    onSuccess: () => {
      reset();
      // TODO: one level up, need to refetch all comments getComments.refetch();
    },
  });

  const onSubmit = async (values: createCommentType) => {
    let trimmedUrls: string[] = [];
    values = { ...getValues(), postId };
    s3.data.forEach(async (url: string, index: number) => {
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
    // need to figure this out. Probably just need to break into two forEach loops.
    // Have to raster through the upload urls to trim URL. So can't mutate immediately.
    // (1) trim url, add to array, (2) mutate values (3) onsuccess post to s3
    setValue("images", trimmedUrls);
    mutate(values);

    // TODO: need to clear image array on submit
  };

  return (
    <div className="mt-10 ml-20 w-4/5 mr-auto border-2 border-green-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            {...register("text")}
            className="block w-full border-2 border-gray-200"
          />
        </div>
        <div className="flex justify-between">
          <div className="mt-2">
            <ImageUpload setImages={setImages} images={images} />
            <input {...register("images")} className="invisible" />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="border-2 border-gray-200 bg-gray-200 ml-20 rounded pl-4 pr-4"
            >
              submit
            </button>
            <button className="border-2 border-gray-200 bg-gray-200 ml-5 rounded pl-4 pr-4">
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
