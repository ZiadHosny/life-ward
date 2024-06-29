import {
  Box,
  Button,
  CardMedia,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import React from "react";
import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../../components/publicStyle/publicStyle";
import { cardStyle } from "../cards/cardStyle";
import { imageBaseUrl } from "../service";
import { useTranslation } from "react-i18next";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useLocation, useNavigate } from "react-router-dom";
import useAddToSavedProduct from "../../Pages/ProductsListForCart_Saved/useAddSavedProduct";
import useAddToCart from "../../Pages/cart/useAddToCart";
import { useUpdateProductMutation } from "../../APIs/ProductApis";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddToCartMutation, useGetAllCartsQuery } from "../../APIs/cartApi";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useSwiper, useSwiperSlide } from "swiper/react";
import cartIcon from "../../assets/cartIcon.svg";

const SellingProductCard = ({ item, index }) => {
  const navigate = useNavigate();
  const [addSavedProduct] = useAddToSavedProduct();
  const [updateProduct] = useUpdateProductMutation();
  const [addToCart, { isLoading: addingLoading }] = useAddToCartMutation();
  const { data: cartData, isError: isErrCart } = useGetAllCartsQuery();
  const swiperSlide = useSwiperSlide();
  const [_, { language }] = useTranslation();
  const handleUpdateProduct = (item) => {
    updateProduct({ productId: item?._id, product: item }).then(
      ({ data, error }) => {
        if (!error) {
        } else {
          toast.error("some Error While updating ");
        }
      }
    );
  };
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

        width:
          swiperSlide.isActive !== true
            ? {
                xl: 350,
                lg: 275,
                md: 250,
                sm: 250,
                xs: 0.9,
              }
            : {
                xl: 470,
                lg: 375,
                md: 350,
                sm: 350,
                xs: 1,
              },
        // bgcolor: "#fff",
        pt: swiperSlide.isActive !== true ? 10 : 0,
      }}
    >
      {item && (
        <>
          <Box
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            sx={{
              height:
                swiperSlide.isActive !== true
                  ? {
                      lg: 400,
                      md: 225,
                      xs: 160,
                    }
                  : {
                      lg: 550,
                      md: 325,
                      xs: 260,
                    },
            }}
          >
            <CardMedia
              component="img"
              src={imageBaseUrl + "/" + item.images[0]}
              alt={item.title}
              sx={{
                border: "2px solid #f1f1f1",
                cursor: "pointer",
                height: {
                  xs: swiperSlide.isActive !== true ? "100%" : "100%",
                  md: swiperSlide.isActive !== true ? "100%" : "100%",
                  lg: swiperSlide.isActive !== true ? "100%" : "100%",
                },
                mb: {
                  lg: swiperSlide.isActive !== true ? "20px" : 0,
                  md: swiperSlide.isActive !== true ? "10px" : "15px",
                  xs: swiperSlide.isActive !== true ? "5x" : "10px",
                },
                width: 1,
                borderRadius:
                  swiperSlide.isActive !== true
                    ? swiperSlide.isPrev
                      ? "190px 0 0 0"
                      : "0 190px 0 0 "
                    : "250px 250px 0 0",
                objectFit: "cover",
              }}
              onClick={() =>
                navigate(
                  `/productDetails/${item._id}/${item.title_en.replace(
                    / /g,
                    "-"
                  )}`
                )
              }
            />
            <Button
              sx={{
                position: "absolute",
                bottom:
                  swiperSlide.isActive !== true
                    ? "50px"
                    : { lg: "30px", md: "20px", sm: "18px", xs: "14px" },
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
              height: 74,
              bgcolor: colors.main,
              marginTop: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: "20px",
              direction: language === "en" ? "ltr" : "rtl",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: language === "en" ? "left" : "right",
                  fontFamily: publicFontFamily,

                  color: "#fff",
                  fontSize: {
                    lg: "16px",
                    md: "14px",
                    xs: "11.5px",
                  },
                  mx: {
                    xs: "0px",
                    lg: "10px",
                  },
                }}
              >
                {`${language === "en"
            ? item?.title_en:item?.title_ar}`.slice(0,50)}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textAlign: language === "en" ? "left" : "right",
                  fontFamily: publicFontFamily,
                  color: "#fff",
                  fontSize: {
                    lg: "16px",
                    md: swiperSlide.isActive !== true ? "14px" : "10px",
                    xs: "11.5px",
                  },
                  span: {
                    fontSize: {
                      lg: "16px",
                      md: "13px",
                      xs: "12px",
                    },
                  },
                }}
              >
                <span>{item.finalPrice?.toFixed(2)}</span>
                {language === "en" ? " SAR" : " ر.س"}
              </Typography>
            </Stack>
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
                <Stack
                  component={"img"}
                  sx={{
                    color: "#fff",
                    fontSize: {
                      lg: "20px",
                      md: "16px",
                      sm: "12px",
                    },
                    width: {
                      lg: "30px",
                      md: "20px",
                      sm: "20px",
                      xs: "18px",
                    },
                  }}
                  src={cartIcon}
                />
              )}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SellingProductCard;
