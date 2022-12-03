import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGlobe,
  FaEdit,
} from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsCameraFill } from "react-icons/bs";
import tw from "twin.macro";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { updateUserType, updateUserInput } from "../schema/user.schema";
import axios from "axios";

const Container = styled.div`
  ${tw`
  [width:30vw]
  relative
  border-2
  border-gray-200
  mt-10
  ml-10
  mr-10
  mb-5
  [border-radius:15px]
  shadow-xl
  pl-10
  pr-10

  `}
`;

const SocialMedia = styled.div`
  ${tw`
 ml-auto
 mr-auto
 mt-5
`}
`;

const ProfilePic = styled(Image)`
  ${tw`
  [border-radius:50%]
  `}
`;

const Bio = ({ data }) => {
  const [editMode, setEditMode] = useState(false);
  const [location, setLocation] = useState("Ngaoundere");
  const { handleSubmit, register, setValue, getValues, trigger } =
    useForm<updateUserType>();

  // location autocomplete Google API
  var config = {
    method: "get",
    url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&types=establishment&location=37.76999%2C-122.44696&radius=500&strictbounds=true&key=YOUR_API_KEY",
    headers: {},
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

  //   // for text area on profile update
  //   const textareaRef = useRef(null);
  //   const [value, setValue] = useState("");
  //   const onChange = (event) => setValue(event.target?.value);
  //   const MIN_TEXTAREA_HEIGHT = 32;
  //   useLayoutEffect(() => {
  //     // Reset height - important to shrink on delete
  //     textareaRef.current.style.height = "inherit";
  //     // Set height
  //     textareaRef.current.style.height = `${Math.max(
  //       textareaRef.current.scrollHeight,
  //       MIN_TEXTAREA_HEIGHT
  //     )}px`;
  //   }, [value]);

  console.log(editMode);
  console.log(data);
  const onSubmit = async (values: updateUserType) => {};

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          onClick={() => setEditMode(!editMode)}
          className="mt-5 flex w-20 ml-auto pl-2 pr-2 pt-2 pb-2 cursor-pointer border-2 rounded-2xl hover:scale-105 hover:bg-gray-100"
        >
          <FaEdit className="block text-2xl mr-2 " />
          Edit
        </div>
        <div className="flex justify-center relative mt-5">
          {editMode ? (
            <div className="absolute z-10 right-[30%] top-[0px] bg-white  pt-1 pl-1 pr-1 pb-1 border-2 border-gray-200 rounded-xl">
              <BsCameraFill className="text-2xl" />
            </div>
          ) : null}
          <ProfilePic src={data.image} height={150} width={150} />
          {/* Must be a .jpg, .gif or .png file smaller than 10MB and at least 400px by 400px. */}
        </div>
        <div className="text-center mt-2 text-2xl font-bold"> {data.name} </div>
        {editMode ? (
          <input
            value={data.email}
            className="block ml-auto mr-auto pl-2 border-2 border-gray-200"
          />
        ) : (
          <div className="text-center mt-2"> {data.email} </div>
        )}
        <div className="mt-5  ml-auto mr-auto">
          <div className="flex flex-col">
            <p className="font-bold border-b-2 border-gray-200"> Location: </p>
            {editMode ? (
              <input value={location} className="border-2 border-gray-200" />
            ) : (
              <p> {location}</p>
            )}
          </div>
          <div className="flex flex-col">
            <p className="font-bold border-b-2 border-gray-200 mt-2">
              Member since:
            </p>
            <p> December 15th 2002 </p>
          </div>
          <div className="flex flex-col mt-2">
            <p className="font-bold border-b-2 border-gray-200">Reputation:</p>
            <p> 218 pts </p>
          </div>
          <div className="flex flex-col mt-2">
            <p className="font-bold border-b-2 border-gray-200"> About: </p>
            {editMode ? (
              <input
                type="textarea"
                value={
                  "I come from a small town in the mountains. I want to learn moreabout chickens to help my farm become more profitable."
                }
              />
            ) : (
              <p>
                I come from a small town in the mountains. I want to learn more
                about chickens to help my farm become more profitable.
              </p>
            )}
          </div>
        </div>
        <SocialMedia>
          <h1 className="font-bold"> Links </h1>
          <div className="flex border-b-2 border-gray-200 mt-2">
            <FaFacebook className="text-2xl" />
            {editMode ? (
              <input
                value="http://facebook.calvinirwin"
                className="ml-2 pl-2 border-2 border-gray-200"
              />
            ) : (
              <p className="ml-2"> http://facebook.calvinirwin </p>
            )}
          </div>
          <div className="flex border-b-2 border-gray-200 mt-2">
            <FaInstagram className="text-2xl" />
            {editMode ? (
              <input
                value="@chickenfarmer"
                className="ml-2 pl-2 border-2 border-gray-200"
              />
            ) : (
              <p className="ml-2"> @chickenfarmer </p>
            )}
          </div>
          <div className="flex border-b-2 border-gray-200 mt-2">
            <FaTwitter className="text-2xl" />
            {editMode ? (
              <input
                value="@chickafrique"
                className="ml-2 pl-2 border-2 border-gray-200"
              />
            ) : (
              <p className="ml-2"> @chickafrique </p>
            )}
          </div>
          <div className="flex border-b-2 border-gray-200 mt-2">
            <FaGlobe className="text-2xl" />
            {editMode ? (
              <input
                value="www.chickens.com"
                className="ml-2 pl-2 border-2 border-gray-200"
              />
            ) : (
              <p className="ml-2"> www.chickens.com </p>
            )}
          </div>
        </SocialMedia>
        {editMode ? (
          <button
            type="submit"
            className="border-2 border-gray-200 bg-green-50 border-radius[15px] mt-5 mb-5 pl-2 pr-2 pt-1 pb-1 block ml-auto mr-auto rounded-xl hover:bg-green-100 hover:border-gray-400"
          >
            Save Changes
          </button>
        ) : null}
      </form>
    </Container>
  );
};

export default Bio;
