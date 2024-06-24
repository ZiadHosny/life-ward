import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import useFetchSliders from "./useFetchSliders";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { imageBaseUrl } from "../../../components/service";
const Slider = ({ sliders }) => {
  console.log('what is inside: ',sliders)
  const [_, { language }] = useTranslation();
  return (
    <Box ml={-16} style={{position:'relative',lef:0,right:0}}>
      <Splide
        options={{
          type: 'loop',
          autoplay: true,
          interval: 3000, // Ensure this is a number, not a string
          arrows: false,
          pagination: false,
          pauseOnHover: false,
          resetProgress: false,
          speed: 1000,
          width: "100%",
          height: 800,
          cover: true,
          perPage: 1,
          gap: "1rem",
          direction: language === "en" ? "ltr" : "rtl",
        }}
        aria-label="My Favorite Images"
      >
        {sliders &&
          sliders.length > 0 &&
          sliders?.map((slider) => {
            return (
              <SplideSlide>
                <img src={imageBaseUrl+ slider?.image} alt="Image 1" />
              </SplideSlide>
            );
          })}
      </Splide>
    </Box>
  );
};

// options={{
//   fixedWidth: "100%",
//   autoplay: true,
//   interval: 2000,
//   type: "loop",
//   cover: true,
//   direction: language === "en" ? "ltr" : "rtl",
// }}
export default Slider;
