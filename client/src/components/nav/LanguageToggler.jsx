import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { customDrawerIcon } from "./nav.styes";
import { useTranslation } from "react-i18next";
import { colors } from "../publicStyle/publicStyle";
import { useLocation } from "react-router-dom";
const LanguageToggler = () => {
  const [_, { language, changeLanguage }] = useTranslation();
  const { pathname } = useLocation();
  const toggleLanguage = () => {
    language === "en" ? changeLanguage("ar") : changeLanguage("en");
  };
  return (
    <Box>
      <Button
        onClick={toggleLanguage}
        sx={{
          fontWeight: "bold",
          width: {
            md: 50,
            xs: 40,
          },
          height: {
            md: 40,
            xs: 30,
          },
          minWidth: 0,
          borderRadius: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          mx: {
            lg: "5px",
            xs: "2px",
          },
          p: "0",
          "&:hover": {
            borderColor: colors.main,
            bgcolor: colors.main,
            span: {
              color: "#fff",
            },
          },
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: {
              lg: "20px",
              md: "18.5px",
              xs: "17px",
            },
            fontWeight: "bold",
            color: colors.main,
          }}
        >
          {language === "en" ? "AR" : "EN"}
        </Typography>
      </Button>
    </Box>
  );
};

export default LanguageToggler;
