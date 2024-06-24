import React from "react";
import { Box, CardMedia, styled } from "@mui/material";
import { colors } from "../../components/publicStyle/publicStyle";
import MaskGroudImg from "../../assets/Mask_Group.png";
import AMExImg from "../../assets/AMEX.png";
import tabbyImg from "../../assets/tabby_logo.png";
import visaImg from "../../assets/visa.png";
const ShippingFooter = () => {
  const imgaes = [MaskGroudImg, AMExImg, tabbyImg, visaImg];
  const StyledImage = styled(CardMedia)({});
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: {
          lg: "50px",
          md: "40px",
          xs: "30px",
        },
        py: "10px",
        bgcolor: colors.second,
      }}
    >
      {imgaes.map((image) => (
        <StyledImage
          component="img"
          src={image}
          index={image}
          sx={{
            objectFit: "contain",
            width: 35,
            height: 35,
          }}
        />
      ))}
    </Box>
  );
};

export default ShippingFooter;
