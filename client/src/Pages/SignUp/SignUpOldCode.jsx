import { Grid, Box, Stack, ButtonBase, Typography } from "@mui/material";
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
import { colors } from "../../components/publicStyle/publicStyle";
import image from "../../assets/Group.png";
import { useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import PhoneIcon from "@mui/icons-material/Phone";
const SignUp = () => {
  const [moreFields, setMoreFields] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName_en: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .required(
          lang === "en" ? "First name is required*" : "*الاسم الاول مطلوب"
        ),
      lastName: yup
        .string()
        .required(
          lang === "en" ? "Last name is required*" : "*الاسم الاخير مطلوب"
        ),
      userName_en: yup
        .string()
        .required(
          lang === "en" ? "Username is required*" : "*الاسم المستخدم مطلوب"
        ),
      phone: yup
        .number()
        .required(lang === "en" ? "Phone is required*" : "*رقم الهاتف مطلوب"),
      email: yup
        .string()
        .email()
        .required(
          lang === "en" ? "Email is required*" : "*البريد الالكتروني مطلوب"
        ),
      password: yup
        .string()
        .required(
          lang === "en" ? "Password is required*" : "*كلمة المرور مطلوب"
        ),
      creditCard: yup.number(),
      expirationDate: yup.date(),
      protectionSymbol: yup.number(),
    }),
    onSubmit: (values) => {
      signUp(values);
    },
  });
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        width: "100vw",
        py: "150px",
      }}
    >
      <Paper
        elevation={10}
        sx={{ minWidth: "90%", padding: "15px" }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "15px",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            name="firstName"
            label={language === "en" ? "First name" : "الإسم الأول"}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <Typography
              fontWeight={"bold"}
              fontSize={13}
              variant="p"
              color="red"
            >
              {formik.errors.firstName}
            </Typography>
          )}

          <TextField
            sx={{ width: "100%" }}
            name="lastName"
            label={language === "en" ? "Last name" : "الإسم الأخير"}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <Typography
              fontWeight={"bold"}
              fontSize={13}
              variant="p"
              color="red"
            >
              {formik.errors.lastName}
            </Typography>
          )}
          <TextField
            sx={{ width: "100%" }}
            name="userName_en"
            label={language === "en" ? "User name" : "إسم المستخدم"}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.userName_en}
            onChange={formik.handleChange}
          />
          {formik.errors.userName_en && formik.touched.userName_en && (
            <Typography
              fontWeight={"bold"}
              fontSize={13}
              variant="p"
              color="red"
            >
              {formik.errors.userName_en}
            </Typography>
          )}

          <TextField
            label={language === "en" ? "Phone number" : "رقم الجوال"}
            type="number"
            name="phone"
            onBlur={formik.handleBlur}
            defaultValue={formik.values.phone}
            onChange={formik.handleChange}
          />

          {formik.errors.phone && formik.touched.phone && (
            <Typography
              fontWeight={"bold"}
              fontSize={13}
              variant="p"
              color="red"
            >
              {formik.errors.phone}
            </Typography>
          )}
          <TextField
            sx={{ width: "100%" }}
            name="email"
            type="email"
            label={language === "en" ? "Email" : "البريد الإلكتروني"}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <Typography
              fontWeight={"bold"}
              fontSize={13}
              variant="p"
              color="red"
            >
              {formik.errors.email}
            </Typography>
          )}
          <TextField
            sx={{ width: "100%" }}
            name="password"
            type="password"
            label={language === "en" ? "Password" : "كلمة المرور"}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <Typography
              fontWeight={"bold"}
              fontSize={13}
              variant="p"
              color="red"
            >
              {formik.errors.password}
            </Typography>
          )}

          <FormControlLabel
            control={<Checkbox onChange={() => setMoreFields(!moreFields)} />}
            label={language === "en" ? "More fields" : "حقول أخرى"}
          />

          {moreFields && (
            <>
              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="creditCard"
                label={language === "en" ? "credit card" : "البطاقة البنكية"}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.creditCard}
                onChange={formik.handleChange}
              />
              {formik.errors.creditCard && formik.touched.creditCard && (
                <Typography
                  fontWeight={"bold"}
                  fontSize={13}
                  variant="p"
                  color="red"
                >
                  {formik.errors.creditCard}
                </Typography>
              )}
              <TextField
                type="date"
                sx={{ width: "100%" }}
                name="expirationDate"
                label={language === "en" ? "expiration date" : "تاريخ الإنتهاء"}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.expirationDate}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {formik.errors.expirationDate &&
                formik.touched.expirationDate && (
                  <Typography
                    fontWeight={"bold"}
                    fontSize={13}
                    variant="p"
                    color="red"
                  >
                    {formik.errors.creditCard}
                  </Typography>
                )}

              <TextField
                sx={{ width: "100%" }}
                type="number"
                name="protectionSymbol"
                label={language === "en" ? "Protection symbol" : "رمز الحماية"}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.protectionSymbol}
                onChange={formik.handleChange}
              />
              {formik.errors.protectionSymbol &&
                formik.touched.protectionSymbol && (
                  <Typography
                    fontWeight={"bold"}
                    fontSize={13}
                    variant="p"
                    color="red"
                  >
                    {formik.errors.protectionSymbol}
                  </Typography>
                )}
            </>
          )}
          <Button
            sx={{ alignSelf: "center" }}
            variant="contained"
            color="success"
            type="submit"
          >
            {language === "en" ? "Sign up" : "تسجيل حساب جديد"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
