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
import cartIcon from './cartIcon.svg'
const ProductCard = ({ item, newest }) => {
  const navigate = useNavigate();
  const [addSavedProduct] = useAddToSavedProduct();
  const [mutateAddToCart] = useAddToCart();
  const [updateProduct] = useUpdateProductMutation();
  const [addToCart, { isLoading: addingLoading }] = useAddToCartMutation();
  const { data: cartData, isError: isErrCart } = useGetAllCartsQuery();
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
     
    addSavedProduct(item?._id);
  };
  const { data: savedProducts, isError: isErrSaved } =
    useGetAllSavedProductsQuery();
  const handleAddToCart = (product) => {
    if (product?.qualities?.length > 0 || product?.paymentType == "both") {
      navigate(
        `/productDetails/${item._id}/${item.title_en.replace(/ /g, "-")}`
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
       key={item?._id}
      className={newest?"bigiiimage":"" +'most-selling-slider'}
      
      sx={{
        ...cardStyle.card,
        width: {
          xl: newest ? 600 : 380,
          lg: newest ? 460 : 250,
          md: newest ? 370 : 230,
          sm: newest ? 380 : 200,
          xs: 0.9,
        },
        bgcolor: "#fff",
        borderRadius: {
          xl: "300px 300px 0 0",
          lg: "250px 250px 0 0",
          md: "200px 200px 0 0",
          xs: "250px 250px 0 0",
        },
        overflow: "hidden",
      }}
    >
      <Box
        position={"relative"}
        sx={{
          height: {
            xl: newest ? 780 : 320,
            lg: newest ? 500 : 250,
            md: newest ? 400 : 230,
            sm: newest ? 380 : 200,
            xs: newest ? 380 : 200,
          },
        }}
      >
        <CardMedia
          component="img"
          src={imageBaseUrl + "/" + item?.images[0]}
          alt={item?.title}

          sx={{
            cursor: "pointer",
            height: 1,
            width: 1,
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
            bottom: "30px",
            left: "10%",
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
          savedProducts?.data?.favourite?.find(
            (saved) => saved?._id === item?._id
          ) ? (
            <FavoriteBorderIcon
            
            sx={{
              color: colors.main,
              fontSize: {lg:"40px",md:"30px",sx:"24px"},
             }}
          />
          ) : (
            <FavoriteBorderIcon
            
            sx={{
              color: "#eee",
              fontSize: {lg:"40px",md:"30px",sx:"24px"},
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
            xs: 60,
          },
          bgcolor: colors.main,
          mt: {
            md: "30px",
            xs: "20px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
      
          px: { xs: "10px", md: "20px" },
          direction: language === "en" ? "ltr" : "rtl",
        }}
      >
      <Stack sx={{
        flexDirection:{
          xs:'column',
          lg:'row'
        },
        alignItems: 'flex-start',
      }}>
      <Typography
          variant="h5"
          sx={{
            fontFamily: publicFontFamily, 
            wordBreak: "break-all",
            color: "#fff",
            fontSize: {
              lg: "16px",
              md: "14px",
              xs: "11.5px",
            },
           width:"60%",
            textAlign: {
              md: "initial",
              xs: "center",
            },
            display:"inline-block",
            whiteSpace: "nowrap",
            
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
            wordBreak: "break-all",
            color: "#fff",
            fontSize: {
              lg: "16px",
              md : "13px",
              xs: "12px",
            },
            span: {
              fontSize: {
                lg: "16px",
                md : "13px",
                xs: "12px",
              },
            },
            mx:{
              xs:'0px',
              lg:'10px'
            }
          }}
        >
          <span>{item?.finalPrice?.toFixed(2)}</span>
          {language === "en" ? " SAR" : " ر.س"}
        </Typography>
      </Stack>
        <Button
          className="add_to_cart_btn"
          sx={{
            fontFamily: publicFontFamily,
            fontSize: {
              md: "initial",
              xs: "10.5px",
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
                fontSize: {
                  md: "20px",
                  xs: "17px",
                },
              }}
            />
          ) : (
            <Stack
            component={'img'}
              sx={{
                color: "#fff",
                fontSize: {
                  lg: "20px",
                  md : "16px",
                  sm: "12px",
                },
                width :{
                  lg: "30px",
                  md : "20px",
                  sm: "20px",
                  xs: "18px",
                }
              }}
              src={cartIcon}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
