import { Box, CardMedia, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { contactFormik } from "./assets/contact.data";
import { useFormik } from "formik";
import ContactUsForm from "./mui/ContactUsForm";
import contactImage from "../../assets/contact.png";
import { useContactMutation } from "../../APIs/contactsApis";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ContactUsPage = () => {
  const [_, { language: lang }] = useTranslation();
  const [contact] = useContactMutation();
  const formik = useFormik({
    initialValues: contactFormik.values,
    validationSchema: Yup.object({
      name: Yup.string().required(
        lang === "en" ? "Name is required" : "الأسم مطلوب"
      ),
      email: Yup.string()
        .email(() => (lang === "en" ? "Invalid Email" : "بريد إلكتروني خاطئ"))
        .required(
          lang === "en" ? "Email is required" : "البريد الإلكتروني مطلوب"
        ),
      phone: Yup.string()
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
      message: Yup.string().required(
        lang === "en" ? "Message is required" : "الرسالة مطلوبة"
      ),
      contactType: Yup.string()
        .ensure()
        .oneOf(["complaints", "suggestions", "customerService"])
        .required(lang === "en" ? "Select Contact Type" : "اختار نوع التواصل"),
    }),
    onSubmit: (_, { resetForm }) => {
      contact(formik.values)
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lang}`]);
          resetForm();
        })
        .catch((err) => {
          toast.error(err?.data[`error_${lang}`]);
        });
    },
  });
  useEffect(() => {
    formik.validateForm();
  }, [lang]);
  return (
    <Box
      sx={{
        position: "relative",
        pt: {
          lg: "250px",
          md: "220px",
          xs: "125px",
        },
        pb: {
          lg: "100px",
          md: "70px",
          xs: "50px",
        },
        overflow: "hidden",
      }}
    >
      <Stack
        sx={{
          width: {
            lg: 0.8,
            md: 0.85,
            xs: 0.9,
          },
          mx: "auto",
          flexDirection: {
            md: "row",
            xs: "column-reverse",
          },
          overflow: "hidden",
          borderRadius: lang === "en" ? "0 100px 0 100px" : "100px 0 100px 0",
        }}
      >
        <ContactUsForm formik={formik} language={lang} />
        <Box
          sx={{
            height: {
              md: 863,
              xs: 500,
            },
            width: {
              md: 0.5,
              xs: 1,
            },
            backgroundImage: `url(${contactImage})`,
            backgroundSize: "cover",
            transform: lang === "en" ? "rotateY(180deg)" : 0,
          }}
        />
      </Stack>
    </Box>
  );
};

export default ContactUsPage;
