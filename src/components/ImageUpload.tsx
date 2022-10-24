import React, { useState } from "react";
import Image from "next/image";
import tw from "twin.macro";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Delete = styled(AiOutlineCloseCircle)`
  ${tw`
    absolute
    text-xl
    text-red-800
    bg-white
    z-10
    top[5%]
    right[5%]
    border-radius[50%]
`}
`;

const ImageContainer = styled.div`
  ${tw`
    inline-block
    mr-2
    mt-2
`}
`;

type UploadProps = {
  setImages: React.Dispatch<React.SetStateAction<never[]>>;
  images: String[];
};

const ImageUpload = ({ setImages, images }: UploadProps) => {
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);

  const onSelectFile = (event: React.FormEvent<HTMLFormElement>) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log("selected Files Array: ", selectedFilesArray);

    const thumbnailsArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedThumbnails((previousThumbnails) =>
      previousThumbnails.concat(thumbnailsArray)
    );
    setImages((previousImages) => previousImages.concat(selectedFilesArray));
    console.log("images, selectedImages: ", images, selectedThumbnails);
    // FOR BUG IN CHROME?
    event.target.value = "";
  };

  function deleteHandler(image, index) {
    setSelectedThumbnails(selectedThumbnails.filter((e) => e !== image));
    setImages(images.filter((_, i) => i !== index));
    URL.revokeObjectURL(image);
  }

  return (
    <section>
      <input
        type="file"
        name="images"
        onChange={onSelectFile}
        multiple
        accept="image/png , image/jpeg, image/webp"
      />

      {selectedThumbnails.length > 0 &&
        (selectedThumbnails.length > 10 ? (
          <p className="error">
            You can't upload more than 5 images! <br />
            <span>
              please delete <b> {selectedThumbnails.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : null)}

      <div className="images">
        {selectedThumbnails &&
          selectedThumbnails.map((image, index) => {
            return (
              <ImageContainer key={image} className="relative">
                <Image src={image} height={100} width={100} alt="upload" />
                <Delete onClick={() => deleteHandler(image, index)} />
              </ImageContainer>
            );
          })}
      </div>
    </section>
  );
};

export default ImageUpload;
