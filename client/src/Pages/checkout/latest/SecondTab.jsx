import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import CheckTextInput from "./CheckTextInput";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import { useFormik } from "formik";
import {
  checkoutValidaions,
  checkoutValues,
} from "../check_assets/checkout.inputs";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useVerifyOrderCodeMutation } from "../../../APIs/ordersApi";
import { useNavigate } from "react-router-dom";
import { useLazyGetAllCartsQuery } from "../../../APIs/cartApi";
const SecondTab = ({ showed, setValue, userPhone }) => {
  const navigate = useNavigate();
  const [verifyOrderCode, { isLoading }] = useVerifyOrderCodeMutation();
  const [getCart]= useLazyGetAllCartsQuery();
  const formik = useFormik({
    initialValues: { ...checkoutValues.second },
    validationSchema: Yup.object(checkoutValidaions.second),
    onSubmit: () => {
      verifyOrderCode({ ...values, phone: userPhone })
        .unwrap()
        .then((res) => {
          getCart();
          localStorage.removeItem('couponData')
           toast.success(res[`success_${language}`]);
          if (res.paymentType === "cash") {
            navigate("/thankYou");
          } else {
            navigate(`/payment-moyasar`);
          }
        })
        .catch((error) => toast.error(error.data[`error_${language}`]));
    },
  });

  const [_, { language }] = useTranslation();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: showed ? "block" : "none",
        pt: {
          lg: "100px",
          xs: "70px",
        },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: {
            md: "60px",
            xs: "35px",
          },
          borderRadius: "20px",
          width: {
            lg: 700,
            md: 0.85,
            xs: 0.93,
          },
          mx: "auto",
        }}
      >
        <Box>
          <Typography
            fontFamily={publicFontFamily}
            fontWeight={"bold"}
            sx={{
              color: colors.main,
              fontSize: {
                md: "19px",
                xs: "17.5px",
              },
              pb: "20px",
            }}
          >
            {language === "en"
              ? "Enter the confirmation code"
              : "أدخل رمز التأكيد"}
          </Typography>
          <CheckTextInput
            fullWidth={true}
            type="text"
            name="code"
            label=""
            value={values.code}
            error={errors.code}
            touched={touched.code}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center "}
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
              disabled={isLoading}
            >
              {language === "en" ? "confirm" : "تأكيد"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default SecondTab;
