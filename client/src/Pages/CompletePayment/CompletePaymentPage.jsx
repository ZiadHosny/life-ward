import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  CircularProgress,
  Typography,
  CardMedia,
} from "@mui/material";
import { useGetUserOrdersQuery } from "../../APIs/ordersApi";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { imageBaseUrl } from "../../components/service";
import { useClearCartMutation } from "../../APIs/cartApi";
const CompletePaymentPage = () => {
  const { data, isLoading } = useGetUserOrdersQuery();
  const [userOrder, setUserOrder] = useState();
  const [clearCart] = useClearCartMutation();
  const navigate = useNavigate();
  const [_, { language: lang }] = useTranslation([]);
  useEffect(() => {
    if (data) {
      setUserOrder(data.orders[data?.orders.length - 1]);
      clearCart();
    }
  }, [data]);
  return (
    <Box
      sx={{
        py: "150px",
      }}
    >
      {isLoading ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "40vh",
          }}
        >
          <CircularProgress
            sx={{
              color: colors.newMainColor,
            }}
          />
        </Stack>
      ) : (
        <Box
          sx={{
            px: {
              lg: "70px",
              md: "30px",
              xs: "20px",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              display: "inline",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            {lang == "en" ? "Go To Home Page" : "اذهب إلى الصفحة الرئيسية"}
          </Typography>
          <Box
            sx={{
              mt: "50px",
            }}
          >
            <Typography variant="h4" className="heading">
              {lang === "en" ? "your request number" : "رقم طلبك"}
            </Typography>
            <Typography variant="h6" className="heading">
              {userOrder?._id}
            </Typography>
          </Box>

          {userOrder?.products.map(({ product }, indx) => {
            return (
              <Box
                className="product"
                key={indx}
                sx={{
                  bgcolor: colors.newLightColor,
                  p: 2,
                  mt: "15px",
                }}
              >
                <CardMedia
                  alt={product.title}
                  src={`${imageBaseUrl}/${product?.images[0]}`}
                  component="img"
                  sx={{
                    height: "140px",
                    width: "auto",
                  }}
                />
                <div>
                  <h2 style={{}}>{product.title}</h2>
                  <Box
                    sx={{
                      fontFamily: publicFontFamily,
                    }}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                 
                </div>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CompletePaymentPage;
