import { Box, Typography } from "@mui/material";
import React from "react";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";

const CheckTextArea = ({
  label,
  error,
  value,
  name,
  type,
  touched,
  nestedLabel,
  handleChange,
  handleBlur,
}) => {
  return (
    <Box
      sx={{
        p: "20px",
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
      <textarea
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          width: "100%",
          outline: 0,
          border: `1px solid ${error && touched ? "red" : colors.main}`,
          borderRadius: "20px",
          fontSize: "20px",
          padding: "5px 15px",
          fontFamily: publicFontFamily,
          fontWeight: "bold",
          height: "150px",
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

export default CheckTextArea;
