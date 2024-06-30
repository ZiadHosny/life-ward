import { Box, InputBase, Typography } from "@mui/material";
import React from "react";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";

const SaPhoneInput = ({
  label,
  error,
  value,
  name,
  type,
  touched,
  handleChange,
  handleBlur,
  fullWidth,
  disabled,
  placeholder,
  extraStyles,
}) => {
  return (
    <Box
      sx={{
        width: fullWidth
          ? 1
          : {
            md: 0.49,
            xs: 1,
          },
        pb: "20px",
        position: "relative",
        ...extraStyles,
      }}
    >
      <Typography
        fontFamily={publicFontFamily}
        fontWeight={"bold"}
        sx={{
          color: colors.main,
          fontSize: {
            md: "19px",
            xs: "17.5px",
          },
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          border: `1px solid ${error && touched ? "red" : colors.main}`,
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "10px",
          gap: "6px",
          direction: "ltr",
        }}
      >
        <Typography
          sx={{ mb: "0px", fontWeight: "bold", fontFamily: publicFontFamily }}
        >
          +966
        </Typography>
        <InputBase
          disabled={disabled ? true : false}
          type={type}
          name={name}
          // componentsProps={{
          //   input: { min: new Date().toISOString().slice(0, 10) },
          // }}
          value={value}
          onChange={(e) => {
            if (e.target.value.length >= 12 && e.target.value.startsWith('966')) {
              e.target.value = e.target.value.split('966')[1]
            }
            else if (e.target.value.length >= 13 && e.target.value.startsWith('+966')) {
              e.target.value = e.target.value.split('+966')[1]
            }
            handleChange(e);
          }}
          onBlur={handleBlur}
          placeholder={placeholder || ""}
          style={{
            width: "100%",
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            height: "100%",
            direction: "ltr",
          }}
        />
      </Box>
      {error && touched ? (
        <Typography
          sx={{
            fontFamily: publicFontFamily,

            position: "absolute",
            bottom: 0,
            color: "red",
          }}
        >
          {error}
        </Typography>
      ) : undefined}
    </Box>
  );
};

export default SaPhoneInput;
