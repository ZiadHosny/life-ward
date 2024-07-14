import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Chip,
  Link,
  Typography,
  ButtonGroup,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import Apple from "../../assets/payment/apple.jpg";
import Master from "../../assets/payment/master.jpg";
import Visa from "../../assets/payment/visa.jpg";
import Transfer from "../../assets/payment/transfer.jpg";
import Mda from "../../assets/payment/mda.jpg";
import Stc from "../../assets/payment/stc.jpg";
import Popover from "@mui/material/Popover";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductComments from "./productComments/ProductComments";
import {
  useAddRatingMutation,
  useLazyGetSingleProductQuery,
} from "../../APIs/ProductApis";

import {
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useGetAllCartsQuery,
} from "../../APIs/cartApi";
import { useLazyGetMeQuery } from "../../APIs/UserApis";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import "@splidejs/react-splide/css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ImageSlider from "./imageSlider";
import { useEffect } from "react";
import i18n from "../../i18n";
import { setCart } from "../../APIs/cartSlice";
import { Colors } from "./colors";
import SimilarProduct from "./similarproduct/index";
import Loader from "../../components/loader/loader";
import Rating from "./Rating.jsx";

function MouseOverPopover({
  children,
  text,
  cartData,
  setCartData,
  key,
  attr,
  values,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setCartData((prev) => {
      const newQualities = prev?.qualities?.filter(
        (v) => v.key_en !== attr.key_en && v.key_ar !== attr.key_ar
      );
      return {
        ...prev,
        qualities: [
          ...newQualities,
          {
            key_en: attr.key_en,
            key_ar: attr.key_ar,
            value_en: values.value_en,
            value_ar: values.value_ar,
            price: values?.price,
            id: attr?.id,
          },
        ],
      };
    });

    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setCartData((prev) => ({
      ...prev,
      qualities: cartData.qualitiesBefore,
    }));
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          width: "100%",
        }}
      >
        {children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        disablePortal
        disableScrollLock
        transformOrigin={{
          vertical: "top",
          horizontal: "top",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography
          sx={{
            padding: "10px",
          }}
        >
          {" "}
          {text}
        </Typography>
      </Popover>
    </div>
  );
}
//   ========================================Attr===============================

const Attrs = ({ colors, attr, setCartData, cartData, product }) => {
  const { attrAciveColors } = colors;
  const [, { language: lang }] = useTranslation();
  const handleUpdateQualities = ({ attr, values }) => {
    setCartData((prev) => {
      const newQualities = prev?.qualities?.filter((v) => {

        return v?.key_en !== attr?.key_en && v?.key_ar !== attr?.key_ar;
      });
      // qualitiesBefore
      const qualitiesBeforeHover = [
        ...newQualities,
        {
          key_en: attr?.key_en,
          key_ar: attr?.key_ar,
          value_en: values?.value_en,
          value_ar: values?.value_ar,
          price: values?.price,
          id: attr?.id,
        },
      ];

      return {
        ...prev,
        qualities: qualitiesBeforeHover,
        qualitiesBefore: qualitiesBeforeHover,
      };
    });
  };
  const isSelectedAtt = (val) => {
    return (
      val.value_en ===
      cartData?.qualities?.find(
        (v) =>
          v?.id === attr?.id &&
          v?.key_en === attr?.key_en &&
          v?.id === attr?.id &&
          v?.key_ar === attr?.key_ar
      )?.value_en
    );
  };

  return (
    <Box
      key={attr._id}
      dir="ltr"
      className="quality"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
      }}
    >
      <Typography
        sx={{
          color: colors?.attrKeyColor,
          fontWeight: "bold",
          textAlign: lang === "en" ? "left" : "right",
          width: "fit-content",
          color: "#693096",
          fontSize: {
            xs: "15px",
            md: "25px",
          },
          fontWeight: "100",
          fontFamily: "El Messiri",
        }}
      >
        {lang === 'ar' ? ':' : ''}
        {attr[`key_${lang === "en" ? "en" : "ar"}`]}
        {lang === 'en' ? ':' : ''}
      </Typography>
      <ButtonGroup
        variant="outlined"
        sx={{
          width: '100%',
          overflow: 'auto',
          // width: {
          //   md: "350px",
          //   sm: '200px',
          //   xs: '100%'
          // },
          gap: '8px',
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          borderRadius: 0,
          '& .MuiButtonGroup-grouped': {
            borderRadius: "20px !important",
          },
        }}
      >
        {attr?.values?.map((val) => {
          return (
            <Button
              sx={{
                color: isSelectedAtt(val) ? "#fff" : "#693096",
                bgcolor: isSelectedAtt(val) ? "#693096" : "#fff",
                borderColor: `#693096 !important`,
                width: "100%",
                paddingRight: 3,
                paddingLeft: 3,
                paddingTop: 1,
                paddingBottom: 1,
                "&:hover": {
                  bgcolor: "#693096",
                  color: "#fff",
                },
                fontSize: "20px",
                ".css-n7haop-MuiTypography-root": {
                  // "font-size": {
                  //   xs: "15px",
                  //   md: "20px",
                  // },
                  "font-weight": 200,
                  fontFamily: "El Messiri",
                },
              }}
              key={val.value_en}
              onClick={() =>
                handleUpdateQualities({
                  attr,
                  values: {
                    value_en: val?.value_en,
                    value_ar: val?.value_ar,
                    price: val?.price,
                  },
                })
              }
            >
              {val.price ? (
                <MouseOverPopover
                  text={
                    val.price
                      ? `${product?.offer?.percentage ? val?.price - val?.price * product?.offer?.percentage / 100 : val?.price} 
                          ${lang === "en" ? "SAR" : "رس"}`
                      : null
                  }
                  setCartData={setCartData}
                  cartData={cartData}
                  attr={attr}
                  values={{
                    value_en: val?.value_en,
                    value_ar: val?.value_ar,
                    price: val?.price,
                  }}
                >
                  {val[`value_${lang === "en" ? "en" : "ar"}`]}
                </MouseOverPopover>
              ) :
                (
                  <MouseOverPopover>
                    {val[`value_${lang === "en" ? "en" : "ar"}`]}
                  </MouseOverPopover>
                )
              }
            </Button>
          );
        })}
      </ButtonGroup>
    </Box >
  );
};

