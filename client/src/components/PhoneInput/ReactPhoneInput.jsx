import { Box, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import "./phoneinput.css";
const ReactPhoneInput = ({ error,value, setFieldValue }) => {

  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        width: {
          md: 0.49,
          xs: 1,
        },
      }}
    >
      <Typography
        fontFamily={publicFontFamily}
        fontWeight={"bold"}
        sx={{
          color: colors.main,
          fontSize: {
            md: "19px",
            xs: "17.5px",
          },
        }}
      >
        {language === "en" ? "Phone" : "  رقم الجوال"}
      </Typography>
      <PhoneInput
        country={"eg"}
        value={value}
        className="error"
        onChange={(data) => setFieldValue("phone", `+${data}`)}
        style={{
        //   direction: language === "en" ? "ltr" : "rtl",
        }}
      />

     {error&&<Typography
      fontFamily={publicFontFamily}
      fontWeight={"bold"}
      sx={{
        color: "red",
        fontSize: {
          md: "19px",
          xs: "17.5px",
        },
      }}
    >
      {language === "en" ? "Phone is required" :"رقم الجوال مطلوب" }
    </Typography>} 
    </Box>
  );
};
export default ReactPhoneInput;
