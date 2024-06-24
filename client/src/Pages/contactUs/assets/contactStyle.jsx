import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";

export const ContactColors = {
  main: "#CEF6F5",
  light: "#FEF6F3",
};
export const iconBoxStyle = {
  color: "#fff",
  svg: {
    color: "#fff",
    height: 40,
    width: 40,
  },
};

export const InputBoxStyle = {
  positon: "relative",
  pb: 1.2,
  ".MuiInputBase-root": {
    p: 1,
    width: 1,
    // backgroundColor: colors.light,
  },
  ".MuiTypography-root": {
    color: "red",
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
  },
};

export const SubmitBtnStyle = {
  bgcolor: `${colors.main} !important`,
  fontFamily: publicFontFamily,
  color: "#fff",
  py: 1,
  px: 3,
  fontWeight: "bold",
  textTransform: "capitalize",
  borderRadius: "40px",
};
