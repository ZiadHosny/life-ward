import React from "react";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { Box, InputBase, Typography } from "@mui/material";

export const OccInput = ({
  error,
  touched,
  type,
  label,
  width,
  ...restProps
}) => {
  return (
    <Box
      sx={{
        mt: "20px",
        width,
      }}
    >
      <Typography
        component="label"
        sx={{
          fontFamily: publicFontFamily,
          fontWeight: "bold ",
          color: colors.main,
        }}
      >
        {label}
      </Typography>

      <InputBase
        {...restProps}
        type={type}
        sx={{
          mt: "5px",
          display: "block",
          backgroundColor: "#fff",
          p: "10px 15px",
          borderRadius: "40px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          fontFamily: publicFontFamily,
          border: `1px solid ${error && touched ? "red" : colors.main}`,
        }}
      />
      {error && touched && (
        <Typography
          color="red"
          sx={{
            fontFamily: publicFontFamily,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
