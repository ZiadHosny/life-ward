export const publicFontFamily = "'El Messiri', sans-serif";
export const publicSizes = {
  header: {
    md: "60px",
    xs: "40px",
  },
  body: {
    md: "30px",
    xs: "25pxf",
  },
  xSmall: {
    lg: "15px",
    md: "14px",
    xs: "13px",
  },
  button: {
    xs: "13px",
    md: "16px",
    lg: "18px",
  },
};
export const colors = {
  newMainColor: "#00656D",
  newMainHeavyColor: "#C0924D",
  newLightColor: "#C19C70",
  lightYellow: "#C19C70",
  heavyYellow: "#D8B08E",
  lightGreen: "#99ECEA",
  grey: "#707070",
  main: "#693096",
  subMain: "#cda3f0",
  second: "#C19C70",
  productBackground: "#F2F2F2",
};

export const publicButton = {
  bgcolor: colors.newLightColor,
  color: "#fff",
  p: "10px 50px",
  transition: "0.3s all",
  fontFamily: publicFontFamily,
  fontWeight: "bold",
  borderRadius: "30px",
  "&:hover": {
    bgcolor: colors.heavyYellow,
  },
  "&:active": {
    transform: "scale(0.9)",
  },
};
