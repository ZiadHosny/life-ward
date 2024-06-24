import React, { useEffect, useState } from "react";
import { useGetAllCartsQuery } from "../../APIs/cartApi";
import { Button, ButtonGroup, Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import applePayIMG from "../../assets/applePay.png";
import creditCardIMG from "../../assets/creditCard.png";
import stcPayIMG from "../../assets/stcPay.svg";
import { useTranslation } from "react-i18next";
import { mainColors } from "../../components/constants/color";
import { MoyaserClientBaseUrl } from "../../components/service";
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        px: {
          xs: 3,
          sm: 5,
          md: 10,
          lg: 20,
        },

        // px: {
        //   xs: 1,
        //   md: 5,
        //   lg: 10,
        // },
        // py: 5,
        // minHeight: '50vh',
      }}
    >
      {children}
    </Box>
  );
};

const publishable_api_key = "pk_test_KSDmss5dyhieD7StkXVSzP1z3m2rbbhSDN7br9xe";

const Creditcard = ({ amount, callback_url, description, metadata }) => {
  useEffect(() => {
    // @ts-ignore
    Moyasar.init({
      element: ".creditcard",
      amount,
      currency: "SAR",
      description,
      metadata,
      publishable_api_key,
      callback_url,
      methods: ["creditcard"],
    });
  }, [amount]);
  return <div className="creditcard"></div>;
};
const Stcpay = ({ amount, callback_url, description, metadata }) => {
  useEffect(() => {
    // @ts-ignore
    Moyasar.init({
      element: ".stcpay",
      amount,
      currency: "SAR",
      description,
      publishable_api_key,
      callback_url,
      metadata,
      methods: ["stcpay"],
    });
  }, [amount]);
  return <div className="stcpay"></div>;
};

const Applepay = ({ amount, callback_url, description, metadata }) => {
  useEffect(() => {
    // @ts-ignore
    Moyasar.init({
      element: ".applepay",
      amount,
      currency: "SAR",
      description,
      publishable_api_key,
      callback_url,
      methods: ["applepay"],
      metadata,
      apple_pay: {
        country: "SA",
        label: description,
        validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
      },
    });
  }, [amount]);
  return <div className="applepay"></div>;
};

function PaymentMoyasar() {
  const [_, { language }] = useTranslation();
  // totalAmount
  // const { Total } = useSelector((state) => state.NcartReducer);
  // totalAmount
  const [type, setType] = useState("creditcard");

  const { data, isLoading, isSuccess } = useGetAllCartsQuery();
console.log(data,'datadatadatadatadatadatadata')
  const couponData = JSON.parse(localStorage.getItem("couponData"));

  if (isLoading) {
    return <Box sx={{ minHeight: "50vh" }}>loading ......</Box>;
  }

  if (isSuccess) {
    const metadata = {
      cart_id: data._id,
      user_id: data?.data?.user?._id,
      total_quantity: data?.data?.onlineItems?.quantity,
    };
    const callback_url = `${MoyaserClientBaseUrl}/thankYou?cart_id=${data._id}`;
    // const callback_url = `https://saritestsecond.online/thankYou?cart_id=${data._id}`
    const total = (data?.data?.onlineItems?.totalPrice || 0) * 100;

    return (
      <Layout>
        <Box
          className="parent"
          sx={{ width: { xs: "100%", sm: "80%", md: "50%" },mx: "auto", mt: { xs: "100px", sm: "120px", md: "170px"}}}
          // style={{ marginTop: '200px' }}
        >
          <Typography
            variant="h3"
            sx={{
              color: mainColors.primary,
              p: "20px",
              borderBottom: `3px solid ${mainColors.primary}`,
              width: "fit-content",
              fontSize: "28px",
              fontWeight: "bold",
              mb: "20px",
              mx: "auto",
            }}
          >
            {language == "en" ? "Payment Method" : "طريقة الدفع"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              background: "white",
              borderRadius: "25px",
              padding: "12px 15px",
              border: "1px solid #e0e0e0",
            }}
          >
            <img
              style={{ minWidth: "120px", height: "50px" }}
              src={creditCardIMG}
            />
            <Button
              variant="contained"
              onClick={() => setType("creditcard")}
              sx={{
                maxWidth: "120px",
                fontSize: "14px",
                maxWidth: "140px",
                bgcolor: mainColors.primary,
              }}
            >
              {language == "en" ? "Credit Card" : "بطاقة الائتمان"}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              background: "white",
              borderRadius: "25px",
              padding: "12px 15px",
              border: "1px solid #e0e0e0",
              my: "20px",
            }}
          >
            <img
              style={{ minWidth: "120px", height: "50px" }}
              src={stcPayIMG}
            />
            <Button
              variant="contained"
              onClick={() => setType("stcpay")}
              sx={{
                minWidth: "120px",
                fontSize: "13px",
                maxWidth: "140px",
                bgcolor: mainColors.primary,
              }}
            >
              {language == "en" ? "STC Pay" : "STC باي"}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              background: "white",
              borderRadius: "25px",
              padding: "12px 15px",
              border: "1px solid #e0e0e0",
            }}
          >
            <img
              style={{ minWidth: "120px", height: "50px" }}
              src={applePayIMG}
            />
            <Button
              variant="contained"
              onClick={() => setType("applepay")}
              sx={{
                minWidth: "120px",
                fontSize: "14px",
                maxWidth: "140px",
                bgcolor: mainColors.primary,
              }}
            >
              {language == "en" ? "Apple Pay" : "ابل باي"}
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 5 }}>
          {type === "creditcard" && (
            <Creditcard
              amount={total}
              callback_url={callback_url}
              description={` pay ${total / 100}`}
              metadata={metadata}
            />
          )}
          {type === "stcpay" && (
            <Stcpay
              amount={total}
              callback_url={callback_url}
              description={` pay ${total / 100}`}
              metadata={metadata}
            />
          )}
          {type === "applepay" && (
            <Applepay
              amount={total}
              callback_url={callback_url}
              description={` pay ${total / 100}`}
              metadata={metadata}
            />
          )}
        </Box>
      </Layout>
    );
  }

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "40vh",
      }}
      className=""
    >
      <p style={{ color: "red" }}>Something went wrong!!</p>
    </Stack>
  );
}

export default PaymentMoyasar;
