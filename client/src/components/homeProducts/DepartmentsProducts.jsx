import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { CardsStackStyle } from "../cards/cardStyle";
import { useLocation } from "react-router-dom";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import ProductCard from "../productCard/ProductCard";
import { useTranslation } from "react-i18next";

const DepartmentsProducts = ({ title, items }) => {
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  return (
    <Box
      p={4}
      sx={{
        direction: "ltr !important",
        width: {
          xl: 1500,
          lg: 1100,
          xs: 1,
        },
        mx: "auto",
      }}
      key={title ? title : undefined}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={CardsStackStyle.cardsHeader}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bolder",
            textTransform: "capitalize",
            bgcolor: pathname === "/" ? "transparent" : undefined,
            color: colors.grey,
            fontWeight: "bold",
            fontFamily: publicFontFamily,
            mb: {
              md: "50px",
              xs: "35px",
            },
            py: {
              lg: "20px",
              xs: "16px",
            },
            fontSize: {
              xl: "60px",
              lg: "55px",
              md: "45px",
              xs: "40px",
            },
            borderRadius:
              pathname === "/"
                ? language === "en"
                  ? "0 50px 50px 0"
                  : "50px 0 0 50px"
                : 0,
            color: colors.main,
          }}
        >
          {title}
        </Typography>
      </Stack>
      <Grid container sx={{ gap: 'auto' }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProductCard item={items[0]} />
          <ProductCard item={items[1]} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProductCard item={items[2]} />
          <ProductCard item={items[3]} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProductCard item={items[4]} />
          <ProductCard item={items[5]} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DepartmentsProducts;
