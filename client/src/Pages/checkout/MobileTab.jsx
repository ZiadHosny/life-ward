import { Button, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckTextInput from "./latest/CheckTextInput";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useFormik } from "formik";
import {
  checkoutValidaions,
  checkoutValues,
} from "./check_assets/checkout.inputs";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useVerifyOrderCodeMutation } from "../../APIs/ordersApi";
import { useNavigate } from "react-router-dom";
// import { useLazyGetAllCartsQuery } from "../../APIs/cartApi";


export const MobileTab = ({
  setValue,
  showed,
  setMobileTabShowed,
  userPhone
}) => {

  const navigate = useNavigate();
  const [verifyOrderCode, { isLoading }] = useVerifyOrderCodeMutation();
  // const [getCart] = useLazyGetAllCartsQuery();

  const formik = useFormik({
    initialValues: { ...checkoutValues.second },
    validationSchema: Yup.object(checkoutValidaions.second),
    onSubmit: () => {
      console.log('What is wrong With Formic ================')
      verifyOrderCode({ ...values, phone: userPhone })
        .unwrap()
        .then((res) => {
          // getCart();

          toast.success(res[`success_${language}`]);
          setMobileTabShowed(false);
          setValue(2)

          // if (res.paymentType === "cash") {
          //   navigate("/thankYou");
          // } else {
          //   navigate(`/payment-moyasar`);
          // }
        })
        .catch((error) => {
          toast.error(error.data[`error_${language}`])
        });
    },
  });

  const [_, { language }] = useTranslation();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        item lg={4} xs={12}
        sx={{
          display: showed ? "block" : "none",
          mx: 'auto',
          textAlign: 'center',
          width: {
            lg: '70%',
            md: '90%',
            sm: '100%',
            xs: '100%'
          },
          pb: 10,
          borderRadius: 8,
          bgcolor: '#f2e5fc',
        }}>
        <Typography
          sx={{
            fontSize: {
              lg: 35,
              md: 25,
              sm: 25,
              xs: 15,
            },
            p: 5,
            color: colors.main,
            fontWeight: "bolder",
            fontFamily: publicFontFamily,
          }}>
          {language === "en"
            ? "Enter the confirmation code"
            : "أدخل رمز التأكيد"}
        </Typography>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            gap: 3,
            width: '100%',
            px: {
              md: 0,
              sm: 10,
              xs: 5,
            }
          }}
        >
          <CheckTextInput
            type="text"
            name="code"
            label=""
            value={values.code}
            error={errors.code}
            touched={touched.code}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={"20px"}
        >
          <Button
            onClick={handleSubmit}
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

      </Grid>
    </form>
  );
};