import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import React from "react";
import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../../components/publicStyle/publicStyle";

import { cardStyle } from "../../components/cards/cardStyle";
import { imageBaseUrl } from "../../components/service";
import { useTranslation } from "react-i18next";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { useLocation, useNavigate } from "react-router-dom";
import useAddToSavedProduct from "../../Pages/ProductsListForCart_Saved/useAddSavedProduct";
import useAddToCart from "../../Pages/cart/useAddToCart";
import { useUpdateProductMutation } from "../../APIs/ProductApis";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddToCartMutation, useGetAllCartsQuery } from "../../APIs/cartApi";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CartIcon from "./carticon.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const DepartmentProduct = ({ item, externalWidth }) => {
  const navigate = useNavigate();
  const [addSavedProduct] = useAddToSavedProduct();
  const [mutateAddToCart] = useAddToCart();
  const [updateProduct] = useUpdateProductMutation();
  const [addToCart, { isLoading: addingLoading }] = useAddToCartMutation();
  const { data: cartData, isError: isErrCart } = useGetAllCartsQuery();
  const [_, { language }] = useTranslation();
  const onSavedClicked = (item) => {
    addSavedProduct(item._id);
  };
  const {
    data: savedProducts,
    isError: isErrSaved,
    error,
  } = useGetAllSavedProductsQuery();
  const handleAddToCart = (product) => {
    if (product?.qualities?.length > 0 || product?.paymentType == "both") {
      navigate(
        `/productDetails/${product?._id}/${product?.title_en.replace(
          / /g,
          "-"
        )}`
      );
      return;
    }
    addToCart({
      id: product?._id,
      paymentType: product?.paymentType,
      quantity: 1,
      properties: [],
    }).then((res) => {
      if (res?.data) {
        toast.success(res?.data[`success_${language}`]);
      }
      toast.error(res?.error?.data[`error_${language}`]);
    });
  };
  return (
    <Box
      className="most-selling-slider"
      key={item?._id}
      sx={{
        ...cardStyle.card,
        width: {
          xl: 435,
          lg: 275,
          md: 0.3,
          xs: 0.45,
        },
        bgcolor: "#fff",
      }}
    >
      <Box
        position={"relative"}
        sx={{
          height: {
            xl: 500,
            lg: 370,
            md: 225,
            xs: 200,
          },
        }}
      >
        <CardMedia
          component="img"
          src={imageBaseUrl + "/" + item.images[0]}
          alt={item.title}
          sx={{
            cursor: "pointer",
            height: 1,
            width: 1,
            borderRadius: "300px 300px 0 0",
          }}
          onClick={() =>
            navigate(
              `/productDetails/${item._id}/${item.title_en.replace(/ /g, "-")}`
            )
          }
        />
        <Button
          sx={{
            position: "absolute",
            bottom: "20px",
            left: "3%",
            minWidth: 0,
            height: 40,
            width: 40,
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={() => onSavedClicked(item)}
        >
          {savedProducts &&
          !isErrSaved &&
          savedProducts?.data?.favourite?.find((saved) => {
            return saved?._id === item?._id;
          }) ? (
            <FavoriteBorderIcon
              sx={{
                color: colors.main,
                fontSize: { lg: "40px", md: "30px", sx: "24px" },
                backgroundColor: "transparent",
              }}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                color: "#eee",
                fontSize: { lg: "40px", md: "30px", sx: "24px" },
              }}
            />
          )}
        </Button>
      </Box>
      <Box
        sx={{
          height: {
            lg: 74,
            md: 68,
            xs: "auto",
          },
          bgcolor: colors.main,
          mt: {
            md: "10px",
            xs: "20px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          px: "20px",
          direction: language === "en" ? "ltr" : "rtl",
        }}
      >
        <Stack
          sx={{
            alignItems: "flex-start",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: publicFontFamily,
              fontWeight: "bold",

              color: "#fff",
              fontSize: {
                lg: "16px",
                md: "14px",
                xs: "11.5px",
              },
              width: {
                md: "initial",
              },
              textAlign: {
                md: "initial",
                xs: "center",
              },
              mx: {
                xs: "0px",
                md: "10px",
              },
            }}
          >
            {language === "en"
              ? item?.title_en?.length > 15
                ? item?.title_en.slice(0, 10) + "..."
                : item?.title_en
              : item?.title_ar?.length > 15
              ? item?.title_ar.slice(0, 10) + "..."
              : item?.title_ar}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: language === "en" ? "left" : "right",
              fontFamily: publicFontFamily,
              fontWeight: "bold",

              color: "#fff",
              fontSize: {
                lg: "16px",
                md: "14px",
                xs: "11.5px",
              },
              span: {
                fontSize: {
                  lg: "16px",
                  md: "14px",
                  xs: "11.5px",
                },
              },
            }}
          >
            <span>{item.finalPrice.toFixed(2)}</span>
            {language === "en" ? " SAR" : " ر.س"}
          </Typography>
        </Stack>
        <Button
          className="add_to_cart_btn"
          sx={{
            fontFamily: publicFontFamily,
            transition: "0.4s all",
            textTransform: "none",
            fontWeight: "bold",
            minWidth: 0,
            width: 0,
            "&:active": {
              transform: "scale(0.95)",
            },
            width: {
              xs: "10px",
              md: "14px",
            },
          }}
          onClick={() => handleAddToCart(item)}
        >
          {addingLoading ? (
            <CircularProgress
              sx={{
                color: "#fff",
              }}
            />
          ) : !isErrCart &&
            cartData?.cart?.find(
              ({ product }) => product?._id === item?._id
            ) ? (
            <RemoveShoppingCartIcon
              sx={{
                color: "#fff",
                fontSize: {
                  md: "22px",
                  xs: "19px",
                },
              }}
            />
          ) : (
            <CardMedia
              component="img"
              src={CartIcon}
              sx={{
                color: "#fff",
                fontSize: {
                  md: "22px",
                  xs: "19px",
                },
                width: {
                  lg: "25px",
                  md: "20px",
                  sm: "15px",
                  xs: "15px",
                },
              }}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default DepartmentProduct;
