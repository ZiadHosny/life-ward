import { colors } from "../publicStyle/publicStyle";

export const footerStyle = {
  color: "#fff",
  bgcolor: colors.main,
  py: "40px",
  position: "relative",
  overflow: "hidden",
};
export const iconBoxStyle = {
  color: "blue",
  px: 2.1,
  py: 1.2,
  display: "inline",
  svg: {
    color: footerStyle.color,
  },
};
