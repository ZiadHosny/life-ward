import {
  Grid,
  Box,
  Stack,
  ButtonBase,
  Typography,
  CardMedia,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useLogin from "./useLogin";
import { motion } from "framer-motion";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HttpsIcon from "@mui/icons-material/Https";
import siteLogo from "../../assets/life-icon.png";
import imgBackground from "../../assets/login.png";
import PhoneIcon from "@mui/icons-material/Phone";

import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useLocation, useNavigate } from "react-router-dom";
import SmsVerficationModal from "../../components/smsVerfication/SmsVerficationModal";
import AuthGoogle from "../../components/AuthGoogle/AuthGoogle";
import { baseUrl } from "../../components/service";
import { toast } from "react-toastify";
const SignIn = () => {
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const [authUser, { setOpenModal, openModal, verifySMSCode }] = useLogin();
  const { state } = useLocation();

  const phoneValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .matches(
        // /^966\d{9}$/,
        /^\d+$/,
        lang == "en"
          ? "Phone must be numbers only"
          : "رقم الجوال يجب ان يكون أرقام فقط"
      )
      .min(
        9,
        lang == "en"
          ? "Phone must be 9 numbers"
          : "رقم الجوال يجب ان يكون 9 أرقام"
      )
      .max(
        9,
        lang == "en"
          ? "Phone must be 9 numbers"
          : "رقم الجوال يجب ان يكون 9 أرقام"
      )
      .required(lang === "en" ? "Phone is required" : "رقم الجوال مطلوب"),
    email: yup.string().notRequired(),
    password: yup.string().notRequired(),
  });

  const emailValidationSchema = yup.object().shape({
    phone: yup.string().notRequired(),
    email: yup
      .string()
      .email(
        lang === "en"
          ? "Pleae Enter a valid email"
          : "من فضلك ادخل بريد الكتروني صحيح"
      )
      .required(
        lang === "en" ? "Email is required" : "البريد الإلكتروني مطلوب"
      ),
    password: yup
      .string()
      .required(lang === "en" ? "Password is required" : "كلمة المرور مطلوبة"),
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      password: "",
      registrationType: "",
    },
    validationSchema: () => {
      if (formik.values.phone) {
        return phoneValidationSchema;
      }
      return emailValidationSchema;
    },
    onSubmit: (values) => {
      // values = {
      //   ...values,
      //   registrationType: formik.values.phone ? "phone" : "email",
      // };
      if (formik.values.phone && formik.values.email) {
        toast.error(
          lang === "en"
            ? "You must enter either phone or email"
            : "يجب ادخال البريد الالكتروني او رقم الجوال فقط"
        );
        return;
      }
      formik.values.phone
        ? (delete values.email, delete values.password)
        : delete values.phone;
      authUser(values, state?.productRoute);
    },
  });
  useEffect(() => {
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if ((phone, email)) {
      setTimeout(() => {
        phone.value = "";
        email.value = "";
        password.value = "";
        formik.resetForm();
      }, 3000);
    }
  }, []);
  const [passwordType, setPasswordType] = React.useState(true);
  const handleLoginGoogle = async () => {
    window.location.href = `${baseUrl}/auth/google`;
  };
  useEffect(() => {
    if (formik.values.email || formik.values.password) {
      formik.setFieldValue("registrationType", "email");
    }
    if (formik.values.phone) {
      formik.setFieldValue("registrationType", "phone");
    }
  }, [formik.values.email, formik.values.password, formik.values.phone]);
  // const phoneRef = useRef(null);
  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);

  return (
    <Stack
      sx={{
        flexDirection: {
          lg: "row",
          xs: "column-reverse",
        },
      }}
    >
      <Box
        sx={{
          width: {
            lg: 0.5,
            xs: 1,
          },
          bgcolor: "#F1F1F1",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: {
            lg: " 100vh",
            xs: "auto",
          },
          py: {
            lg: 0,
            xs: "40px",
          },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: {
                md: "75%",
                xs: "auto",
              },
              p: "20px 0",
              direction: lang === "en" ? "ltr" : "rtl",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  lg: "30px",
                  xs: "25px",
                },
                fontWeight: "999",
                fontFamily: publicFontFamily,
                color: colors.main,
              }}
            >
              {lang === "en" ? "Sign in" : "تسجيل دخول"}
            </Typography>

            <Box
              sx={{
                py: "50px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: {
                  xl: 550,
                  lg: 425,
                  md: 0.75,
                  xs: 0.92,
                },
              }}
            >
              <Input
                autoComplete="off"
                autoFocus=""
                startDecorator={
                  <Box>
                    {lang !== "ar" ? <Typography>+966</Typography> : null}
                  </Box>
                }
                endDecorator={
                  <Box>
                    {lang == "ar" ? <Typography>966+</Typography> : null}
                  </Box>
                }
                // placeholder={lang === "en" ? "phone" : "الهاتف"}
                // disabled={formik.values.email || formik.values.password}
                type={"text"}
                sx={{
                  p: "20px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                  borderRadius: "40px",
                  mt: "20px",
                  border: `2px solid ${colors.main}`,
                  "& > .css-17ewsm8-JoyInput-root": {
                    inputFocusedHighlight: "black !important",
                  },
                  "& > input": {
                    textAlign: "left",
                    direction: 'ltr'
                  },
                }}
                id="phone"
                name="phone"
                value={formik?.values?.phone?.replace(" ", "")}
                onChange={formik.handleChange}
                onClick={() => {
                  formik.setFieldValue("registrationType", "phone");
                }}
                slotProps={{
                  input: {
                    autoComplete: "new-password",
                    autoFocus: false,
                    role: "presentation",
                  },
                }}
              />
              {formik.errors.phone && formik.touched.phone && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.phone}
                </Typography>
              )}
              <Typography sx={{ textSizeAdjust: "auto" }} textAlign={"center"}>
                {lang === "en" ? "OR" : "أو"}
              </Typography>
              <Input
                autoComplete="off"
                startDecorator={
                  <MailIcon
                    sx={{
                      color: colors.main,
                    }}
                  />
                }
                slotProps={{ input: { autoComplete: "off" } }}
                placeholder={lang === "en" ? "Email" : "البريد الإلكتروني"}
                // disabled={formik.values.phone}
                type={"text"}
                sx={{
                  p: "20px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                  borderRadius: "40px",
                  border: `2px solid ${colors.main}`,
                  "& > .css-17ewsm8-JoyInput-root": {
                    inputFocusedHighlight: "black !important",
                  },
                }}
                name="email"
                id="email"
                label={lang === "en" ? "email" : "البريد الإلكتروني"}
                defaultValue={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.email}
                </Typography>
              )}

              <Input
                autoComplete="off"
                startDecorator={
                  <HttpsIcon
                    sx={{
                      color: colors.main,
                    }}
                  />
                }
                placeholder={lang === "en" ? "Password" : "كلمة المرور"}
                // disabled={formik.values.phone}
                type={passwordType ? "password" : "text"}
                endDecorator={
                  <IconButton color="neutral" size="sm">
                    {passwordType ? (
                      <VisibilityRoundedIcon
                        sx={{
                          color: colors.main,
                        }}
                        onClick={() => setPasswordType(false)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        sx={{
                          color: colors.main,
                        }}
                        onClick={() => setPasswordType(true)}
                      />
                    )}
                  </IconButton>
                }
                sx={{
                  p: "20px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                  borderRadius: "40px",

                  mt: "30px",
                  border: `2px solid ${colors.main}`,
                  "& > .css-17ewsm8-JoyInput-root": {
                    inputFocusedHighlight: "black !important",
                  },
                }}
                name="password"
                id="password"
                label={lang === "en" ? "Password" : "كلمة المرور"}
                defaultValue={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.password}
                </Typography>
              )}

              {formik.values.registrationType !== "phone" && (
                <Box mt={2}>
                  <Typography
                    onClick={() => navigate("/forgetPassword")}
                    sx={{
                      cursor: "pointer",
                      display: "inline",
                      borderBottom: `1px solid #693096`,
                      color: "#693096",
                      fontFamily: publicFontFamily,
                    }}
                  >
                    {lang === "en" ? "Forget password ?" : "نسيت كلمة المرور ؟"}
                  </Typography>
                </Box>
              )}
              <ButtonBase
                type="submit"
                sx={{
                  color: "#fff",
                  bgcolor: colors.main,
                  mt: "20px",
                  fontSize: {
                    xl: "22px",
                    lg: "20px",
                    xs: "18px",
                  },
                  padding: "15px 35px",
                  py: {
                    xl: "15px",
                    lg: "11px",
                    xs: "8px",
                  },
                  px: "35px",
                  fontFamily: publicFontFamily,
                  borderRadius: "40px",
                }}
              >
                {lang === "en" ? "Login" : "تسجيل الدخول"}
              </ButtonBase>

              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    color: colors.main,
                    fontFamily: publicFontFamily,
                    fontWeight: "bold",
                  }}
                >
                  {lang === "en" ? "don't have an account?" : "ليس لديك حساب؟"}
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: colors.main,
                    fontWeight: "900",
                    fontFamily: publicFontFamily,
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("/register", { state })}
                >
                  {lang === "en" ? "Sign up" : "اشترك"}
                </Typography>
              </Box>
              <AuthGoogle handleLoginGoogle={handleLoginGoogle} />
            </Box>
          </Stack>
        </form>
        <SmsVerficationModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          verifySMSCode={verifySMSCode}
          userPhone={formik.values?.phone}
        />
      </Box>
      <Box
        sx={{
          width: {
            lg: 0.5,
            xs: 1,
          },
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundImage: `url(${imgBackground})`,
          position: "relative",
          height: {
            lg: "100vh",
            xs: "380px",
          },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 1,
            width: 1,
            bgcolor: "#dfd3e96e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component={"img"}
            src={siteLogo}
            sx={{
              height: {
                md: 275,
                xs: 200,
              },
              width: {
                md: 275,
                xs: 200,
              },
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default SignIn;