//
function SingleProduct() {
  const { productId } = useParams();
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useSelector((state) => state);
  const [getSingleProduct, { data, isError, isSuccess, isLoading }] =
    useLazyGetSingleProductQuery();
  const [getMe] = useLazyGetMeQuery();
  const [user, setUser] = React.useState();

  const {
    data: dataCart,
    isSuccess: cartIsSuccess,
    error: cartError,
  } = useGetAllCartsQuery();
  const [cartData, setCartData] = useState({
    quantity: 1,
    qualities: [],
    id: productId,
  });
  // const colors = Colors;

  const [addRating] = useAddRatingMutation();
  const [_, { language: lang }] = useTranslation();
  const [product, setProduct] = React.useState();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { data: savedProducts, isError: isErrSaved } =
    useGetAllSavedProductsQuery();
  const [qImage, setQimages] = useState([]);

  const [, setCount] = useState(1);
  const productPrice =
    product && product[product.sale && product.sale > 0 ? "sale" : "price"];
  const [finalPrice, setFinalPrice] = useState();
  const [offPrice, setOffPrice] = useState(false);
  const [addedPrice, setAddedprice] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addToCart, { isLoading: cardLoad }] = useAddToCartMutation();
  const [categoryId, Setcategoryid] = useState("");

  useEffect(() => {
    getSingleProduct(productId)
      .unwrap()
      .then(({ data }) => {
        setProduct(data);
        setQimages(data?.images);
        Setcategoryid(data?.category?.id);

        setCartData({
          quantity: 1,
          qualities: [],
          id: productId,
          qualityAfterprice: 0,
          qualitiesBefore: [],
        });
      })
      .catch((err) => { });
  }, [productId]);
  //  const [allSelectedQualities, setAllSelectedQualities] = useState([]);

  const productInCart =
    cartIsSuccess &&
    !cartError &&
    dataCart?.cart?.find(
      (earchProduct) => earchProduct?.product?._id === product?._id
    );
  const HandleAddToCart = (qu, method) => {
    if (product.paymentType === "both")
      if (paymentMethod === "") {
        toast?.error(
          lang === "en"
            ? "please Select a payment method First "
            : "من فضلك اختر طريقه الدفع اولا"
        );
        return;
      }

    qu.length
      ? addToCart({
        paymentType:
          product.paymentType === "both"
            ? paymentMethod
            : product.paymentType,
        quantity: cartData?.quantity,
        id: cartData?.id,
        qualities: qu,
      })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lang === "en" ? "en" : "ar"}`]);
          if (method === "creatingOrder") navigate("/cart");
        })
        .catch((e) => {
          toast.error(e.data[`error_${lang === "en" ? "en" : "ar"}`]);
        })
      : addToCart({
        paymentType:
          product.paymentType === "both"
            ? paymentMethod
            : product.paymentType,
        quantity: cartData?.quantity,
        id: cartData?.id,
      })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lang === "en" ? "en" : "ar"}`]);
          if (method === "creatingOrder") navigate("/cart");
        })
        .catch((e) => {
          toast.error(e.data[`error_${lang === "en" ? "en" : "ar"}`]);
        });
  };
  const handleAddToCartFunction = (method) => {
    if (method === "creatingOrder") {
      if (!currentUser) {
        toast.error(lang === "en" ? "Login first" : "سجل دخول اولاً");
        return;
      } else {
        const qualitiesAfterDeletePrice = cartData.qualities.map((item) => {
          delete item.price;
          return item;
        });
        HandleAddToCart(qualitiesAfterDeletePrice, "creatingOrder");
        return;
      }
    }

    const qualitiesAfterDeletePrice = cartData.qualities.map((item) => {
      delete item.price;
      return item;
    });
    HandleAddToCart(qualitiesAfterDeletePrice);
  };

  const ratingChanged = (_, rating) => {
    if (currentUser?.email || currentUser?.phone) {
      addRating({ rating, productId }).then((res) => {
        toast.success(res?.data[`success_${lang}`]);
      });
    } else {
      toast.error(
        lang == "en" ? "You Should Login First " : "يجب عليك تسجيل الدخول أولا"
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  useEffect(() => {
    const images = cartData.qualities.map((q) => {
      const images = data?.data.qualitiesImages.map((qi) => {
        const isSelect = qi.qualities.some((qiq) => {
          return qiq.value_en === q.value_en;
        });

        if (isSelect) {
          return qi.image;
        }
        return null;
      });

      return images.filter(Boolean);
    });
    const images2 = images.filter((i) => i.length > 0).map((i) => i[0]);

    if (images2.length) {
      setQimages(images2);
    } else {
      setQimages(product?.images);
    }
  }, [cartData?.qualities]);

  const extraPrice = cartData?.qualities
    .map((q) => {
      const price = data?.data.qualities
        .find((p) => p.key_en === q.key_en)
        ?.values.find((v) => v.value_en === q.value_en)?.price;

      return price;
    })
    .reduce((a, b) => a + b, 0);

  const handleRating = (productId, rating) => {
    if (!currentUser) {
      toast.error(lang === "en" ? "Login first" : "سجل دخول أولاً");
    } else {
      addRating({ productId, rating })
        .unwrap()
        .then((res) =>
          toast.success(lang === "en" ? res.success_en : res.success_ar)
        )
        .catch((e) => {
          const rating = document.querySelector("#rating span");
          console.log(rating, "ratingrating");

          toast.error(lang === "en" ? e.data.error_en : e.data.error_ar);
        });
    }
  };
  const handleDelete = (key) => {
    const qualitiesAfterDelete = cartData.qualities.filter(
      (quality) => quality.key_en !== key
    );
    setCartData({
      ...cartData,
      qualities: qualitiesAfterDelete,
      qualitiesBefore: qualitiesAfterDelete,
    });
  };



  const PaymentType = () => (
    <Box
      sx={{
        marginTop: '40px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}>
      <Typography
        fontFamily={publicFontFamily}
        sx={{
          color: "#693096",
          textAlign: 'start',
          whiteSpace: 'nowrap',
          // width: '20%',
          fontSize: {
            md: "25px",
            sm: '20px',
            xs: '16px'
          }
        }}
      >
        {lang === "en" ? "payment Type:" : "طرق الدفع:"}
      </Typography>
      <Box sx={{
        // width: '80%',
        display: 'flex',
        gap: 1,
      }}>
        <Box>
          <CardMedia
            component={"img"}
            src={Mda}
            sx={{
              border: 1,
              borderColor: "#693096",
              // width: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // height: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // objectFit: "fill",
            }}
          />
        </Box>
        <Box>
          <CardMedia
            component={"img"}
            src={Visa}
            sx={{
              border: 1,
              borderColor: "#693096",
              // width: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // height: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // objectFit: "fill",
            }}
          />
        </Box>
        <Box>
          <CardMedia
            component={"img"}
            src={Master}
            sx={{
              border: 1,
              borderColor: "#693096",
              // width: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // height: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // objectFit: "fill",
            }}
          />
        </Box>
        <Box>
          <CardMedia
            component={"img"}
            src={Apple}
            sx={{
              border: 1,
              borderColor: "#693096",
              // width: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // height: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // objectFit: "fill",
            }}
          />
        </Box>
        <Box>
          <CardMedia
            component={"img"}
            src={Stc}
            sx={{
              border: 1,
              borderColor: "#693096",
              // width: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // height: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // objectFit: "fill",
            }}
          />
        </Box>
        <Box>
          <CardMedia
            component={"img"}
            src={Transfer}
            sx={{
              border: 1,
              borderColor: "#693096",
              // width: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // height: {
              //   xl: 50,
              //   lg: 40,
              //   md: 40,
              //   sm: 30,
              //   xs: 18,
              // },
              // objectFit: "fill",
            }}
          />
        </Box>
      </Box>
    </Box>
  )


  return (
    <Box
      sx={{
        height: isLoading ? "100vh" : "unset",
      }}
    >
      {!isLoading && isSuccess && !isError ? (
        <Box
          sx={{
            mx: "auto",
            p: {
              md: "200px 0 100px",
              xs: "150px 0 50px",
            },
          }}
        >
          <Grid
            container
            sx={{
              p: {
                xs: 1,
                sm: 2,
                md: 2,
              },
              direction: lang === "en" ? "rtl" : "ltr",
              flexDirection: "row-reverse",
              margin: "auto",
              justifyContent: "center",
              marginTop: { xs: "0px", md: "20px" },
            }}
          >
            { }
            <Grid
              item
              xs={12}
              md={11}
              lg={6}
              sx={{ order: { xs: -1, md: -1 } }}
            >
              {product && <ImageSlider product={product} images={qImage} />}
            </Grid>
            <Grid
              item
              xs={12}
              md={11}
              lg={6}
              sx={{
                px: {
                  lg: "35px",
                  md: "25px",
                  xs: "15px",
                },
                textAlign: "end",
                // px: { sm: 0, md: 5 },
                position: {
                  xs: "block",
                  lg: "sticky",
                  xl: "sticky",
                },
                top: {
                  xs: "unset",
                  xl: "0px",
                },
                height: "fit-content",
                padding: "20px",
                direction: lang === "en" ? "ltr !important" : "rtl !important",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    width: '100%',
                    py: "6px",
                    mt: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      color: colors.newMainColor,
                      fontFamily: publicFontFamily,
                      flex: 1,
                      textAlign: 'start',
                      fontSize: {
                        xl: "40px",
                        lg: "35px",
                        md: "25px",
                        sm: '23px',
                        xs: " 16px",
                      },
                      color: colors.main,
                      fontWeight: "bold",
                      color: "#693096",
                    }}
                  >
                    {lang === "en" ? product?.title_en : product?.title_ar}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      flex: 1,
                      fontWeight: "bolder",
                      fontWeight: "bold",
                      fontFamily: publicFontFamily,
                      textAlign: 'center',
                      fontSize: {
                        xl: "27px",
                        lg: "25px",
                        md: "23px",
                        sm: '19px',
                        xs: " 14px",
                      },
                      textDecoration:
                        addedPrice || offPrice ? "line-through" : "none",
                      bgcolor: "#693096",
                      padding: '10px 35px',
                      borderRadius: 10,
                      color: 'white'
                    }}
                  >
                    {
                      product?.offer?.percentage ?
                        Math.abs(product?.finalPrice + (extraPrice - extraPrice * product?.offer?.percentage / 100)).toFixed(2) : Math.abs(product?.finalPrice + extraPrice).toFixed(2)
                    }{" "}
                    {lang === "en" ? "SAR" : "ر.س"}
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="15px"
                  mb={"20px"}
                  sx={{
                    width: '100%',
                    marginTop: "20px",
                    // gap: {
                    //   md: 4,
                    //   sm: 1,
                    // },
                    // paddingX: {
                    //   md: 4,
                    //   sm: 0,
                    // }
                  }}
                >
                  <Stack
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: 1,
                      flexDirection: 'row',
                      flex: 1,
                      gap: 1,
                      "& .react-stars": {
                        flexDirection: "row",
                        display: "flex",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: publicFontFamily,
                        fontSize: {
                          xl: "30px",
                          lg: "25px",
                          md: "20px",
                          xs: " 14px",
                        },
                        display: "inline",
                        color: colors.main,
                        fontWeight: "bold",
                        borderRadius:
                          lang === "en" ? "0 40px 40px 0" : "40px 0 0 40px",
                      }}
                    >
                      {lang === 'ar' ? 'التقييم' : 'rating'}
                    </Typography>

                    <Rating
                      setRating={handleRating}
                      totalRating={data?.data?.rating}
                      id={data?.data?._id}
                    />
                  </Stack>
                  <Box sx={{
                    // alignItems: "center",
                  }}>
                    <Stack
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Typography
                        fontFamily={publicFontFamily}
                        sx={{
                          color: "#693096",
                          fontWeight: 'bold',
                          fontSize: {
                            xl: "30px",
                            lg: "25px",
                            md: "20px",
                            xs: " 14px",
                          },
                        }}
                      >
                        {lang === "en" ? "Quantity" : "الكمية"}
                      </Typography>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          gap: {
                            xl: "30px",
                            lg: "20px",
                            md: "13px",
                            xs: "10px",
                          },
                          width: "100%",
                        }}
                      >
                        <Button
                          sx={{
                            bgcolor: "#fff !important",
                            border: 1,
                            borderColor: "#693096 ",
                            minWidth: 0,
                            width: 0,
                            height: 0,
                            p: {
                              xl: "17px",
                              lg: "15px",
                              md: "13px",
                              xs: " 10px",
                            },
                            borderRadius: "50%",
                          }}
                          onClick={() =>
                            cartData.quantity !== 1
                              ? setCartData({
                                ...cartData,
                                quantity: cartData.quantity - 1,
                              })
                              : undefined
                          }
                        >
                          <RemoveIcon
                            sx={{
                              fontSize: {
                                xl: "30px",
                                lg: "25px",
                                md: "20px",
                                xs: " 14px",
                              },
                              color: "#693096",
                            }}
                          />
                        </Button>
                        <Typography
                          fontFamily={publicFontFamily}
                          variant="h6"
                          fontWeight={"bold"}
                          align={"center"}
                          sx={{
                            fontSize: {
                              xl: "30px",
                              lg: "25px",
                              md: "20px",
                              xs: " 14px",
                            },
                            fontWeight: 'bold',
                            color: "#693096",
                          }}
                        >
                          {cartData.quantity}
                        </Typography>
                        <Button
                          sx={{
                            bgcolor: "#fff !important",
                            border: 1,
                            borderColor: "#693096",
                            minWidth: 0,
                            width: 0,
                            height: 0,
                            p: {
                              xl: "17px",
                              lg: "15px",
                              md: "13px",
                              xs: " 10px",
                            },
                            borderRadius: "50%",
                          }}
                          onClick={() =>
                            setCartData({
                              ...cartData,
                              quantity: cartData.quantity + 1,
                            })
                          }
                        >
                          <AddIcon
                            sx={{
                              fontSize: {
                                xl: "30px",
                                lg: "25px",
                                md: "20px",
                                xs: " 14px",
                              },
                              color: "#693096",
                            }}
                          />
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                <Box
                  // px={5}
                  sx={{
                    width: '100%',
                    margin: "10px 0px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {product?.qualities?.map((quality) => (
                    <Attrs
                      key={quality?._id}
                      colors={{
                        attrKeyColor: colors.attrKeyColor,
                        attrValueColor: colors.attrValueColor,
                        attrValueBgColor: colors.attrValueBgColor,
                        attrValueBorderColor: colors.attrValueBorderColor,
                        attrAciveColors: colors.attrAciveColors,
                      }}
                      product={product}
                      attr={quality}
                      setCartData={setCartData}
                      cartData={cartData}
                    />
                  ))}
                </Box>

                <Stack
                  direction="row"
                  alignItems="center"
                  gap="15px"
                  mt="30px"
                  width={"100%"}
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'flex',

                    },
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    sx={{
                      flex: 1,
                      color: "#693096",
                      borderRadius: "10px",
                      fontFamily: publicFontFamily,
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      borderRadius: "40px",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "#693096",
                      },
                      padding: " 14px",
                    }}
                    onClick={() =>
                      handleAddToCartFunction("creatingOrder")
                    }
                  >
                    {lang === "en" ? "Buy now" : "أشتري الآن"}
                  </Button>

                  <Button
                    sx={{
                      flex: 1,
                      color: "#693096",
                      borderRadius: "10px",
                      fontFamily: publicFontFamily,
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      borderRadius: "40px",
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "#693096",
                      },
                      padding: "10px 20px",
                      width: {
                        xs: "100%",
                        lg: "49%",
                      },
                      padding: "14px",
                    }}
                    // disabled={!checkActivity || productInCart}
                    // disabled={productInCart}
                    onClick={() => handleAddToCartFunction()}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: publicFontFamily,
                      }}
                    >
                      {lang === "en"
                        ? "Add to cart"
                        : "أضف إلي عربة التسوق"}
                    </Typography>

                    <ShoppingCartIcon />

                  </Button>
                </Stack>

                <PaymentType />
                <Box
                  sx={{
                    mt: "20px",
                    width: "100%",
                  }}
                >
                  <Typography
                    fontFamily={publicFontFamily}
                    sx={{
                      color: "#693096",
                      textAlign: lang === "en" ? "left" : "right",
                      fontSize: {
                        md: "25px",
                        sm: '20px',
                        xs: '16px'
                      }
                    }}
                  >
                    {lang === "en" ? "The Description:" : "الوصف:"}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: publicFontFamily,
                      fontSize: "20px",
                      color: colors.main,
                      fontWeight: "bold",
                      // width: 0.7,
                      textAlign: lang === "en" ? "left" : "right",
                      color: "#693096",
                      "&  *": {
                        textAlign:
                          lang === "en"
                            ? "left !important"
                            : "right !important",

                        color: "#693096 !important",
                      },
                      "& img": {
                        display: "none",
                      },
                    }}
                    className="my-3 lead"
                    dangerouslySetInnerHTML={{
                      __html:
                        lang === "en"
                          ? product?.description_en.slice(0, 2000)
                          : product?.description_ar.slice(0, 2000),
                    }}
                  />
                  {/* <Stack
                    sx={{
                      flexDirection: {
                        xs: "column",
                      },
                      width: {
                        xl: 1200,
                        lg: 1000,
                        xs: "100%",
                      },
                      alignItems: "flex-start",
                    }}
                  >
                    {product?.priceAfterDiscount > 0 &&
                      product?.priceAfterDiscount !==
                      product?.priceBeforeDiscount && (
                        <Box
                          component={"span"}
                          sx={{
                            color: "#693096",
                            textDecoration: `line-through 1px solid `,
                            fontSize:
                              product.priceAfterDiscount > 0
                                ? "0.7rem"
                                : "1.5rem",
                          }}
                        >
                          {product?.offer?.percentage ? Math.abs(product?.priceBeforeDiscount + (extraPrice - extraPrice * product?.offer?.percentage / 100)).toFixed(2) :
                            Math.abs(product?.priceBeforeDiscount + extraPrice).toFixed(2)}
                          {lang === "en" ? "SAR" : "ر.س"}
                        </Box>
                      )}
                    <Stack
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "50%",
                        },
                      }}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={1}
                        color={"#693096"}
                      >
                        <Typography
                          fontFamily={publicFontFamily}
                          sx={{
                            textAlign: lang === "en" ? "left" : "right",
                            fontSize: "20px",
                            my: "10px",
                          }}
                        >
                          {lang === "en" ? "payment Type:" : "طرق الدفع:"}
                          <br />
                        </Typography>

                        <Typography>
                          {product?.paymentType !== "both"
                            ? product?.paymentType === "online"
                              ? lang === "en"
                                ? " online"
                                : "اونلاين"
                              : lang === "en"
                                ? "cash"
                                : "كاش"
                            : null}
                        </Typography>
                      </Stack>

                      {product?.paymentType === "both" ? (
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap="15px"
                          mt="30px"
                          sx={{
                            width: "100% !important",
                          }}
                        >
                          <Button
                            sx={{
                              borderRadius: "10px",
                              bgcolor: `transparent !important`,
                              fontFamily: publicFontFamily,
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              p: "10px",
                              borderRadius: "40px",
                              color:
                                paymentMethod === "online" ? "#fff" : "#693096",
                              bgcolor:
                                paymentMethod === "online" ? "#693096" : "",
                              "&:hover": {
                                color: "#fff",
                                bgcolor: "#693096",
                              },
                              fontWeight: "bold",
                              padding: "10px 20px",
                              width: "49%",
                              padding: " 14px",
                            }}
                            onClick={() => setPaymentMethod("online")}
                          >
                            {lang === "en" ? "online" : "    اونلاين"}
                          </Button>
                          <Button
                            sx={{
                              borderRadius: "10px",
                              bgcolor: `transparent !important`,
                              fontFamily: publicFontFamily,
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              p: "10px",
                              borderRadius: "40px",
                              color:
                                paymentMethod === "cash" ? "#fff" : "#693096",
                              bgcolor:
                                paymentMethod === "cash" ? "#693096" : "#fff",
                              "&:hover": {
                                color: "#fff",
                                bgcolor: "#693096",
                              },
                              fontWeight: "bold",
                              padding: "10px 20px",

                              width: "49%",
                              padding: " 14px",
                            }}
                            onClick={() => setPaymentMethod("cash")}
                          >
                            {lang === "en" ? "Pay On Shop" : " الدفع في المتجر"}
                          </Button>
                        </Stack>
                      ) : null}

                      <Typography
                        fontFamily={publicFontFamily}
                        sx={{
                          color: "#693096",
                          margin: "10px 0px",
                          textAlign: lang === "en" ? "left" : "right",
                        }}
                      >
                        {product?.paymentType === "both" && paymentMethod == ""
                          ? paymentMethod === ""
                            ? lang === "en"
                              ? "choose Payment Type"
                              : "اختر نوع الدفع"
                            : ""
                          : ""}
                      </Typography>
                    </Stack>
                  </Stack> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Loader />
      )
      }
      <SimilarProduct productId={product?.id} id={categoryId} />
      <ProductComments colors={colors.commentsColors} productId={productId} />

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          zIndex: 100,
          bgcolor: 'lightgrey',
          gap: 4,
          padding: '5px 40px',
          width: '100%',
          height: '50px',
          display: { xs: 'flex', md: 'none' },
        }}>
        <Button
          sx={{
            color: "#693096",
            bgcolor: "#fff",
            "&:hover": {
              color: "#fff",
              bgcolor: "#693096",
            },
            fontSize: '10px',
            borderRadius: "10px",
            fontFamily: publicFontFamily,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "40px",
            fontWeight: "bold",
            padding: "10px 20px",
            width: "50%",
            padding: " 14px",
          }}
          onClick={() =>
            handleAddToCartFunction("creatingOrder")
          }
        >
          {lang === "en" ? "Buy now" : "أشتري الآن"}
        </Button>

        <Button
          sx={{
            color: "#693096",
            bgcolor: "#fff",
            "&:hover": {
              color: "#fff",
              bgcolor: "#693096",
            },
            borderRadius: "10px",
            fontFamily: publicFontFamily,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "40px",
            width: "50%",
            padding: "14px",
            width: "50%",
          }}
          onClick={() => handleAddToCartFunction()}
        >
          <Typography
            component="span"
            sx={{
              fontSize: '10px',
              fontWeight: "bold",
              fontFamily: publicFontFamily,
            }}>
            {lang === "en"
              ? "Add to cart"
              : "أضف إلي عربة التسوق"}
          </Typography>

          <ShoppingCartIcon />
        </Button>
      </Box>
    </Box >
  );
}

export default SingleProduct;


