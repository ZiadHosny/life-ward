import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { publicFontFamily } from "../../../components/publicStyle/publicStyle";

const UploadFile = ({
  label,
  setState,
  error,
  isTouched,
  language,
  acceptFile,
}) => {
  return (
    <Box
      sx={{
        px: "20px",
      }}
    >
      <Button
        variant="contained"
        component="label"
        sx={{
          width: "auto",
          backgroundColor: "#fff !important",
          color: "#693096",
          justifyContent: "flex-start",
          padding: "15px",
          border: 1,
          borderColor: error && isTouched ? "red" : "divider",
          textTransform: "capitalize",
          fontFamily: publicFontFamily,
          fontWeight: "bold",
          label: {
            textAlign: language === "en" ? "left" : "right",
          },
          "&.css-tde0b5-MuiButtonBase-root-MuiButton-root": {
            boxShadow: "0 important",
            color: "red",
            width: "100%",
            fontFamily: publicFontFamily,
          },
        }}
      >
        {label}
        <input
          type="file"
          accept={acceptFile ? acceptFile : undefined}
          hidden
          onChange={(e) => setState(e.target.files[0])}
        />
      </Button>
      {error && isTouched ? (
        <Typography
          sx={{
            mt: "5px",
            color: "red",
            fontSize: "12px",
            fontWeight: "bold",
            fontFamily: publicFontFamily,
          }}
        >
          {error}
        </Typography>
      ) : undefined}
    </Box>
  );
};

export default UploadFile;
