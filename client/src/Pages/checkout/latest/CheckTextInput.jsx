import { Box, InputBase, Typography } from "@mui/material";
import React from "react";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";

const CheckTextInput = ({
  label,
  error,
  value,
  name,
  type,
  touched,
  nestedLabel,
  handleChange,
  handleBlur,
  fullWidth,
  disabled,
  placeholder,
  setCreditFocus,
  creditCardNames,
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
        {label} {nestedLabel ? nestedLabel : undefined}
      </Typography>
      <InputBase
        disabled={disabled ? true : false}
        type={type}
        name={name}
        componentsProps={{
          input: { min: new Date().toISOString().slice(0, 10) },
        }}
        value={value}
        onChange={(e) => {
          handleChange(e);

          // setCreditFocus(creditCardNames);
        }}
        onBlur={handleBlur}
        placeholder={placeholder || ""}
        style={{
          width: "100%",
          border: `1px solid ${error && touched ? "red" : colors.main}`,
          borderRadius: "20px",
          fontSize: "20px",
          padding: "5px 15px",
          fontFamily: publicFontFamily,
          fontWeight: "bold",
        }}
      />
      {error && touched ? (
        <Typography
          sx={{
            fontFamily: publicFontFamily,
            fontSize: "17px",
            fontWeight: "bold",
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

export default CheckTextInput;
