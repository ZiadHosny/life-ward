import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { contactFormik } from "../assets/contact.data";
import {
  ContactColors,
  InputBoxStyle,
  SubmitBtnStyle,
} from "../assets/contactStyle";
import ContactTextInput from "./ContactInput";
import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../../../components/publicStyle/publicStyle";
import SaPhoneInput from "../../../components/SaPhoneInput/SaPhoneInput";

const ContactUsForm = ({ formik, language }) => {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    formik;
  const textareaRef = useRef(null);
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: {
          md: 0.5,
          xs: 1,
        },
        py: {
          xl: "40px",
          md: "30px",
          xs: "25px",
        },
        px: {
          xl: "100px",
          lg: "80px",
          md: "60px",
          xs: "30px",
        },
        bgcolor: "#DBCDE6",
      }}
    >
      <ContactTextInput
        index={0}
        value={values.name}
        error={errors.name}
        touched={touched.name}
        label={language === "en" ? "Name" : "الأسم"}
        name="name"
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <ContactTextInput
        index={0}
        value={values.email}
        error={errors.email}
        touched={touched.email}
        label={language === "en" ? "Email" : "البريد الإلكتروني"}
        name="email"
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      {/* <ContactTextInput
        index={0}
        value={values.phone}
        error={errors.phone}
        touched={touched.phone}
        label={language === "en" ? "phone" : "الجوال"}
        name="phone"
        handleChange={handleChange}
        handleBlur={handleBlur}
      /> */}
      <SaPhoneInput
        type="text"
        name="phone"
        label={language === "en" ? "Phone" : "رقم الجوال"}
        value={values.phone}
        error={errors.phone}
        touched={touched.phone}
        handleChange={handleChange}
        handleBlur={handleBlur}
        fullWidth
      />
      <Box
        sx={{
          position: "relative",
          pb: 1.5,
          mt: 2,
        }}
      >
        <Box sx={InputBoxStyle}>
          <select
            value={values.contactType}
            name="contactType"
            style={{
              backgroundColor: "transparent",
              width: "100%",
              padding: "18px 0",
              color: colors.main,
              fontFamily: publicFontFamily,
              fontSize: "16px",
              fontWeight: "bold",
              outline: 0,
              boxShadow: 0,
              borderTop: 0,
              borderLeft: 0,
              borderRight: 0,
              borderRadius: "20px",
              border:
                errors.contactType && touched.contactType
                  ? `1.5px solid red `
                  : `1.5px solid ${colors.main} `,
            }}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="select one" hidden selected>
              {language === "en" ? "Select Contact Type" : "أختار نوع التواصل"}
            </option>
            <option
              value="complaints"
              style={{
                color: "#000",
                fontWeight: "bold",
              }}
            >
              {language === "en" ? "Complaints" : "الشكاوي"}
            </option>
            <option
              value="suggestions"
              style={{
                color: "#000",
                fontWeight: "bold",
              }}
            >
              {language === "en" ? "Suggestions" : "الاقتراحات"}
            </option>
            <option
              value="customerService"
              style={{
                color: "#000",
                fontWeight: "bold",
              }}
            >
              {language === "en" ? "Customer Service" : "خدمة العملاء"}
            </option>
          </select>
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: publicFontFamily,
            }}
          >
            {errors.contactType && touched.contactType
              ? errors.contactType
              : undefined}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: publicFontFamily,
          display: "flex",
          justifyContent: {
            md: "flex-end",
            xs: "center",
          },
          position: "relative",
          pb: 0.8,
          mt: 2,
        }}
      >
        <Box sx={{ ...InputBoxStyle, width: 1, mt: "5px" }}>
          <label
            style={{
              fontFamily: publicFontFamily,
              color: colors.main,
              fontWeight: "bold",
            }}
          >
            {language === "en" ? "Write your message" : "أكتب رسالتك"}
          </label>
          <textarea
            value={values.message}
            name="message"
            placeholder={language === "en" ? "Message" : "الرسالة"}
            style={{
              width: "100%",
              padding: "12px 16px",
              height: "200px",
              backgroundColor: "transparent",
              fontFamily: publicFontFamily,
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "20px",
              color: values.message ? colors.main : "#BCD6D9",

              border:
                errors.message && touched.message
                  ? "1.5px solid red"
                  : `1.5px solid ${colors.main}`,
              outline: 0,
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={textareaRef}
            onClick={() => textareaRef.current.focus()}
          />

          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: publicFontFamily,
            }}
          >
            {errors.message && touched.message ? errors.message : undefined}
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" justifyContent="center" mt="10px">
        <Button
          sx={{
            ...SubmitBtnStyle,
            transition: "all 0.3s",
            px: {
              md: "50px",
              xs: "30px",
            },
            py: {
              md: "10px",
              xs: "6.5px",
            },
            "&:active": {
              transform: "scale(0.9)",
            },
          }}
          type="submit"
        >
          {contactFormik[`ButtonContext_${language}`]}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactUsForm;
