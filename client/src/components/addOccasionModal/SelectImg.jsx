import React, { useEffect } from "react";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { Box, CardMedia, InputBase, Stack, Typography } from "@mui/material";
import GetAttributesData from "../../Pages/departments/attributesData";

export const SelectImage = ({ formik, label, width }) => {
  const {occasionsData}=GetAttributesData();
  const { setValues, values, setFieldValue } = formik;
  const handleSelectImg = (item) => {
    setValues((values) => ({
      ...values,
      icon: item.name,
    }));
  };

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

      <Stack
        sx={{
          mt: "5px",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px",
          p: {
            md: "20px",
            xs: "15px",
          },
          borderRadius: "20px",
          border: `1px solid ${
            formik.errors.icon && formik.touched.icon ? "red" : colors.main
          }`,
          // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        }}
      >
        {occasionsData.map((item) => (
          <CardMedia
            component={"img"}
            src={item.image}
            sx={{
              height: 75,
              width: 75,
              objectFit: "contain",
              border: 1,
              borderColor:
                values.icon === item.name ? colors.main : "transparent",
              borderRadius: "5px",
              cursor: "pointer",
              p: "10px",
            }}
            onClick={() => handleSelectImg(item)}
          />
        ))}
      </Stack>
      {formik.errors.icon && formik.touched.icon && (
        <Typography
          color="red"
          sx={{
            fontFamily: publicFontFamily,
          }}
        >
          {formik.errors.icon}
        </Typography>
      )}
    </Box>
  );
};
