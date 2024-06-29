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
} from "@mui/material";
import Popover from "@mui/material/Popover";

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
import Similarproduct from "./similarproduct/index";
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
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        {attr?.values?.map((val) => {
          return (
            <Button
              sx={{
                color: isSelectedAtt(val) ? "#fff" : "#693096",
                bgcolor: isSelectedAtt(val) ? "#693096" : "#fff",
                borderColor: `#ddd !important`,
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
  const colors = Colors;

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
            width: 1,
            p: {
              md: "200px 0 100px",
              xs: "150px 0 50px",
            },
          }}
        >
          {/* {!product ? (
        <Stack
          sx={{
            height: "66vh",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: colors.newMainColor,
            }}
          />
        </Stack>
      ) : */}

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
              lg={5.5}
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
                textAlign: "end",
                px: { sm: 0 },
                margin: "10px",
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
                padding: "20px  ",
                direction: lang === "en" ? "ltr !important" : "rtl !important",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: colors.newMainColor,
                    fontFamily: publicFontFamily,
                    fontSize: {
                      xl: "40px",
                      lg: "35px",
                      md: "25px",
                      xs: " 14px",
                    },
                    mt: "20px",
                    display: "inline",
                    color: colors.main,
                    fontWeight: "bold",
                    py: "6px",
                    px: {
                      lg: "35px",
                      md: "25px",
                      xs: "15px",
                      color: "#693096",
                    },
                    borderRadius:
                      lang === "en" ? "0 40px 40px 0" : "40px 0 0 40px",
                  }}
                >
                  {lang === "en" ? product?.title_en : product?.title_ar}
                </Typography>
                <Box
                  sx={{
                    px: {
                      lg: "35px",
                      md: "25px",
                      xs: "15px",
                    },
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: publicFontFamily,
                      fontSize: "20px",
                      mt: "20px",
                      color: colors.main,
                      fontWeight: "bold",
                      width: 0.7,
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

                  <Stack
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
                    <Box
                      sx={{
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
                    {/* <Stack
                direction="row"
                justifyContent={'flex-start'}
                width={'100%'}
                spacing={2}
                height={60}
                className='chips'

                sx={{
                  justifyContent: 'flex-start',
                  overflowX:'auto',
                  overflowY:'hidden',
                  transition:'0.5s all ease-in-out' ,
                  postition:'sticky',
                  right:'0px'
                  // borderTop:'1px solid #ddd'
                }}
              >
                {cartData?.qualities?.map((chip) => {
                   
                   return (
                    <>
                      {chip?.value_en?.startsWith('#') ? (
                        <Chip
                          //  label={`${lang === 'en'
                          //  ? 'color' : 'اللون'}`}
                          // key={chip?.key_en}
                          variant="outlined"
                          sx={{
                            margin: '10px !important',
                            padding: 1,
                            visibility: 'visible',
                            width: 'fit-content',
                            borderRadius: '0px !important',
                            border: `0px`,
                            color: '#fff !important',
                            height: '28px !important',
                            'svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiChip-deleteIcon.MuiChip-deleteIconMedium.MuiChip-deleteIconColorDefault.MuiChip-deleteIconOutlinedColorDefault.css-i4bv87-MuiSvgIcon-root':
                              {
                                color: '#fff',
                                margin: '10px auto',
                                width: '20px',
                                height: '20px',
                                top: '-22px',
                                left: '-13px',
                              },
                            position: 'relative',
                            overflow: 'visible',
                            '.css-1jzq0dw-MuiChip-label': {
                              display: 'none',
                            },
                            background: `${chip?.value_en} !important`,
                            borderRadius: '0px !important',

                            "& .css-meyyna-MuiButtonBase-root-MuiChip-root":{
                              border:'0px !important'
                            }
                          }}
                          onDelete={() => handleDelete(chip?.key_en)}
                        ></Chip>
                      ) : (
                        <Chip
                          label={`${
                            lang === 'en' ? chip.value_en : chip.value_ar
                          }`}
                          key={chip?.key_en}
                          variant="outlined"
                          sx={{
                            margin: '10px !important',
                            padding: 1,
                            visibility: 'visible',
                            width: 'fit-content',
                            borderRadius: '0px !important',
                            border: '0px !important',
                            color: '#000 !important',

                            'svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiChip-deleteIcon.MuiChip-deleteIconMedium.MuiChip-deleteIconColorDefault.MuiChip-deleteIconOutlinedColorDefault.css-i4bv87-MuiSvgIcon-root':
                              {
                                color: 'black',
                              },
                            border: '1px solid  !important',
                            borderColor: `#5c5c5c !important`,
                            borderRadius: '0px !important',
                            transition:'0.5s all ease'
                          }}
                          onDelete={() => handleDelete(chip?.key_en)}
                        />
                      )}
                    </>
                  )
                })}
              </Stack> */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap="20px"
                      mt="15px"
                      mb={"20px"}
                    >
                      <div className="my-3">
                        <Typography
                          component="span"
                          sx={{
                            fontWeight: "bolder",

                            fontWeight: "bold",
                            fontFamily: publicFontFamily,
                            fontSize: {
                              xl: "25px",
                              lg: "27px",
                              md: "25px",
                              xs: "23px",
                            },
                            textDecoration:
                              addedPrice || offPrice ? "line-through" : "none",
                            color: "#693096",
                          }}
                        >
                          {
                            console.log("product :::: ", product?.offer?.percentage)
                          }
                          {
                            product?.offer?.percentage ?
                              Math.abs(product?.finalPrice + (extraPrice - extraPrice * product?.offer?.percentage / 100)).toFixed(2) : Math.abs(product?.finalPrice + extraPrice).toFixed(2)
                          }{" "}
                          {lang === "en" ? "SAR" : "ر.س"}
                        </Typography>
                      </div>

                      <Stack
                        sx={{
                          "& .react-stars": {
                            flexDirection: "row",
                            display: "flex",
                          },
                        }}
                      >
                        {console.log(data?.data?.rating, "ratingsda")}
                        {/* <Stack
                   sx={{
                    flexDirection:'row-reverse',
                    display:'flex'
                   }}
                   component={ReactStars}
                  count={5}
                   onChange={ (newValue) => {

                    handleRating(data.data._id, newValue);
                  }}      
                  id={'rating'}
                  size={30}
                  // isHalf={true}
                  // value={Math.floor(data?.data?.rating)}
                  // fullIcon={<i className="fa fa-star"></i>}
                  // halfIcon={<i className="fa fa-star-half-alt"></i>}
                  emptyIcon={<i className="far fa-star"></i>}
                  color2="#ffd700"
                  color1="gray"
                /> */}

                        <Rating
                          setRating={handleRating}
                          totalRating={data?.data?.rating}
                          id={data?.data?._id}
                        />
                      </Stack>
                    </Stack>
                    {console.log(product)}
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
                        sx={{
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "20px",
                        }}
                      >
                        <Typography
                          fontFamily={publicFontFamily}
                          sx={{
                            color: "#693096",
                            fontSize: "25px",
                          }}
                        >
                          {lang === "en" ? "Quantity" : "الكميه"}
                        </Typography>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: 0.6,
                            gap: "50px",
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
                              p: "13px",
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
                              p: "13px",
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
                                color: "#693096",
                              }}
                            />
                          </Button>
                        </Stack>
                      </Stack>
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
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap="15px"
                        mt="30px"
                        width={"100%"}
                        sx={{
                          width: "100% !important",
                        }}
                      >
                        <Button
                          sx={{
                            color: "#693096",
                            borderRadius: "10px",
                            fontFamily: publicFontFamily,
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            p: "10px",
                            borderRadius: "40px",
                            fontWeight: "bold",
                            "&:hover": {
                              color: "#fff",
                              bgcolor: "#693096",
                            },
                            padding: "10px 20px",
                            width: "49%",
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
                            borderRadius: "10px",
                            fontFamily: publicFontFamily,
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            p: "10px",
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
                              color: productInCart ? "#fff" : colors.main,

                              fontWeight: "bold",
                              fontFamily: publicFontFamily,
                            }}
                          >
                            {lang === "en"
                              ? "Add to cart"
                              : "أضف إلي عربة التسوق"}
                          </Typography>

                          <i className="fa-solid fa-cart-shopping mx-2"></i>
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Loader />
      )}

      <Similarproduct productId={product?.id} id={categoryId} />

      <ProductComments colors={colors.commentsColors} productId={productId} />
    </Box>
  );
}

export default SingleProduct;
