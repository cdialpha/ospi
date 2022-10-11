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
    // FOR BUG IN CHROME
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

// CSS
// section {
//     padding: 2rem 0;
//   }

//   label {
//     margin: 0 auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     border: 1px dotted black;
//     border-radius: 20px;
//     width: 10rem;
//     height: 10rem;
//     cursor: pointer;
//     font-size: large;
//   }

//   label span {
//     font-weight: lighter;
//     font-size: small;
//     padding-top: 0.5rem;
//   }

//   input {
//     display: none;
//   }

//   img {
//     padding: 0;
//     margin: 0;
//   }

//   .images {
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     justify-content: center;
//     align-items: center;
//   }

//   .image {
//     margin: 1rem 0.5rem;
//     position: relative;
//     box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
//   }

//   .image button {
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     cursor: pointer;
//     border: none;
//     color: white;
//     background-color: lightcoral;
//   }

//   .image button:hover {
//     background-color: red;
//   }

//   .image p {
//     padding: 0 0.5rem;
//     margin: 0;
//   }

//   .upload-btn {
//     cursor: pointer;
//     display: block;
//     margin: 0 auto;
//     border: none;
//     border-radius: 20px;
//     width: 10rem;
//     height: 3rem;
//     color: white;
//     background-color: green;
//   }

//   label:hover,
//   .upload-btn:hover {
//     box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
//       rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
//   }

//   .error {
//     text-align: center;
//   }

//   .error span {
//     color: red;
//   }
