import * as React from "react";
import Typography from "@mui/material/Typography";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Box, Stack } from "@mui/material";
import { CardsStackStyle, cardStyle, colors } from "./cardStyle";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { publicFontFamily } from "../publicStyle/publicStyle";
import ProductCard from "../productCard/ProductCard";

export default function CardsTest({ items, title, singleDepartmentName }) {
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        direction: "ltr !important",
        width: {
          xl: 1500,
          lg: 1100,
          xs: 1,
        },
        mx: "auto",
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
            fontWeight: "bold",
            fontFamily: publicFontFamily,
            mb: {
              md: "50px",
              xs: "35px",
            },
            py: {
              lg: "20px",
              xs: "16px",
            },
            fontSize: {
              xl: "60px",
              lg: "55px",
              md: "45px",
              xs: "40px",
            },
            borderRadius:
              pathname === "/"
                ? language === "en"
                  ? "0 50px 50px 0"
                  : "50px 0 0 50px"
                : 0,
            color: colors.main,
          }}
        >
          {title ? title : singleDepartmentName}
        </Typography>
      </Stack>

      <Stack
        sx={{
          mx: "auto",
        }}
      >
        <Box
          component={Splide}
          className="products_slider department_products_slider"
          hasTrack={false}
          width="100%"
          sx={{
            width: {
              md: 1,
              xs: "150vw",
            },
            ml: {
              md: 0,
              xs: "-30%",
            },
            zIndex: "5",
          }}
          options={{
            perPage: 3,
            perMove: 1,
            arrows: true,
            autoplay: true,
            breakpoints: {
              1900: {
                perPage: 3,
                type: "slide",
              },
              1500: {
                perPage: 3,
                type: "slide",
              },
              1200: {
                perPage: 3,
                type: "slide",
              },
              992: {
                perPage: 3,
                type: "slide",
              },
              768: {
                perPage: 3,
                type: "loop",
              },
              600: {
                perPage: 3,
                type: "loop",
              },
            },
          }}
        >
          <SplideTrack>
            {items &&
              items[0] &&
              items?.map((item, index) => (
                <Box
                  component={SplideSlide}
                  key={index}
                  sx={{
                    mx: {
                      md: 0,
                      xs: "10px",
                    },
                    overflowY: "visible",
                    py: "100px",
                  }}
                >
                  <ProductCard item={item} />
                </Box>
              ))}
          </SplideTrack>
        </Box>
        {/* {products?.map((product) => (
              <Box
                sx={{
                  mt: "10px",
                }}
              >
                <ProductCard
                  item={product}
                  externalWidth={{
                    lg: 400,
                    md: 0.6,
                    xs: 1,
                  }}
                />
              </Box>
            ))} */}
      </Stack>
    </Box>
  );
}
