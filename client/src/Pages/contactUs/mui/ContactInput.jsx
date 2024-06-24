import { Box, InputBase, Stack, Typography } from "@mui/material";
import React from "react";
import { ContactColors, InputBoxStyle } from "../assets/contactStyle";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";

const ContactTextInput = ({
  index,
  value,
  label,
  error,
  touched,
  name,
  placeholder,
  handleChange,
  handleBlur,
  radius,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        pb: 1,
        mt: 3.5,
      }}
    >
      <Typography
        sx={{
          fontFamily: publicFontFamily,
          color: colors.main,
          fontWeight: "bold",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ ...InputBoxStyle, width: 1 }}>
        <InputBase
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          sx={{
            bgcolor: "transparent",
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            px: "10px",
            color: colors.main,
            borderRadius: "20px",
            border:
              error && touched
                ? `1.5px solid red`
                : `1.5px solid ${colors.main}`,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Typography
          sx={{
            fontSize: "12px",
            fontFamily: publicFontFamily,
          }}
        >
          {error && touched ? error : undefined}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactTextInput;
