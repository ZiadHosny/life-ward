import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import GoogleLogo from "../../assets/google-color-svgrepo-com.svg";
const AuthGoogle = ({ handleLoginGoogle }) => {
  const [_, { language: lang }] = useTranslation();
  return (
    <ButtonBase
      onClick={handleLoginGoogle}
      sx={{
        color: "#4285F4",
        border: "2px solid #4285F4",
        mt: "20px",

        py: {
          xl: "11px",
          lg: "12px",
          xs: "11px",
        },
        px: "15px",
        // fontWeight: 'bold',
        borderRadius: "0px",
        width: { xs: "100%", md: "90%" },
        borderRadius: "15px",
        mx: "auto",
      }}
    >
      <Stack
        direction="row-reverse"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "90%",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xl: "25px",
                lg: "15px",
                md: "12px",
                sm: "18px",
                xs: "15px",
              },

              color: "#4285F4",
            }}
          >
            {lang === "en" ? "Login with google" : "تسجيل الدخول عن طريق جوجل"}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "12%",
            height: { xs: "30px", xl: "45px" },
          }}
        >
          <img
            src={GoogleLogo}
            alt="google"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Stack>
    </ButtonBase>
  );
};

export default AuthGoogle;
