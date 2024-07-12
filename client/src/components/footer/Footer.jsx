
import {
  Box,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import lifeLogo from "../../assets/life-icon.png";
import flowersImageRight from "../../assets/life2.png";
import flowersImageLeft from "../../assets/life21.png";
import Logo from "../nav/Logo";
import { footerStyle } from "./FooterStyle";
import { Payment } from "./Payment";
import { FollowUs } from "./FollowUs";
import { ImportantLinks } from "./ImportantLinks";
import { ContactUs } from "./ContactUs";

const Footer = () => {

  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();

  const inProductDetails = pathname.includes('productDetails')

  return (
    <Box
      sx={{
        ...footerStyle,
        display:
          pathname === "/sign-in" ||
            pathname === "/register" || pathname === "/forgetPassword" ||
            pathname === "/ourTarget"
            ? "none"
            : "block",
        pb: { xs: 5 },
        background: `url(${flowersImageLeft}), url(${flowersImageRight}), #693096`,
        backgroundPosition: {
          xs: "left -20px bottom -30px, right -20px bottom -30px",
          md: "left -20px bottom -90px, right -20px bottom -90px",
        },
        backgroundSize: { xs: "200px, 200px", sm: "300px, 300px", md: "400px, 400px", lg: "auto, auto" },
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          width: {
            lg: 0.6,
            md: 0.7,
            sm: 0.8,
            xs: 0.9,
          },
        }}
      >

        <Box
          sx={{
            height: {
              md: 240,
              xs: 125,
            },
            width: {
              md: 240,
              xs: 125,
            },
            bgcolor: "#DCB8FF",
            borderRadius: "50%",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo imagePath={lifeLogo} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: "center",
            mt: 4,
            gap: { xs: 5, md: 40 },
          }}
        >
          <ImportantLinks />
          {/* <ContactUs /> */}
          <Payment />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box mt={2}>
            <FollowUs />
          </Box>
          <Box
            mt={4}
            sx={{
              display: "flex",
              alignItems: 'center',
              justifyContent: "center",
            }}>
            <Box
              sx={{
                width: '50%',
                marginBottom: inProductDetails ? 10 : 0,
                fontSize: {
                  xs: 14,
                  sm: 18,
                  md: 20,
                },
                textAlign: 'center',
                fontWeight: 'bold',
                display: "flex",
                alignItems: 'center',
                justifyContent: "center",
                color: 'white',
              }}>
              {lang === 'ar' ?
                'كل الحقوق محفوظة لمؤسسة نبات الحياة الحيوية @2024' :
                'All rights reserved to the Plant Life Foundation @2024'}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};
export default Footer;
