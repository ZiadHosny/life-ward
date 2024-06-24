import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import CheckTextInput from "../../Pages/checkout/latest/CheckTextInput";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputBase, Stack } from "@mui/material";
import { set } from "immutable";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

export default function SmsVerficationModal({
  setOpenModal,
  openModal,
  verifySMSCode,
  userPhone,
}) {
  const [_, { language: lang }] = useTranslation();
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required(
        lang === "en" ? "Code is required" : "الرمز مطلوب"
      ),
    }),
    onSubmit: () => verifySMSCode({ ...values, phone: userPhone }),
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;
  return (
    <Box>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Box
            component={"div"}
            onClick={() => {
              setOpenModal(false);
               
            }}
          >
            <CloseIcon
              on
              color="#000"
              sx={{ width: "20px", cursor: "pointer" }}
            />
          </Box>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontFamily: publicFontFamily,
              fontWeight: "bolder",
            }}
          >
            {lang === "en" ? "verify sms code" : "تحقق من رمز الرسالة القصيرة"}
          </Typography>
          <Box
            sx={{
              pb: "20px",
              position: "relative",
              my: "10px",
            }}
          >
            <InputBase
              type={"text"}
              name={"code"}
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: "100%",
                border: `1px solid ${
                  errors.code && touched.code ? "red" : colors.main
                }`,
                borderRadius: "20px",
                fontSize: "20px",
                padding: "5px 15px",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
              }}
            />
            {errors.code && touched.code ? (
              <Typography
                sx={{
                  fontFamily: publicFontFamily,
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  bottom: 0,
                  color: "red",
                }}
              >
                {errors.code}
              </Typography>
            ) : undefined}
          </Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center "}
            mt={"20px"}
          >
            <Button
              type="submit"
              sx={{
                fontFamily: publicFontFamily,
                bgcolor: `${colors.main} !important`,
                color: "#fff",
                px: "50px",
                fontSize: {
                  md: "initial",
                  xs: "13.5px",
                },
                transition: "0.4s all",
                textTransform: "none",
                fontWeight: "bold",
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              {lang === "en" ? "confirm" : "تأكيد"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
