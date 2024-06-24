import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/core";
import { useTranslation } from "react-i18next";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import "./sliderStyle.css";
import { useGetAllSlidersQuery } from "../../../APIs/SectionApis";
import { useNavigate } from "react-router-dom";
import CustomError from "../../../components/Error/Error";
import heroWall from "../../../assets/life3.png";
import { imageBaseUrl } from "../../../components/service";
import staticSectionImage from "../../../assets/life1.png";
import Loader from "../../../components/loader/loader";
import Slider from "../Slider/Slider";

const HeroSection = () => {
  const [_, { language }] = useTranslation();
  const { data, isLoading, error } = useGetAllSlidersQuery();
   
  const navigate = useNavigate();
  return (
    <section
      style={{
        overflow: "visible",
      }}
    >
      {isLoading ? (
        <Loader />
      ) : data?.data && !error ? (
        // <Box
        //   sx={{
        //     backgroundPosition: "center center",
        //     backgroundSize: {
        //       md: "100%",
        //       xs: "200px 100px",
        //     },
        //     objectFit: "",
        //     backgroundRepeat: "no-repeat",
        //     backgroundImage: `url(${heroWall})`,
        //     height: {
        //       md: 1000,
        //       xs: 1050,
        //     },
        //     ".css-yndj5b-MuiCardMedia-root": {
        //       objectFit : {sm : "contain" ,md : "cover"}
        //     },
        //     position: "relative",
        //   }}
        // >
        //   <Box
        //     sx={{
        //       height: 1,
        //       width: 1,

        //       display: "flex",
        //       bgcolor: "#f5f5f55e",
        //     }}
        //   >
        //     <Box
        //       sx={{
        //         px: {
        //           lg: "60px",
        //           md: "45px",
        //           xs: "10px",
        //         },
        //         mt: "175px",
        //         width: 1,
        //       }}
        //     >
        //       <Typography
        //         sx={{
        //           fontFamily: publicFontFamily,
        //           fontSize: {
        //             xl: "50px",
        //             lg: "40px",
        //             md: "35px",
        //             xs: "25.5px",
        //           },
        //           fontWeight: 900,
        //           mt: "10px",
        //           color: colors.main,
        //           textAlign: "center",
        //         }}
        //       >
        //         {language === "en"
        //           ? data?.data[0]?.title_en
        //           : data?.data[0]?.title_ar}
        //       </Typography>
        //       <CardMedia
        //         component="img"
        //         sx={{
        //           height: 600,
        //           objectFit: {
        //             md: "container",
        //             xs: "contain",
        //           },
        //           width: {
        //             md: 800,
        //             xs: 1,
        //           },
        //           mx: "auto",
        //           my: "30px",
        //           // objectFit: "contain",
        //         }}
        //         src={`${imageBaseUrl}/${data?.data[0]?.image}`}
        //         // src={staticSectionImage}
        //       />
        //       <Stack direction="row" justifyContent={"center"}>
        //         <Button
        //           sx={{
        //             color: "#fff",
        //             bgcolor: `${colors.main} !important`,
        //             fontWeight: "bold",
        //             fontFamily: publicFontFamily,
        //             fontSize: {
        //               md: "21px",
        //               xs: "18.5px",
        //             },
        //             padding: "5px 10px",
        //             borderRadius: "30px",
        //             textTransform: "none",
        //             px: "30px",
        //             "&:hover": {
        //               bgcolor: colors.heavyYellow,
        //             },
        //           }}
        //           onClick={() => navigate("/departments")}
        //         >
        //           {language === "en" ? "Shop Now" : "تسوق الآن"}
        //         </Button>
        //       </Stack>
        //     </Box>
        //   </Box>
        // </Box>
        <Slider sliders={data?.data}/>
      ) : (
        <CustomError
          errorMessage={
            language === "en"
              ? "Hero Section is not added"
              : "لم يتم العثور علي صورة"
          }
        />
      )}
    </section>
  );
};

export default HeroSection;
