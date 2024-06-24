import React from "react";
import useFetchDepartments from "./useFetchDepartments";
import { Box, Stack, Typography } from "@mui/material";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import DepartmentProduct from "./DepartmentProduct";
const SeparateDepartment = ({ category, manipulateQuery }) => {
  const { products } = useFetchDepartments(category?._id + manipulateQuery());
  const [_, { language: lang }] = useTranslation();

  return (
    <Box
      sx={{
        direction: "ltr !important",
      }}
    >
      {category?.name_en && products?.length > 0 && (
        <>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {
                md: "30px",
                xs: "20px",
              },
              fontFamily: `${publicFontFamily} !important`,
              fontWeight: "bold",
              color: colors.main,
              mb: "40px",
            }}
          >
            {category[`name_${lang}`]}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: {
                xl: "75px",
                lg: "100px",
                md: "5%",
                xs: "5%",
              },
              width: 0.9,
              mx: "auto",
            }}
          >
            {products.map((item, index) => (
              <DepartmentProduct item={item} indx={index} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SeparateDepartment;
