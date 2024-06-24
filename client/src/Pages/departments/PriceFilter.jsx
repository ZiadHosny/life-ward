import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useFormik } from "formik";
import { object, number } from "yup";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const PriceFilter = ({
  setPriceState,
  priceSearchedClicked,
  setPriceSearchedClicked,
}) => {
  const [_, { language: lang }] = useTranslation();
  const formik = useFormik({
    initialValues: { from: 0, to: 0 },
    validationSchema: object({
      from: number().min(0),
      to: number().min(1),
    }),
    onSubmit: () => {
      setPriceState(values);
      setPriceSearchedClicked(true);
    },
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    errors,
    touched,
  } = formik;
  const clearPriceFilter = () => {
    setPriceState({
      from: 0,
      to: 0,
    });
    formik.resetForm();
    setPriceSearchedClicked(false);
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 200,
        }}
      >
        <Box
          sx={{
            width: 0.45,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: colors.main,
              fontFamily: publicFontFamily,
              fontWeight: "bold",
            }}
          >
            {lang === "en" ? "From" : "من"}
          </Typography>
          <InputBase
            name="from"
            type="number"
            value={values.from}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{
              border: `1px solid ${
                errors.from && touched.from ? "red" : "#ddd"
              } `,
            }}
          />
        </Box>
        <Box
          sx={{
            width: 0.45,
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: colors.main,
              fontFamily: publicFontFamily,
              fontWeight: "bold",
            }}
          >
            {lang === "en" ? "To" : "إلي"}
          </Typography>
          <InputBase
            type="number"
            name="to"
            value={values.to}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{
              border: `1px solid ${errors.to && touched.to ? "red" : "#ddd"} `,
            }}
          />
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={"5px"}
      >
        <Button
          type="submit"
          sx={{
            mt: "10px",
            fontFamily: publicFontFamily,
            fontWeight: "bold",
            fontSize: "13px",
            border: `1px solid ${colors.main}`,
            color: colors.main,
          }}
        >
          {lang === "en" ? "Search by price" : "بحث بالسعر"}
        </Button>
        {priceSearchedClicked ? (
          <CloseIcon
            sx={{ cursor: "pointer", mt: "7.5px" }}
            onClick={clearPriceFilter}
          />
        ) : null}
      </Stack>
    </Box>
  );
};

export default PriceFilter;
