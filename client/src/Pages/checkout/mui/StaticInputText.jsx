import { Box, InputBase, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
const StaticInputText = ({
  value,
  error,
  touched,
  label,
  handleChange,
  handleBlur,
  name,
  type,
  index,
}) => {
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        position: "relative",
        pb: 1.5,
      }}
    >
      <Typography
        fontFamily={publicFontFamily}
        fontWeight={"bold"}
        sx={{
          color: colors.main,
          mb: "5px",
        }}
      >
        {label}
      </Typography>

      <InputBase
        label={label}
        type={type}
        name={name}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{
          mx: "auto",
          width: {
            md: 0.97,
            xs: 1,
          },
          py: 1,
          px: 2,
          borderRadius: "40px",
          border: 2,
          borderColor: touched && error ? "red" : colors.main,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10px",
          left:
            language === "en"
              ? {
                  md: index % 2 === 0 ? 0 : "5%",
                  xs: 0,
                }
              : undefined,
          right:
            language === "ar"
              ? {
                  md: index % 2 === 0 ? 0 : "5%",
                  xs: 0,
                }
              : undefined,
        }}
      >
        <Typography
          sx={{
            color: "red",
            fontSize: "12px",
            fontWeight: "bolder",
          }}
        >
          {error && touched ? error : undefined}
        </Typography>
      </Box>
    </Box>
  );
};

export default StaticInputText;
