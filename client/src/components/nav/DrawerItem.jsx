import React, { useState } from "react";
import { Stack, CardMedia, Typography, Button } from "@mui/material";
import { imageBaseUrl } from "../../components/service";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors } from "../../Pages/home/homeStyle";
const DrawerItem = ({ name, data }) => {
  const [_, { language }] = useTranslation();
  return (
    <Stack direction="column" mt={3} sx={{ gap: 5, height: "95vh" }}>
      {data &&
        data.map((item) => (
          <Stack
            key={item?.product?.title}
            direction="row"
            sx={{ justifyContent: "space-around", padding: 2 }}
          >
            <CardMedia
              component="img"
              src={`${imageBaseUrl}/${item?.product?.images}`}
              sx={{ width: "20%" }}
            />
            <Typography color="black">{item?.product?.title}</Typography>
          </Stack>
        ))}
      <Link to={name === "likes" ? "/savedProducts" : "/cart"}>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: "100%",
            background: colors.heavyMainColor,
          }}
        >
          {name === "likes"
            ? language === "en"
              ? "Saved Products"
              : "المنتجات المحفوظة"
            : language === "en"
            ? "Cart"
            : "عربة التسوق"}
        </Button>
      </Link>
    </Stack>
  );
};

export default DrawerItem;
