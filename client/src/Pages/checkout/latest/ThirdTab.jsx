import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  CardMedia,
  Stack,
  Typography,
  Input,
  ButtonBase,
} from "@mui/material";
import CheckTextInput from "./CheckTextInput";
import visaPay from "../../../assets/visa.png";
import madaPay from "../../../assets/payment-mada.png";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  checkoutValidaions,
  checkoutValues,
} from "../check_assets/checkout.inputs";
import moment from "moment";
import { useCreateOnlineOrderMutation } from "../../../APIs/ordersApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const ThirdTab = ({ showed }) => {
  const [_, { language }] = useTranslation();
  const [createOnlineOrder] = useCreateOnlineOrderMutation();
  const { cart } = useSelector((state) => state.cart);

  // formalName: "",
  //   creditCard: "",
  //   expirationDate: "",
  //   protectionSymbol: "",
  const formik = useFormik({
    initialValues: { ...checkoutValues.last },
    validationSchema: Yup.object(checkoutValidaions.last),
    onSubmit: () => {
      createOnlineOrder({
        ...values,
        total: cart,
      })
        .unwrap()
        .then((res) => {
          window.open(res.data.transaction_url, "_self");
        })
        .catch((error) => console.log("error", error));
      // setValue((value) => value + 1);
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = formik;
  const [selectImage, setSelectImage] = useState("master card");
  const companies = [
    {
      title: "master card",
      src: "https://misr5.com/wp-content/uploads/2021/01/%D8%B4%D8%B1%D9%83%D8%A9-%D9%85%D8%A7%D8%B3%D8%AA%D8%B1-%D9%83%D8%A7%D8%B1%D8%AF-768x464.png",
    },
    {
      title: "visa pay",
      src: visaPay,
    },
    {
      title: "mada pay",
      src: madaPay,
    },
  ];

  useEffect(() => {
    let number = formik.values.expirationDate;
    if (number.length >= 3 && Number(number)) {
      let firstSlice = number.slice(0, 2);
      let secondSlice = number.slice(2);
      let res = `${firstSlice}/${secondSlice}`;
        // 11/23
      formik.setFieldValue("expirationDate", res);
    }
   // const [getCart]= useLazyGetAllCartsQuery();
    //
    // formik.setFieldValue('expirationDate',`${newString[0]}/${newString[1]}`)
    // console.log('the Temp value: ',`${newString[0]}/${newString[1]}`)
  }, [formik.values.expirationDate]);
   
  const [creditFocus, setCreditFocus] = useState();

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: showed ? "block" : "none",
      }}
    >
      {/* THE CREDIT CARD API */}
      <Cards
        number={formik.values.creditCard}
        expiry={formik.values.expirationDate}
        cvc={formik.values.protectionSymbol}
        name={formik.values.formalName}
        focused={creditFocus}
      />
      {/* <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "30px",
          mb: "50px",
        }}
      >
        {companies?.map((item) => (
          <Box
            sx={{
              p: "15px",
              border: 1,
              borderColor:
                item.title === selectImage ? colors.main : "transparent",
            }}
          >
            <CardMedia
              // onClick={() => setSelectImage(item.title)}
              component="img"
              src={item.src}
              sx={{
                height: 90,
                width: 90,
                // cursor: "pointer",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Stack> */}
      <Stack
        sx={{
          flexDirection: {
            md: "row",
            xs: "column",
          },
          alignItems: "flex-start",
          justifyContent: "space-between",
          mt: "50px",
        }}
      >
        <CheckTextInput
          type="text"
          name="formalName"
          value={values.formalName}
          error={errors.formalName}
          label={language === "en" ? "the name of the card" : "الأسم بالبطاقة"}
          touched={touched.formalName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setCreditFocus={setCreditFocus}
          creditCardNames={"name"}
        />
        <CheckTextInput
          type="text"
          name="creditCard"
          value={values.creditCard}
          error={errors.creditCard}
          label={language === "en" ? "Card Number" : "رقم البطاقة"}
          touched={touched.creditCard}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setCreditFocus={setCreditFocus}
          creditCardNames={"name"}
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: {
            md: "row",
            xs: "column",
          },
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <CheckTextInput
          type="tel"
          name="expirationDate"
          value={values.expirationDate}
          error={errors.expirationDate}
          touched={touched.expirationDate}
          label={language === "en" ? "Expiration Date" : "تاريخ الانتهاء"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          placeholder={"(03/23)--(mm/yy)"}
          setCreditFocus={setCreditFocus}
          creditCardNames={"expiry"}
        />
        <CheckTextInput
          type="text"
          name="protectionSymbol"
          value={values.protectionSymbol}
          error={errors.protectionSymbol}
          label={language === "en" ? "Security code" : "رمز الحماية"}
          touched={touched.protectionSymbol}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setCreditFocus={setCreditFocus}
          creditCardNames={"cvc"}
        />
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        mt={"20px"}
      >
        <Button
          type="submit"
          sx={{
            fontFamily: publicFontFamily,
            bgcolor: `${colors.main} !important`,
            color: "#fff",
            px: "50px",
            fontSize: {
              md: "initial",
              xs: "13.5px",
            },
            transition: "0.4s all",
            textTransform: "none",
            fontWeight: "bold",
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          {language === "en" ? "Checkout" : "دفع"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ThirdTab;
