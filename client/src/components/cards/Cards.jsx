import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Pagination,
  Rating,
  Skeleton,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { imageBaseUrl } from "../../components/service";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import useAddSavedProduct from "../../Pages/savedProduct/useAddSavedProduct";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { CardsStackStyle, cardStyle, colors } from "./cardStyle";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import useAddToSavedProduct from "../../Pages/ProductsListForCart_Saved/useAddSavedProduct";
import useAddToCart from "../../Pages/cart/useAddToCart";
import useFetchSavedProducts from "../../Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import { useTranslation } from "react-i18next";
import { useUpdateProductMutation } from "../../APIs/ProductApis";
import ReactStars from "react-rating-stars-component";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { publicFontFamily, publicSizes } from "../publicStyle/publicStyle";
import ProductCard from "../productCard/ProductCard";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import DepartmentProduct from "../../Pages/departments/DepartmentProduct";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
export default function Cards({
  items,
  title,
  page,
  setPage,
  currentCategory,
  subCategoryId,
}) {
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (page - 1) * 10;
    const lastPageIndex = firstPageIndex + 10;
    return items?.slice(firstPageIndex, lastPageIndex);
  }, [page]);
  return (
    <Box
      sx={{
        direction: `${language === "en" ? "ltr" : "rtl"} !important`,
      }}
      key={title ? title : undefined}
    >
      <Box
        sx={{
          ...CardsStackStyle.cardsHeader,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bolder",
            textTransform: "capitalize",
            bgcolor: pathname === "/" ? colors.newMainColor : undefined,
            color: pathname === "/" ? "#fff" : "#000",
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            fontSize: {
              lg: "30px",
              xs: "22px",
            },
            color: colors.main,
          }}
        >
          {currentCategory?.[`title_${language}`]}
        </Typography>

        {subCategoryId && (
          <>
            <ChevronLeftIcon />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bolder",
                textTransform: "capitalize",
                bgcolor: pathname === "/" ? colors.newMainColor : undefined,
                color: pathname === "/" ? "#fff" : "#000",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                fontSize: {
                  lg: "30px",
                  xs: "22px",
                },
                color: colors.main,
              }}
            >
              {
                currentCategory?.subs?.find(({ id }) => id === subCategoryId)?.[
                  `title_${language}`
                ]
              }
            </Typography>
          </>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: {
            xl: "100px",
            lg: "100px",
            md: "5%",
            xs: "5%",
          },
          width: 0.9,
          mx: "auto",
        }}
      >
        {items &&
          items[0] &&
          items.map((item, index) => (
            <DepartmentProduct item={item} key={index} />
          ))}
      </Box>
    </Box>
  );
}
