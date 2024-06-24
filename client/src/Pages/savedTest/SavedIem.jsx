import {
  Box,
  Button,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import React from "react";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { cardStyle } from "../../components/cards/cardStyle";
import { imageBaseUrl } from "../../components/service";
import { useTranslation } from "react-i18next";
import {
  useDeleteSavedProductMutation,
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import { useNavigate } from "react-router-dom";
import useAddToSavedProduct from "../../Pages/ProductsListForCart_Saved/useAddSavedProduct";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAddToCartMutation, useGetAllCartsQuery } from "../../APIs/cartApi";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ClearIcon from "@mui/icons-material/Clear";
const SavedItem = ({ item, externalWidth }) => {
  const navigate = useNavigate();
  const [addToCart, { isLoading: addingLoading }] = useAddToCartMutation();
  const { data: cartData, isError: isErrCart } = useGetAllCartsQuery();
  const [_, { language }] = useTranslation();
  const [deleteSavedProduct] = useDeleteSavedProductMutation();

  const handleAddToCart = (product) => {
    console.log(product, "awfwaawawafw1r23");
    if (product?.qualities?.length > 0 || product?.paymentType == "both") {
      navigate(
        `/productDetails/${product._id}/${product.title_en.replace(/ /g, "-")}`
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
  const deleteProduct = (id) => {
    deleteSavedProduct(id).then(({ data, error }) => {
      if (data) {
        toast.success(data[`success_${lang}`]);
      }
      if (error) {
        toast.error(error?.data[`error_${lang}`]);
      }
    });
  };
  return (
    <Box
      className="most-selling-slider"
      key={item?._id}
      sx={{
        ...cardStyle.card,
        width: {
          xl: 400,
          lg: 275,
          md: 0.3,
          xs: 0.7,
        },
        bgcolor: "#fff",
      }}
    >
      <Box
        position={"relative"}
        sx={{
          height: {
            lg: 400,
            md: 225,
            xs: 200,
          },
        }}
      >
        <CardMedia
          component="img"
          src={imageBaseUrl + "/" + item?.images[0]}
          alt={item.title}
          sx={{
            cursor: "pointer",
            height: 1,
            width: 1,
            borderRadius: "200px 200px 0 0",
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
            top: "20%",
            left: language === "ar" ? "75%" : undefined,
            right: language === "en" ? "75%" : undefined,
            transform: `translateX(${language === "ar" ? "-25%" : "25%"})`,
            minWidth: 0,
            height: 40,
            width: 40,
            bgcolor: "#fff !important",
            border: `1px solid ${colors.main}`,
            borderRadius: "50%",
            zIndex: 4,
            cursor: "pointer",
          }}
          onClick={() => deleteProduct(item?._id)}
        >
          <ClearIcon
            sx={{
              color: colors.main,
              fontSize: "24px",
            }}
          />
        </Button>
        <FavoriteBorderIcon
          sx={{
            color: colors.main,
            fontSize: "32px",
            position: "absolute",
            bottom: "20px",
            left: {
              md: language === "ar" ? "20px" : undefined,
              xs: language === "ar" ? "18px" : undefined,
            },
            right: {
              md: language === "en" ? "20px" : undefined,
              xs: language === "en" ? "18px" : undefined,
            },
          }}
        />
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
            md: "30px",
            xs: "20px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          px: "20px",
          direction: language === "en" ? "ltr" : "rtl",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: language === "en" ? "left" : "right",
            fontFamily: publicFontFamily,
            fontWeight: { md: "bold", xs: "normal", sm: "bold" },
            wordBreak: "break-all",
            color: "#fff",
            fontSize: {
              md: "initial",
              xs: "11.5px",
            },
            width: {
              md: "auto",
            },
            textAlign: {
              md: "auto",
              xs: "center",
            },
          }}
        >
          {language === "en"
            ? item?.title_en?.length > 15
              ? item?.title_en.slice(0, 15) + "..."
              : item?.title_en
            : item?.title_ar?.length > 15
            ? item?.title_ar.slice(0, 15) + "..."
            : item?.title_ar}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: language === "en" ? "left" : "right",
            fontFamily: publicFontFamily,
            fontWeight: { md: "bold", xs: "normal", sm: "bold" },

            color: "#fff",
            fontSize: {
              md: "initial",
              xs: "11.5px",
            },
            span: {
              fontSize: {
                lg: "23px",
                xs: "15px",
              },
            },
            width: {
              md: "auto",
            },
          }}
        >
          {console.log(item, "wafawffwawaf")}
          <span>{item?.finalPrice}</span>
          {language === "en" ? " SAR" : " ر.س"}
        </Typography>
        <Button
          className="add_to_cart_btn"
          sx={{
            fontFamily: publicFontFamily,
            fontSize: {
              md: "initial",
              xs: "13.5px",
            },
            transition: "0.4s all",
            textTransform: "none",
            fontWeight: "bold",
            minWidth: 0,
            width: 0,
            // bgcolor:
            //   !isErrCart &&
            //   cartData?.cart?.find(({ product }) => product?._id === item?._id)
            //     ? `${colors.second} !important`
            //     : "#fff !important",
            "&:active": {
              transform: "scale(0.95)",
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
              }}
            />
          ) : (
            <ShoppingCartIcon
              sx={{
                color: "#fff",
              }}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default SavedItem;
