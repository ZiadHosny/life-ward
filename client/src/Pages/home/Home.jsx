import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import React from "react";
import useFetchMostSellingProducts from "./homeComponents/cards/useFetchMostSellingProducts";
import useFetchMostNewiestProducts from "./homeComponents/cards/useFetchMostNewiestProducts";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import HeroSection from "./heroSection/HeroSection";
import DepartmentsSlider from "../../components/departmentsSlider/DepartmentsSlider";
import Loader from "../../components/loader/loader";
import CustomError from "../../components/Error/Error";
import OurTarget from "./OurTarget";
import HomeAbout from "./HomeAbout";
import MostSellingProducts from "../../components/homeProducts/MostSellingProducts";
import MostNewiestProducts from "../../components/homeProducts/MostNewiestProducts";
function Home() {
  const dispatch = useDispatch();
  const [_, { language }] = useTranslation();
  const { mostSellingProducts, isLoading: loadingSellings } =
    useFetchMostSellingProducts();
  const { mostNewiestProducts, isLoading: loadingNewiest } =
    useFetchMostNewiestProducts();
  return (
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      <Box>
        <HeroSection />
        <DepartmentsSlider />
      </Box>
      {loadingSellings ? (
        <Loader />
      ) : mostSellingProducts.length > 0 ? (
        <Box sx={{ pt: 3 }}>
          <MostSellingProducts
            title={language === "en" ? "Most selling" : "الأكثر مبيعاً"}
            items={mostSellingProducts}
          />
        </Box>
      ) : (
        <CustomError
          errorMessage={
            language === "en"
              ? "Most selling products Are Not Found"
              : "لم يتم العثور على المنتجات الأكثر مبيعاً"
          }
        />
      )}
      <Box
        sx={{
          mt: "30px",
        }}
      >
        <HomeAbout />
      </Box>

      {loadingNewiest ? (
        <Loader />
      ) : mostNewiestProducts?.length > 0 ? (
        <Box sx={{ pt: 3 }}>
          <MostNewiestProducts
            title={language === "en" ? "Most Newest" : "الأحدث"}
            items={mostNewiestProducts}
          />
        </Box>
      ) : (
        <CustomError
          errorMessage={
            language === "en"
              ? "Most Newest products are not dound"
              : "لم يتم العثور على المنتجات الأحدث"
          }
        />
      )}
      <OurTarget />
    </Box>
  );
}

export default Home;
