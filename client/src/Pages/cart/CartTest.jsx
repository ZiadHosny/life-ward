import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  CardMedia,
  Paper,
  Table,
  tooltipClasses,
  Tooltip,
  Chip,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTranslation } from "react-i18next";
import Popover from "@mui/material/Popover";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { calculateProductsAfterDiscount } from "./utlts/calculateAllProductsAfterDiscount";
import {
  useClearCartMutation,
  useDeleteFromCartMutation,
  useGetAllCartsQuery,
  useUpdateQuantityMutation,
  useCouponQueryMutation,
  useAddToCartMutation,
  useLazyGetAllCartsQuery,
} from "../../APIs/cartApi";
import { ProductDiscount } from "./utlts/ProductDiscountBoolean";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, imageBaseUrl } from "../../components/service";
import { setCart } from "../../APIs/cartSlice";
import { useSubmitPointsMutation } from "../../APIs/pointsApi";
import styled from "@emotion/styled";
import Loader from "../../components/loader/loader";
import { openDialog } from "../../APIs/dialogSlice";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    textAlign: "center",
    background: "#fff",
    color: "#333",
    padding: "10px",
    border: "1px solid #eee",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
});
const CartTest = () => {
  const [_, { language }] = useTranslation();
  const [getCart, { data, isSuccess, isError, isLoading }] =
    useLazyGetAllCartsQuery();
  const navigate = useNavigate();
  const [deleteFromCart] = useDeleteFromCartMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
  const [clearCart] = useClearCartMutation();
  const [cartTotalPrice, setCartPice] = useState(0);
  const dispatch = useDispatch();
  const [fullCart, setFullCart] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [couponPrice, setTotalCouponPrice] = useState(0);
  const [, { language: lng }] = useTranslation();
  const [addToCart] = useAddToCartMutation();

  //new Fekr

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      setFullCart([
        ...data?.data?.cashItems?.items,
        ...data?.data?.onlineItems.items,
      ]);
    }
  }, [data]);

  const cartPrice = (total, quantity, price) => {
    const pricePlusTax = total / quantity;
    const tax = pricePlusTax - price;
    return tax;
  };

  useEffect(() => {
    isSuccess &&
      setFullCart([
        ...data?.data?.cashItems?.items,
        ...data?.data?.onlineItems.items,
      ]);
  }, [data?.data?.cashItems?.items, data?.data?.onlineItems.items]);

  const handlePaymentClick = () => {
    console.log("asadsadsadsadsadsadsad");
    if (currentUser.role === "guest") {
      toast.error(
        lng === "en"
          ? "You Have To Sign In First To Submit Payment"
          : "يجب عليك تسجيل الدخول اولا لاتمام عمليه الدفع"
      );
      return;
    }

    if (
      ["rootAdmin", "subAdmin", "adminA", "adminB", "adminC"].includes(
        currentUser.role
      )
    ) {
      toast.error(
        lng === "en"
          ? "You Have To Sign In With user Account"
          : "يجب عليك تسجيل الدخول بحساب مستخدم اولا لاتمام عمليه الدفع"
      );
      return;
    }

    dispatch(openDialog())

    navigate("/checkout");
  };

  const [coupon, setCoupon] = useState("");
  const [SubmitCouponA, { isError: ErrorCoupon, isLoading: isLoadingC }] =
    useCouponQueryMutation();
  const [addPoints, { isLoading: PointsLoading, isError: PointsError }] =
    useSubmitPointsMutation();
  const [couponAdded, setCouponAdded] = useState({
    couponEnter: "",
    persentage: 0,
    products: [],
    total: 0,
  });

  useEffect(() => {
    getCart();
  }, [data]);
  const handleDelete = () => {
    setCouponAdded((prev) => ({
      ...prev,
      couponEnter: "",
      persentage: 0,
      products: [],
      total: 0,
    }));
  };
  const CalculatePercentage = (total, percentage) => {
    return total - (total * percentage) / 100;
  };
  const HandleApiCart = (item, value) => {
    const DeletedId = item?.properties?.map((obj) => {
      const { _id, ...cleanedObj } = obj;
      return cleanedObj;
    });
    if (item?.properties?.length) {
      addToCart({
        quantity: value,
        id: item.product.id,
        paymentType: item?.paymentType,
        qualities: DeletedId,
      })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lng === "en" ? "en" : "ar"}`]);
        })
        .catch((e) =>
          toast.error(e.data[`error_${lng === "en" ? "en" : "ar"}`])
        );
    } else {
      addToCart({
        quantity: value,
        id: item.product.id,
        paymentType: item?.paymentType,
      })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lng === "en" ? "en" : "ar"}`]);
        })
        .catch((e) =>
          toast.error(e.data[`error_${lng === "en" ? "en" : "ar"}`])
        );
    }
  };
  useEffect(() => {
    const couponData = JSON.parse(localStorage.getItem("couponData"));
    if (couponData && Object.keys(couponData).length)
      setCouponAdded(couponData);
  }, []);
  const SubmitPoints = () => {
    if (currentUser && currentUser.points) {
      addPoints(currentUser.id)
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lng === "en" ? "en" : "ar"}`]);
          getCart()
            .unwrap()
            .then((res) => { });
        })
        .catch((e) => {
          toast.error(e.data[`error_${lng === "en" ? "en" : "ar"}`]);
        });
    } else {
      toast.error(
        lng === "en"
          ? `There 's No Points To Submit `
          : `ليست هناك نقاط للاضافه بعد `
      );
    }
  };
  useEffect(() => {
    if (couponAdded.couponEnter !== "") {
      const { persentage, products } = couponAdded;
      if (isSuccess && !isLoading) {
        const {
          cashItems: { items: cash },
          onlineItems: { items: online },
        } = data?.data;

        calculateProductsAfterDiscount(
          online,
          cash,
          products,
          persentage,
          (total) => {
            setCouponAdded({
              ...couponAdded,
              total,
            });

            setTotalCouponPrice(total);
          }
        );
      }
    }
  }, [data?.data, couponAdded.couponEnter]);
  const SubmitCoupon = (e) => {
    e.preventDefault();
    if (coupon !== "") {
      SubmitCouponA(coupon)
        .unwrap()
        .then((res) => {
          setCouponAdded({
            ...couponAdded,
            couponEnter: coupon,
            persentage: res?.data?.discount,
            products: res?.data?.productsCouponsIds,
          });
          setCoupon("");

          toast.success(
            lng === "en" ? "coupon added succefully" : "تم اضافه الكوبون بنجاح"
          );
        })
        .catch((e) => {
          toast.error(e?.data[`error_${lng === "en" ? "en" : "ar"}`]);
        });
    }
  };
  useEffect(() => {
    localStorage.setItem("couponData", JSON.stringify(couponAdded));
  }, [couponAdded.couponEnter]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const OpenAnchor = Boolean(anchorEl);
  const id = OpenAnchor ? "simple-popover" : undefined;

  useEffect(() => {
    dispatch(setCart(cartTotalPrice));
  }, [cartTotalPrice]);
  const deleteItem = (product) => {
    deleteFromCart(product._id).then((res) =>
      toast.success(res?.data[`success_${language}`])
    );
  };
  const inc = (item) => {
    updateQuantity({
      product: item.product._id,
      Quantity: item.Quantity + 1,
    }).then((res) => toast.success(res?.data[`success_${language}`]));
  };
  const dec = (item) => {
    updateQuantity({
      product: item.product._id,
      Quantity: item.Quantity - 1,
    }).then((res) => toast.success(res?.data[`success_${language}`]));
  };
  const { currentUser } = useSelector((state) => state);

  return (
    <Box
      sx={{
        position: "relative",
        marginBottom: "100px",
        marginTop: { md: "200px", sm: "0px" },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 400,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "red",
              fontFamily: publicFontFamily,
            }}
            variant="h5"
          >
            {language === "en" ? "Cart is empty" : "السلة فارغة"}
          </Typography>
        </Stack>
      ) : (
        <Grid
          container
          sx={{
            width: {
              lg: 0.9,
              xs: 0.95,
            },
            mx: "auto",
          }}
        >
          <Grid item lg={8} xs={12}>
            {fullCart?.map((item, idx) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    width: 0.9,
                    mx: "auto",
                    mt: "30px",
                    display: {
                      md: "flex",
                      xs: "block",
                    },
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    borderBottom: 1,
                    borderColor: colors.main,
                    py: "40px",
                    gap: "4%",
                  }}
                >
                  <CardMedia
                    component={"img"}
                    src={`${imageBaseUrl}/${item?.product?.images[0]}`}
                    onClick={() =>
                      navigate(
                        `/productDetails/${item?.product?._id
                        }/${item.product.title_en.replace(/ /g, "-")}`
                      )
                    }
                    sx={{
                      height: 300,
                      width: 300,
                      cursor: "pointer",
                      borderRadius: "200px 200px 0 0",
                      mx: {
                        md: 0,
                        xs: "auto",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: {
                        md: "calc(100% - 300px)",
                        xs: 1,
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="space-between"
                      sx={{
                        mt: "40px",
                      }}
                    >
                      <Stack
                        flex={1}
                        direction="column"
                        sx={{
                          gap: { lg: 4, md: 2, xs: 1 },
                        }}
                      >
                        <Typography
                          sx={{
                            color: colors.main,
                            fontWeight: "bold",
                            fontFamily: publicFontFamily,
                            fontSize: {
                              lg: "22px",
                              md: "20",
                              xs: "19px",
                            },
                            width: 0.75,
                            wordBreak: "break-word",
                            lineHeight: "30px",
                          }}
                        >
                          {item.product[`title_${language}`]}
                        </Typography>
                        <Typography
                          sx={{
                            color: colors.main,
                            fontWeight: "600",
                            fontFamily: publicFontFamily,
                            fontSize: {
                              lg: "16px",
                              md: "14px",
                              xs: "12px",
                            },
                            width: 0.75,
                            wordBreak: "break-word",
                            lineHeight: "30px",
                          }}
                        >
                          {item.paymentType === "online"
                            ? language === "en"
                              ? "online"
                              : "اونلاين"
                            : language === "en"
                              ? "On Shop"
                              : "الدفع في المتجر"}
                        </Typography>
                      </Stack>
                      <Stack sx={{ margin: "10px 0px" }}>
                        {ProductDiscount(item) &&
                          couponAdded.couponEnter !== "" ? (
                          <Stack
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                              padding: "2px 7px",
                              background: "#693096!important",
                              borderRadius: "10px",
                              fontSize: " 13px",
                              color: " #fff",
                              width: "fit-content",
                              textWrap: "nowrap",
                              borderRadius: "3px",
                            }}
                          >
                            <Stack
                              component={"span"}
                              sx={{ margin: "0px 10px" }}
                            >
                              {lng === "en" ? "discount" : "نسبه الخصم"}
                            </Stack>
                            <Stack component={"span"}>
                              {couponAdded?.persentage}%
                            </Stack>
                          </Stack>
                        ) : null}
                      </Stack>
                      <Typography
                        sx={{
                          color: colors.main,
                          fontWeight: "bold",
                          fontFamily: publicFontFamily,
                          fontSize: {
                            lg: "22px",
                            md: "20",
                            xs: "19px",
                          },
                          width: 140,
                          textAlign: language === "en" ? "right" : "left",
                        }}
                      >
                        {/* {handleCalculatePriceForEachItemInCart(item)} */}
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "13px",
                              md: "22px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              color: colors.priceAfter,
                              fontSize: "1.2rem",
                              // fontWeight: 'bold',
                              my: 1,
                            }}
                          >
                            <Box component={"span"} sx={{ mx: 0.5 }}>
                              { }
                            </Box>
                            {couponAdded?.couponEnter !== "" ? (
                              <>
                                {console.log(item, "asdsaddasssss")}
                                {ProductDiscount(item) ? (
                                  <>
                                    {(
                                      item?.totalWithoutShipping -
                                      item?.totalWithoutShipping *
                                      (couponAdded?.persentage / 100)
                                    ).toFixed(2)}
                                  </>
                                ) : (
                                  <>{(item?.totalWithoutShipping).toFixed(2)}</>
                                )}
                              </>
                            ) : (
                              <> {(item?.totalWithoutShipping).toFixed(2)}</>
                            )}
                          </Box>

                          {item.product.priceAfterDiscount > 0 &&
                            item?.product?.priceAfterDiscount !==
                            item?.product?.priceBeforeDiscount && (
                              <Box
                                component={"span"}
                                sx={{
                                  color: colors.priceBefore,
                                  textDecoration: `line-through 1px solid `,
                                  fontSize:
                                    item.product.priceAfterDiscount > 0
                                      ? "0.7rem"
                                      : "1.5rem",
                                }}
                              >
                                {(
                                  item.product.priceBeforeDiscount *
                                  item?.quantity
                                ).toFixed(2)}
                              </Box>
                            )}
                        </Typography>

                        {language === "en" ? "SAR" : "ر.س"}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        mt: "40px",
                      }}
                    >
                      {/* <Box
               sx={{
                 color: colors.main,
                 fontWeight: "bold",
                 fontFamily: publicFontFamily,
                 fontSize: {
                   lg: "22px",
                   md: "20",
                   xs: "19px",
                 },
                 wordBreak: "break-word",
               }}
               dangerouslySetInnerHTML={{
                 __html: item.product[`description_${language}`],
               }}
             /> */}
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        mt: "40px",
                      }}
                    >
                      <Stack
                        direction="row-reverse"
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap="15px"
                      >
                        <AddIcon
                          disabled={item?.quantity === 1}
                          sx={{
                            cursor: "pointer",
                            color: colors.main,
                            transform: "scale(1.2)",
                            transition: "all 0.2s",
                            border: `1px solid ${colors.main}`,
                            borderRadius: "50%",
                            "&:active": {
                              transform: "scale(1)",
                            },
                          }}
                          onClick={() => {
                            HandleApiCart(item, item?.quantity + 1);
                          }}
                        />
                        <Typography
                          fontFamily={publicFontFamily}
                          variant="h6"
                          fontWeight={"bold"}
                          align={"center"}
                          sx={{
                            color: colors.main,
                            fontWeight: "bold",
                          }}
                        >
                          {item?.quantity}
                        </Typography>

                        <RemoveIcon
                          disabled={item?.quantity === 1}
                          sx={{
                            cursor: "pointer",
                            color: colors.main,
                            transform: "scale(1.2)",
                            transition: "all 0.2s",
                            border: `1px solid ${colors.main}`,
                            borderRadius: "50%",
                            "&:active": {
                              transform: "scale(1)",
                            },
                          }}
                          onClick={() => {
                            if (item?.quantity === 1) {
                              return;
                            }

                            HandleApiCart(item, item?.quantity - 1);
                          }}
                        />
                      </Stack>
                      <DeleteOutlineOutlinedIcon
                        sx={{
                          color: colors.main,
                          fontSize: "30px",
                          transition: "all 0.2s",
                          cursor: "pointer",

                          "&:active": {
                            transform: "scale(0.9)",
                          },
                        }}
                        onClick={() => deleteItem(item.product)}
                      />
                    </Stack>
                  </Box>
                </Box>
              );
            })}
          </Grid>
          <Grid item lg={4} xs={12}>
            <Box
              sx={{
                width: {
                  lg: 0.9,
                  xs: 1,
                },
                mx: "auto",
                position: "relative",
                // zIndex:5555,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 1,
                  // height: 300,
                  top: 0,
                  left: 0,
                }}
              >
                <Box
                  sx={{
                    // position: {
                    //   lg: "fixed",
                    //   xs: "relative",
                    // },
                    // width: {
                    //   lg: 0.27,
                    //   xs: 1,
                    // },
                    position: "relative",
                    width: 1,
                    mt: {
                      lg: 0,
                      xs: "30px",
                    },
                    // height: 300,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#F5F2F8",
                      pb: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontFamily: publicFontFamily,
                        fontWeight: "bolder",
                        p: "20px",
                        borderBottom: 1,
                        borderColor: colors.main,
                        color: colors.main,
                      }}
                    >
                      {language === "en" ? "Sincere request" : "ملخص الطلب"}
                    </Typography>

                    <Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "100%",
                            display: "flex",
                            " flex-direction": "column",
                            padding: "0px 10px",
                          }}
                        >
                          <form
                            onSubmit={(e) => SubmitCoupon(e)}
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                              width: "100%",
                              margin: "10px auto",
                            }}
                          >
                            <input
                              label="coupon"
                              value={coupon}
                              className="couponInput"
                              style={{
                                padding: "13px",
                                height: "30px",
                                border: "1px solid #ddd ",
                                padding: "10px",
                                background: "transparent",
                                outline: "none",
                                marginRight: "5px",
                                marginLeft: "3px",
                                height: "19px !IMPORTANT",
                                width: "100% !important",
                              }}
                              placeholder={
                                lng === "en" ? "discount code" : "كود الخصم"
                              }
                              onChange={(e) => setCoupon(e.target.value)}
                            ></input>
                            <CustomWidthTooltip
                              title={
                                data?.data?.isPointUsed
                                  ? lng === "en"
                                    ? "You can't use coupons because you have already used Your Points "
                                    : " لا يمكنك استخدام كوبون لانك استخدمت نقاطك بالفعل "
                                  : ""
                              }
                              sx={{
                                background: "#fff !important",
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                  height: "39px",
                                  overflow: "hidden",
                                  width: "27%",
                                  "margin-right": "10px",
                                }}
                              >
                                <Button
                                  sx={{
                                    border: "1px solid #ddd",
                                    padding: { xs: "5px", sm: "10px" },
                                    height: "39px",

                                    background: "#693095",
                                    color: `${colors?.button} !important`,
                                    transition: "0.7s all ease-in-out",
                                    fontSize: { xs: "10px", sm: "18px" },
                                    "&:hover": {
                                      background: colors?.buttonBg,
                                      opacity: "0.7",
                                    },
                                    width: "100% !important",
                                    margin: { xs: 0 },
                                    borderRadius: 0,
                                    color: "#fff",
                                  }}
                                  disabled={
                                    data?.data?.couponUsed ||
                                    data?.data?.isPointUsed ||
                                    isLoadingC
                                  }
                                  type={"submit"}
                                >
                                  {lng === "en" ? "submit" : "موافق"}
                                </Button>
                              </span>
                            </CustomWidthTooltip>
                          </form>
                        </Box>
                        <Box
                          sx={{
                            padding: "10px",
                          }}
                        >
                          {couponAdded.couponEnter !== "" ? (
                            <Chip
                              label={couponAdded.couponEnter}
                              sx={{
                                padding: "10px",
                                background: "#693095",
                                margin: "10px auto",
                                color: "#fff",
                                borderRadius: "0px !important",
                                "& > .MuiSvgIcon-root": {
                                  color: "#fff !important",
                                },
                              }}
                              onDelete={handleDelete}
                              disabled={data?.data?.couponUsed}
                            />
                          ) : null}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            direction: lng === "en" ? "rtl" : "ltr",
                            padding: "8px",
                          }}
                        >
                          {data?.data?.couponUsed ? (
                            <>
                              {lng === "en"
                                ? "You Already Have Used coupon For this cart "
                                : "تم  استخدام الكوبون في هذه العربه"}
                            </>
                          ) : null}
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              fontSize: {
                                xs: "13px",
                                md: "25px",
                              },
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              {currentUser?.points}
                              <HelpOutlineIcon
                                sx={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "10px",
                                  cursor: "pointer",
                                }}
                                aria-describedby={id}
                                type="button"
                                onClick={handleClick}
                              />
                            </span>
                            {lng === "en" ? "Your Points" : "النقاط"}
                          </Typography>

                          <CustomWidthTooltip
                            title={
                              data?.data?.couponUsed ||
                                couponAdded?.couponEnter !== ""
                                ? lng === "en"
                                  ? "You Have To Delete the coupon To Use Your Points"
                                  : "يجب حذف الكوبون حتي تتمكن من استخدام نقاطك"
                                : ""
                            }
                            sx={{
                              background: "#fff !important",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              {data?.data?.isPointUsed ? null : (
                                <Button
                                  disabled={
                                    data?.data?.couponUsed ||
                                    couponAdded?.couponEnter !== "" ||
                                    data?.data?.isPointUsed
                                  }
                                  sx={{
                                    m: 1,
                                    border: "1px solid #ddd",
                                    padding: "10px",
                                    height: "40px",
                                    margin: "10px auto",
                                    color: "#693096 !important",
                                    background: "#69309666",
                                    color: `${colors?.button} !important`,
                                    transition: "0.7s all ease-in-out",
                                    width: "100%",
                                    borderRadius: 0,

                                    "&:hover": {
                                      background: colors?.buttonBg,
                                      opacity: "0.7",
                                    },
                                  }}
                                  onClick={SubmitPoints}
                                >
                                  {lng === "en"
                                    ? "Use Your  Points "
                                    : "استخدم نقاطك"}
                                </Button>
                              )}
                            </div>
                          </CustomWidthTooltip>

                          <Popover
                            id={id}
                            open={OpenAnchor}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            disableScrollLock
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                              padding: "3px",
                            }}
                          >
                            <Typography
                              sx={{
                                p: 2,
                                textTransform: "capitalize",
                                fontSize: {
                                  xs: "13px",
                                  width: "fit-content",
                                },
                              }}
                            >
                              {lng === "en" ? (
                                <>
                                  {" "}
                                  Those Points Are calculated in checkout for
                                  every succefully purchesed products{" "}
                                </>
                              ) : (
                                <>
                                  هذه النقاط يتم احتسابها لكل عمليه شراء ناجحه
                                </>
                              )}
                            </Typography>
                          </Popover>

                          <Stack
                            component={"span"}
                            sx={{
                              margin: "3px",
                              textAlign: "right",
                              color: "#000",
                              fontWeight: "",
                            }}
                          >
                            {data?.data?.isPointUsed ? (
                              <>
                                {lng === "en"
                                  ? "Your Points Have been Used   "
                                  : " تم استخدام نقاطك "}
                              </>
                            ) : null}
                          </Stack>
                        </Box>
                      </Box>
                    </Box>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        width: 0.9,
                        mx: "auto",
                        mt: "40px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: colors.main,
                          fontWeight: "bold",
                          fontFamily: publicFontFamily,
                          fontSize: {
                            md: "25px",
                            xs: "22px",
                          },
                        }}
                      >
                        {language === "en" ? "Total amount" : " المجموع الكلي"}
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.main,
                          fontWeight: "bold",
                          fontFamily: publicFontFamily,
                          fontSize: {
                            md: "25px",
                            xs: "22px",
                          },
                        }}
                      >
                        {couponAdded?.couponEnter !== ""
                          ? couponPrice.toFixed(2)
                          : data?.data?.totalPrice?.toFixed(2)}
                        <span
                          style={{
                            margin: "0px 10px",
                          }}
                        >
                          {language === "en" ? "SAR" : "ر.س"}
                        </span>{" "}
                      </Typography>
                    </Stack>
                  </Box>
                  <Button
                    sx={{
                      width: 1,
                      bgcolor: `${colors.main} !important`,
                      color: "#fff",

                      fontFamily: publicFontFamily,
                      fontWeight: "bolder",
                      fontSize: "25px",
                      mt: "20px",
                    }}
                    onClick={() => handlePaymentClick()}
                  >
                    {language === "en" ? "Checkout" : "الدفع"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartTest;
