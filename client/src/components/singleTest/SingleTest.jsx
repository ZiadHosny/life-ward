import {
  Box,
  Button,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
const SingleTest = () => {
  const [_, { language: lang }] = useTranslation();
  return (
    <Box
      sx={{
        py: "250px",
      }}
    >
      <Grid
        container
        sx={{
          width: 1200,
          mx: "auto",
        }}
      >
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            border: "1px solid blue",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: 400,
              width: 400,
              objectFit: "contain",
              mx: "auto",
            }}
            src={
              "https://clipartcraft.com/images/flower-clipart-realistic-14.png"
            }
          />
          <Stack
            sx={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 70,
              width: 0.6,
            }}
          >
            <Button
              sx={{
                border: 1,
                borderColor: colors.main,
                minWidth: 0,
                width: 0,
                height: 0,
                p: "20px",
                borderRadius: "50%",
              }}
            >
              <AddIcon />
            </Button>
            <Button
              sx={{
                border: 1,
                borderColor: colors.main,
                minWidth: 0,
                width: 0,
                height: 0,
                p: "20px",
                borderRadius: "50%",
              }}
            >
              <RemoveIcon
                sx={{
                  color: colors.main,
                }}
              />
            </Button>
          </Stack>
        </Grid>
        <Grid item md={6} xs={12} border={1} borderColor={"red"}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: colors.main,
                fontFamily: publicFontFamily,
                fontWeight: "bold",
              }}
            >
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: colors.main,
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                mt: "30px",
              }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laboriosam, illum nisi molestias saepe odit ab quasi, natus harum
              minus
            </Typography>
            <Box my={"20px"}>
              {[...Array(5)].map(() => (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={"20px"}
                >
                  <Typography
                    sx={{
                      color: colors.main,
                      fontFamily: publicFontFamily,
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    attribute
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    gap={"20px"}
                  >
                    {[...Array(3)].map(() => (
                      <Typography
                        sx={{
                          color: colors.main,
                          fontFamily: publicFontFamily,
                          fontWeight: "bold",
                          fontSize: "17px",
                        }}
                      >
                        Lorem
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Box>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "30px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: colors.main,
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
              >
                300 SAR
              </Typography>
              <Rating name="read-only" readOnly />
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "30px",
                mt: "30px",
              }}
            >
              <Button
                sx={{
                  borderRadius: "10px",
                  bgcolor: `#fff !important`,
                  fontFamily: publicFontFamily,
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  p: "10px",
                  borderRadius: 0,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    /*  !checkActivity || productInCart   */
                    color: false ? "#fff" : colors.main,

                    fontWeight: "bold",
                    fontFamily: publicFontFamily,
                  }}
                >
                  {/* !productInCart */}
                  {true
                    ? lang === "en"
                      ? "Add to cart"
                      : "أضف إلي عجلة التسوق"
                    : lang === "en"
                    ? "Product is added"
                    : "المنتج تمت اضافته"}
                </Typography>

                <i className="fa-solid fa-cart-shopping mx-2"></i>
              </Button>
              {/* currentUser?.email */}
              {true && (
                <Button
                  sx={{
                    borderRadius: 0,
                    fontWeight: "bold",
                    bgcolor: `${colors.main} !important`,
                    color: "#fff",
                    fontFamily: publicFontFamily,
                    p: "10px",
                  }}
                  onClick={() =>
                    // checkActivity && !productInCart
                    true ? handleAddToCart("creatingOrder") : undefined
                  }
                >
                  {lang === "en" ? "Order now" : "اطلب الآن"}
                </Button>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleTest;
