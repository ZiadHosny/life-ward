import { Avatar, Box, CardMedia } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoStyles } from "./nav.styes";

function Logo({ imagePath, isNavbar, extraStyles }) {
  const navigate = useNavigate();
  return (
    <Box sx={logoStyles} onClick={() => navigate("/")}>
      {imagePath && (
        <CardMedia
          component="img"
          sx={{
            height: {
              md: isNavbar ? 80 : 180,
              xs: 50,
            },
            width: {
              md: isNavbar ? 55 : 1,
              xs: 35,
            },
            objectFit: "contain",
            borderRadius: 0,
            mx: "auto",
            transform: "rotate(0)",
            ...extraStyles,
          }}
          src={imagePath}
        />
      )}
    </Box>
  );
}

export default Logo;
