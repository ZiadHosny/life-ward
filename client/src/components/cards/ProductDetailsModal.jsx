import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Stack,
  Typography,
  Grid,
  Avatar,
  Rating,
  CircularProgress,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import ReactStars from "react-rating-stars-component";

import {
  useAddRatingMutation,
  useLazyGetSingleProductQuery,
} from "../../APIs/ProductApis";
import { imageBaseUrl } from "../../components/service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setRefetch } from "../../APIs/refetchSlice";
import { useAddToCartMutation, useGetAllCartsQuery } from "../../APIs/cartApi";
import { colors } from "../publicStyle/publicStyle";
import { useLazyGetMeQuery } from "../../APIs/UserApis";
export default function ProductDetailsModal({ productId }) {
  const [open, setOpen] = React.useState(false);
  const [getSingleProduct] = useLazyGetSingleProductQuery();
  const { data: dataCart, isSuccess: cartIsSuccess } = useGetAllCartsQuery();
  const [addRating] = useAddRatingMutation();
  const [_, { language: lang }] = useTranslation();
  const [product, setProduct] = React.useState();
  const handleSignleProduct = () => {
    getSingleProduct(productId).then(({ data, error }) => {
      if (data.product) {
        setProduct(data.product);
      }
    });
    setOpen(true);
  };
  const dispatch = useDispatch();
  const handleUpdateproductRating = (ratingValue) => {
    addRating({ productId, rating: ratingValue }).then(({ data, error }) => {
      if (!error) {
        toast.success(data[`success_${lang}`]);
        dispatch(setRefetch());
      } else {
        toast.error(error?.data[`error_${lang}`]);
      }
    });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      md: 0.7,
      xs: 0.9,
    },
    height: {
      lg: "audo",
      md: "70vh",
      xs: "85vh",
    },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    overflowY: {
      lg: "hidden",
      xs: "scroll",
    },
    "&::-webkit-scrollbar": {
      width: "10px",
    },

    /* Track */
    "::-webkit-scrollbar-track": {
      background: "#f0f0f0",
      borderRadius: "20px",
    },

    /* Handle */
    "::-webkit-scrollbar-thumb": {
      background: "#555555",
      borderRadius: "20px",
    },
  };
  const [myAttributes, setMyAttributes] = React.useState([]);

  const checkActivity =
    (product?.attributes?.length > 0 && myAttributes[0]) ||
    !product?.attributes?.length > 0;

  const productInCart =
    cartIsSuccess &&
    dataCart?.cart?.find(
      (earchProduct) => earchProduct?.product?._id === product?._id
    );
  const addAttributes = (key, value) => {
    let attrIsExisted = myAttributes.find((item) => item.key === key);
    if (!attrIsExisted) {
      setMyAttributes([...myAttributes, { key, value }]);
    } else {
      setMyAttributes((atts) =>
        atts.map((att) =>
          att.key === key
            ? {
                ...att,
                value,
              }
            : att
        )
      );
    }
  };
  const [addToCart, { isLoading: addingItemLoading }] = useAddToCartMutation();
  const handleAddToCart = () => {
    addToCart({
      product: productId,
      properties: myAttributes,
    })
      .then((res) => {
        toast.success(res.data[`success_${lang}`]);
      })
      .catch((e) => {
        toast.error(e.response.data[`error_${lang}`]);
      });
  };
  const [getMe] = useLazyGetMeQuery();
  const [user, setUser] = React.useState();
  const ratingChanged = (_, rating) => {
    if (user?.status) {
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
  React.useEffect(() => {
    getMe().then((res) => {
      if (res?.data.success !== undefined) {
        setUser(res?.data.user);
      }
    });
  }, []);
  return (
    <div>
      <Button onClick={handleSignleProduct}>
        <RemoveRedEyeIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!product ? (
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
          ) : (
            <Grid container>
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  p: 1,
                }}
              >
                <Avatar
                  sx={{ height: "66vh", width: "100%", borderRadius: 0 }}
                  src={product ? imageBaseUrl + product.images[0] : ""}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={7}
                sx={{
                  p: 1,
                }}
              >
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    sx={{
                      minWidth: 0,
                    }}
                    onClick={handleClose}
                  >
                    <CloseIcon sx={{ color: "#9E9E9E", fontSize: "25px" }} />
                  </Button>
                </Stack>
                <div className="mt-4">
                  <h2 className="my-3" style={{ color: "#F8B407" }}>
                    {product?.title}
                  </h2>
                  <p className="my-3 lead">{product?.smallDesc}</p>
                  <div className="my-3 d-flex align-items-center ">
                    {alert ? (
                      <div className="alert alert-danger">{alert}</div>
                    ) : (
                      ""
                    )}
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                      value={Math.floor(product.avgRating)}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />

                    <div>
                      <div
                        className=" mx-2 "
                        style={{
                          color: " #9e9797",
                          fontWeight: "500 ",
                          fontSize: "18px",
                        }}
                      >
                        {product?.reviews > 0 && <span>{product.reviews}</span>}
                        <span>تقييم</span>{" "}
                      </div>
                    </div>
                  </div>
                  <Box>
                    {product?.attributes?.map(
                      (attribute) =>
                        attribute.values.length > 0 && (
                          <Stack
                            
                            direction="row"
                            alignItems="center"
                            sx={{
                              mt: "10px",
                              gap: "6px",
                            }}
                          >
                            <Typography>{attribute.key}</Typography>
                            <Stack
                              direction="row"
                              alignItems="center"
                              sx={{
                                gap: "5px",
                              }}
                            >
                              {attribute?.values?.map((value) => {
                                const check = myAttributes.find(
                                  (att) => att.value === value
                                );
                                return (
                                  <Button
                                    key={value}
                                    disableRipple
                                    sx={{
                                      px: "10px",
                                      border: `1px solid ${
                                        check ? "#fff" : "#000"
                                      } !important`,
                                      color: check ? "#fff" : "#000",
                                      transform: "scale(1) !important",
                                      backgroundColor: productInCart
                                        ? "#ccc"
                                        : check
                                        ? "#F8B407 !important"
                                        : "#fff !important",
                                    }}
                                    disabled={productInCart}
                                    onClick={() =>
                                      addAttributes(attribute.key, value)
                                    }
                                  >
                                    {value}
                                  </Button>
                                );
                              })}
                            </Stack>
                          </Stack>
                        )
                    )}
                  </Box>

                  <div className="my-3">
                    <span
                      className="fw-bold mx-2 fs-4"
                      style={{ color: "#F8B407" }}
                    >
                      {product?.price * product?.sale} ريال
                    </span>

                    {product?.price != product?.price * product?.sale && (
                      <span style={{ textDecoration: "line-through" }}>
                        {product?.price} ريال
                      </span>
                    )}
                  </div>
                  {/* <div className="my-3">
                        <h6>المقاسات</h6>
                        <div className="d-flex justify-content-between w-50">
                          {sizes?.map((size, index) => (
                            <div
                              key={index}
                              className="border d-flex align-items-center justify-content-center"
                              style={{ height: "30px", width: "30px" }}
                            >
                              {size}
                            </div>
                          ))}
                        </div>
                      </div> */}
                  <Button
                    className="text-white py-3 px-2 btn border-0"
                    sx={{
                      borderRadius: "10px",
                      backgroundColor:
                        checkActivity && !productInCart
                          ? "#F8B407 !important"
                          : "#aa8935 !important",
                    }}
                    disabled={!checkActivity || productInCart}
                    onClick={() =>
                      checkActivity && !productInCart
                        ? handleAddToCart()
                        : undefined
                    }
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {!productInCart
                        ? "اضافة الي سلة التسوق"
                        : "المنتج تمت اضافته"}
                    </span>

                    <i className="fa-solid fa-cart-shopping mx-2"></i>
                  </Button>
                </div>
                <Box
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                  sx={{
                    mt: "10px",
                  }}
                />
                {/* End */}
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </div>
  );
}
