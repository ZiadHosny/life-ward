export default {
  badge: {
    display: "block",
    width: { xs: "160px", sm: "180px", md: "150px", lg: "260px" },
    height: {
      xs: "160px",
      sm: "180px",
      md: "150px",
      lg: "260px",
    },
    mx: "auto",
    mb: 5,
  },
  avatar: {
    // border: `1px solid ${colors.primaryBgColor}`,
    border: `1px solid #693096`,
    width: 1,
    height: "100%",
    "& .MuiAvatar-img": {
      objectFit: "fill",
    },
  },
  EditIcon: {
    bgcolor: `#693096 !important`,
  },
};
