import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import React from "react";
import useFetchMostSellingProducts from "./homeComponents/cards/useFetchMostSellingProducts";
import useFetchDepartmentsProducts from "./homeComponents/cards/useFetchDepartmentsProducts";
import useFetchMostNewiestProducts from "./homeComponents/cards/useFetchMostNewiestProducts";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import HeroSection from "./heroSection/HeroSection";
import DepartmentsSlider from "../../components/departmentsSlider/DepartmentsSlider";
import Loader from "../../components/loader/loader";
import CustomError from "../../components/Error/Error";
import OurTarget from "./OurTarget";
import HomeAbout from "./HomeAbout";
import Banner1 from "../../assets/home/banner1.gif";
import Banner2 from "../../assets/home/banner-2.gif";

import MostSellingProducts from "../../components/homeProducts/MostSellingProducts";
import MostNewiestProducts from "../../components/homeProducts/MostNewiestProducts";
import DepartmentsProducts from "../../components/homeProducts/DepartmentsProducts";


function Home() {
  const dispatch = useDispatch();
  const [_, { language }] = useTranslation();
  const { mostSellingProducts, isLoading: loadingSellings } =
    useFetchMostSellingProducts();
  const { mostNewiestProducts, isLoading: loadingNewiest } =
    useFetchMostNewiestProducts();
  const { departmentsProducts, isLoading: loadingDepartmentsProducts } =
    useFetchDepartmentsProducts();
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
        <img
          style={{ width: '100%', height: '100%', }}
          src={Banner2}
        />
        {/* <HomeAbout /> */}
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
              ? "Most Newest products are not found"
              : "لم يتم العثور على المنتجات الأحدث"
          }
        />
      )}
      <Box
        sx={{
          mt: "30px",
        }}
      >
        <img
          style={{ width: '100%', height: '100%', }}
          src={Banner1}
        />
        {/* <OurTarget /> */}
      </Box>

      {loadingDepartmentsProducts ? (
        <Loader />
      ) : departmentsProducts?.length > 0 ? (
        <Box sx={{ pt: 3 }}>
          <DepartmentsProducts
            title={language === "en" ? "All Departments" : "جميع الأقسام"}
            items={departmentsProducts}
          />
        </Box>
      ) : (
        <CustomError
          errorMessage={
            language === "en"
              ? "All Departments products are not found"
              : "لم يتم العثور على جميع الأقسام"
          }
        />
      )}

    </Box>
  );
}

export default Home;
