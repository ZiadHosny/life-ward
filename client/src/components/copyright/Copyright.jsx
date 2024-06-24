import { Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { publicFontFamily } from "../../components/publicStyle/publicStyle";
import {
  copyrightColor,
  copyrightStyle,
  copyrightText,
} from "./copyrightAssets";
import { useLocation } from "react-router-dom";
const Copyright = () => {
  const [_, { language }] = useTranslation();
  const { pathname } = useLocation();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        ...copyrightStyle,
        display:
          pathname === "/sign-in" || pathname === "/register"
            ? "none"
            : "flex",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            md: "17px",
            xs: "13.5px",
          },
          fontFamily: publicFontFamily,
        }}
      >
        {copyrightText[language]}{" "}
        <a
          href="https://www.sarri.sa/"
          target="_blank"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {language === "en" ? "Sarri" : "صاري"}
        </a>
      </Typography>
    </Stack>
  );
};

export default Copyright;
