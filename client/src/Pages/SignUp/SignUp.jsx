import {
  Grid,
  Box,
  Stack,
  ButtonBase,
  Typography,
  CardMedia,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useSignUp from "./useSignUp";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HttpsIcon from "@mui/icons-material/Https";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import image from "../../assets/login.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import PhoneIcon from "@mui/icons-material/Phone";
import imgBackground from "../../assets/login.png";
import siteLogo from "../../assets/life-icon.png";
import SmsVerficationModal from "../../components/smsVerfication/SmsVerficationModal";
import { toast } from "react-toastify";
import AuthGoogle from "../../components/AuthGoogle/AuthGoogle";
import { baseUrl } from "../../components/service";

const SignUp = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const [signUp, { setOpenModal, openModal, verifySMSCode }] = useSignUp();
  const { state } = useLocation();
  const [acceptTerms, setAcceptTerms] = useState(false);
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
    gender: yup.string(),
    birthDate: yup.date(),
    name: yup.string(),
  });
  const emailValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .notRequired(
        lang === "en" ? "Phone not required" : "رقم الجوال غير مطلوب"
      ),
    email: yup
      .string()
      .email(lang === "en" ? "Invalid email" : "بريد إلكتروني خاطئ")
      .required(
        lang === "en" ? "Email is required" : "البريد الإلكترونى مطلوب"
      ),
    password: yup
      .string()
      .required(lang === "en" ? "Password is required*" : "*كلمة المرور مطلوب"),
    gender: yup.string(),
    birthDate: yup
      .date()
      .max(
        new Date(),
        lang === "en"
          ? "Birth date cannot be in the future. "
          : "لا يمكن قبول تاريخ الميلاد في المستقبل "
      ),
    name: yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      birthDate: "",
      gender: "",
    },
    validationSchema: () => {
      if (formik.values.phone) {
        return phoneValidationSchema;
      }
      return emailValidationSchema;
    },
    onSubmit: (values) => {
      if (!acceptTerms) {
        toast.error(
          lang === "en"
            ? "Must be agree the terms and conditions first!"
            : "يجب ان تكون موافق على البنود و الشروط أولاً"
        );
      } else {
        !values.birthDate ? delete values.birthDate : undefined;
        !values.name ? delete values.name : undefined;
        values = {
          ...values,
          registrationType: formik.values.phone ? "phone" : "email",
        };

        if (formik.values.phone && formik.values.email) {
          toast.error(
            lang === "en"
              ? "You must register with either phone or email"
              : "يجب ادخال البريد الالكتروني او رقم الجوال فقط"
          );
          return;
        }
        formik.values.phone
          ? (delete values.email, delete values.password)
          : (delete values.phone,
            delete values.name,
            delete values.birthDate,
            delete values.gender);

        signUp(values);
      }
    },
  });
  const arabicGenders = {
    male: "ذكر",
    female: "أنثي",
  };
  const handleLoginGoogle = async () => {
    if (!acceptTerms) {
      toast.error(
        lang === "en"
          ? "Must be agree the terms and conditions first!"
          : "يجب ان تكون موافق على البنود و الشروط أولاً"
      );
    } else {
      window.location.href = `${baseUrl}/auth/google`;
    }
  };
  console.log("mohamed qhwqh jwq w", formik.errors);
  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        direction: lang === "en" ? "rtl" : "ltr",
      }}
    >
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
            // lg: "105vh",
            xs: "380px",
            lg: "unset",
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
            // lg: "105vh",
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
                fontWeight: "bolder",
                fontFamily: publicFontFamily,
                color: colors.main,
              }}
            >
              {lang === "en" ? "Create an account" : "إنشاء حساب"}
            </Typography>

            <Box
              sx={{
                py: "50px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                width: {
                  xl: 550,
                  lg: 425,
                  md: 0.75,
                  xs: 0.92,
                },
              }}
            >
              {/* Name */}
              <Input
                autoComplete="off"
                startDecorator={
                  <Person2Icon
                    sx={{
                      color: colors.main,
                    }}
                  />
                }
                placeholder={lang === "en" ? "Name" : "الأسم"}
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
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.name}
                </Typography>
              )}
              {/* phone */}
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontFamily: publicFontFamily,
                  color: colors.main,
                }}
              >
                {lang === "en" ? "birth date" : "تاريخ الميلاد"}
              </Typography>
              <Input
                autoComplete="off"
                // startDecorator={
                //   <CakeIcon
                //     sx={{
                //       color: colors.main,
                //     }}
                //   />
                // }
                type={"date"}
                slotProps={{
                  input: {
                    max: new Date(new Date().getFullYear() - 18, "12", "01")
                      .toISOString()
                      .slice(0, 10),
                  },
                }}
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
                name="birthDate"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
              />
              {formik.errors.birthDate && formik.touched.birthDate && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.birthDate}
                </Typography>
              )}

              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: publicFontFamily,
                    color: colors.main,
                    mb: "10px",
                  }}
                >
                  {lang === "en" ? "gender" : "جنس"}
                </Typography>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  style={{
                    width: "100%",
                    border: `2px solid ${colors.main}`,
                    outline: 0,
                    backgroundColor: "transparent",
                    padding: "15px 10px",
                    fontSize: "18px",
                    fontFamily: publicFontFamily,
                    fontWeight: "bold",
                    borderRadius: "40px",
                  }}
                >
                  <option
                    style={{
                      cursor: "pointer",
                    }}
                    component="option"
                    selected
                    hidden
                  >
                    {lang === "en" ? "Select" : "اختار"}
                  </option>
                  {["male", "female"].map((item) => (
                    <option
                      style={{
                        cursor: "pointer",
                      }}
                      component="option"
                      key={item}
                      value={item}
                    >
                      {lang === "en" ? item : arabicGenders[item]}
                    </option>
                  ))}
                </select>
              </Box>
              {formik.errors.gender && formik.touched.gender && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.gender}
                </Typography>
              )}
              <Box direction="ltr">
                <Input
                  autoComplete="off"
                  startDecorator={
                    <Box>
                      {lang !== "ar" ? <Typography>+966</Typography> : null}
                    </Box>
                  }
                  endDecorator={
                    <Box>
                      {lang == "ar" ? <Typography> 966+</Typography> : null}
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
                    mt: "50px",
                    border: `2px solid ${colors.main}`,
                    "& > .css-17ewsm8-JoyInput-root": {
                      inputFocusedHighlight: "black !important",
                    },

                    "& > input": {
                      textAlign: "left",
                       direction: 'ltr'
                    },
                  }}
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </Box>

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

              <Typography
                sx={{
                  textSizeAdjust: "auto",
                  fontWeight: "bold",
                  color: colors.main,
                  fontFamily: publicFontFamily,
                }}
                textAlign={"center"}
              >
                {lang === "en" ? "OR" : "أو"}
              </Typography>
              {/* Email */}
              <Input
                endDecorator={
                  <MailIcon
                    sx={{
                      color: colors.main,
                    }}
                  />
                }
                placeholder={lang === "en" ? "email" : "البريد الإلكتروني"}
                autoComplete="off"
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
                }}
                name="email"
                value={formik.values.email}
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
              {/* Password */}
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
                  mt: "20px",
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

              <Stack direction={"row"} alignItems={"center"} gap={"6px"}>
                <input
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  type="checkbox"
                  style={{
                    height: "20px",
                    width: "20px",
                    accentColor: "#693096",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: publicFontFamily,
                    fontWeight: "bold",
                  }}
                >
                  {lang === "en" ? "I accept" : "أوفق على"}
                </Typography>
                <Typography
                  component={Link}
                  target="_blank"
                  sx={{
                    textDecoration: "none",
                    color: "#693096 !important",
                    fontFamily: publicFontFamily,
                    fontWeight: "bold",
                  }}
                  to={`/policies/usage`}
                >
                  {lang === "en" ? "terms & conditions" : "البنود و الشروط"}
                </Typography>
              </Stack>
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
                  borderRadius: "40px",
                  py: {
                    xl: "15px",
                    lg: "11px",
                    xs: "8px",
                  },
                  px: "35px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
              >
                {lang === "en" ? "Sign up" : "إشتراك"}
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
                    fontWeight: "bolder",
                    fontFamily: publicFontFamily,
                  }}
                >
                  {lang === "en" ? "have an account?" : "لديك حساب؟"}
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    // fontFamily: basicFont,
                    fontWeight: "bolder",
                    fontFamily: publicFontFamily,
                    color: colors.main,
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("/sign-in", { state })}
                >
                  {lang === "en" ? "Sign in" : "سجل دخول"}
                </Typography>
              </Box>
              <AuthGoogle handleLoginGoogle={handleLoginGoogle} />
            </Box>
          </Stack>
        </form>
        <SmsVerficationModal
          setOpenModal={setOpenModal}
          openModal={openModal}
          verifySMSCode={verifySMSCode}
          userPhone={formik.values?.phone}
        />
      </Box>
    </Stack>
  );
};

export default SignUp;
