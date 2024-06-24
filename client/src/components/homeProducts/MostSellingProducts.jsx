import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { CardsStackStyle } from "../cards/cardStyle";
import SellingProductCard from "./SellingProductCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";

const MostSellingProducts = ({ items, title }) => {
  const [sortedArr, setSortedArr] = useState();
  function sortMostSelling(pros) {
    if (pros.length > 0) {
      let arr = [];
      arr.push(pros[0]);
      for (let i = 1; i < pros.length; i = i + 2) {
        arr.push(pros[i]);
        arr.unshift(pros[i + 1]);
      }
      
      setSortedArr(arr.filter(item => item !== undefined ));
    }
  }
  useEffect(() => {
    sortMostSelling(items);
  }, [items]);
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        direction: "ltr !important",
        width: {
          xl: 1700,
          lg: 1100,
          xs: 1,
        },
        mx: "auto",
        pb: "10px",
      }}
      key={title ? title : undefined}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={CardsStackStyle.cardsHeader}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bolder",
            textTransform: "capitalize",
            bgcolor: pathname === "/" ? "transparent" : undefined,
            color: colors.grey,

            fontFamily: publicFontFamily,

            py: {
              lg: "10px",
              xs: "16px",
            },
            fontSize: {
              xl: "60px",
              lg: "55px",
              md: "45px",
              xs: "40px",
            },
            paddingBottom: "0px",
            borderRadius:
              pathname === "/"
                ? language === "en"
                  ? "0 50px 50px 0"
                  : "50px 0 0 50px"
                : 0,
            color: colors.main,
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Stack
        sx={{
          mx: "auto",
        }}
      >
        {items && sortedArr && (
          <Swiper
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={10}
            centerInsufficientSlides
            initialSlide={sortedArr?.indexOf(items[1])}
            style={{
              width: "100%",
            }}
             
            breakpoints={{
              0: {
                slidesPerView: 2,
              },

              800: {
                slidesPerView: 3,
                spaceBetween: 100,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 100,
              },
            }}
          >
            {sortedArr &&
              // sortedArr[0] &&
              sortedArr?.map((item, index) => (
                <SwiperSlide
                
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* most-selling-slider */}
                  <Stack sx={{
                    display:'flex',
                    alignItems: "center",
                  }}>
                    <SellingProductCard item={item} index={index} />
                  </Stack>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Stack>
    </Box>
  );
};

export default MostSellingProducts;
