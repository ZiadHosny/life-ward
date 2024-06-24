import { Box, CardMedia, Grid, Stack ,useMediaQuery} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { colors } from "../../components/publicStyle/publicStyle";
import { imageBaseUrl } from "../../components/service";
import { useTheme } from '@emotion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'react-medium-image-zoom/dist/styles.css'
import Zoom from 'react-medium-image-zoom'
import { CustomZoomContent } from "./CustomZoom";

const ImageSlider = ({ images,product }) => {
  console.log(images,'qImageqImage')
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  // const theme = useTheme()
  // const phoneScreen = useMediaQuery(theme.breakpoints.down('md'))
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  console.log(mediaQuery,'mediaQuery')

  return (
    <Stack direction={{ xs: 'column', md: 'row' }}>
    <Box
         component={Swiper}
         sx={{
           width: '100%',
           m: 1,
           height: {
             md: '100vh',
             xs: '50vh',
           },
           '--swiper-navigation-color': '#fff',
           objectFit: 'cover',
           objectPosition: 'top',
           width: {
             xs: '90%',
             md: '100%',
           },
           margin: 'auto',
           position:'sticky',
           top:'0px'
         }}
         spaceBetween={10}
         // navigation={true}
         thumbs={{ swiper: thumbsSwiper }}
         modules={[FreeMode, Navigation, Thumbs]}
         className="mySwiper2"
    >
       {images?.map((img) => (
        <SwiperSlide key={img}>
          <Zoom ZoomContent={CustomZoomContent}>
            <Box
              component={'img'}
              src={imageBaseUrl + img}
              sx={{
                width: '100%',
                height: {
                  xs: '100%',
                  lg: '80vh',
                },
                objectFit: 'cover',
              }}
            />
          </Zoom>
        </SwiperSlide>
      ))}
    </Box>
    <Box
                component={Swiper}
                direction={mediaQuery?.matches?'horizontal': 'vertical'}
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={5}
                breakpoints={{
                  1299: {
                    slidesPerView: 5,
                  },
                }}
                sx={{
                  width: { xs: '99%', md: '200px' },
                  m: 1,
                  height: { xs: '100%', md: '50vh' },
                  direction: 'ltr',
                  '--swiper-navigation-color': '#fff',
                  maxHeight: 'auto',
                  position: {
                    xs: 'block',
                    xl: 'sticky',
                  },
                  top: {
                    xs: 'unset',
                    xl: '0px',
                  },
                  paddingLeft: '10px',
                  marginLeft: '10px',
                  marginLeft: '10px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  position:'sticky',
                  top:'0px'
                }}
                className="mySwiper"
              >
      <Box sx={{}}>
         {images?.map((img) => (
          <SwiperSlide key={img}>
            <Box
              component={'img'}
              sx={{
                width: { xs: '90px', md: '90px' },
                height: {
                  xs: '100px',
                  md: '80px',
                },
                objectFit: 'cover',
                border: '1px solid #333',
              }}
              src={imageBaseUrl + img}
            />
          </SwiperSlide>
        ))}
      </Box>
    </Box>
  </Stack>
   );
};

export default ImageSlider;
