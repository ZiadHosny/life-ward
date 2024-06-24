import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import { OccInput } from "./OccInput";
import { Stack } from "@mui/material";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { useUpdateOccasionMutation } from "../../APIs/occasionsApi";
import moment from "moment";
import { SelectImage } from "./SelectImg";
import { toast } from "react-toastify";
import SaPhoneInput from "../SaPhoneInput/SaPhoneInput";
export default function EditOccasionModal({ item }) {
  const [open, setOpen] = React.useState(false);
  const [updateOccasion] = useUpdateOccasionMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    formik.setFieldValue("icon", formik.values.icon);
  };
  const [_, { language: lang }] = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      description: "",
      icon: "",
      phone: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(lang === "en" ? "Required!" : "مطلوب!"),
      description: yup.string(),
      date: yup.date().required(lang === "en" ? "Required!" : "مطلوب!"),
      icon: yup.string().required(lang === "en" ? "Required!" : "مطلوب!"),
      phone: yup
        .string()
        // .matches(
        //   /^966\d{9}$/,
        //   language == "en"
        //     ? "Number must start by 966 then 9 numbers"
        //     : "يجب أن يبدأ الرقم بـ 966 ثم 9 أرقام"
        // )
        .matches(
          // /^966\d{9}$/,
          /^\d+$/,
          lang == "en"
            ? "Phone must be numbers only"
            : "رقم الجوال يجب ان يكون أرقام فقط"
        )
        .min(
          9,
          lang == "en"
            ? "Phone must be 9 numbers"
            : "رقم الجوال يجب ان يكون 9 أرقام"
        )
        .max(
          9,
          lang == "en"
            ? "Phone must be 9 numbers"
            : "رقم الجوال يجب ان يكون 9 أرقام"
        )
        .required(lang === "en" ? "Phone is required" : "رقم الجوال مطلوب"),
    }),
    onSubmit: () =>
      updateOccasion({
        id: item._id,
        payload: { ...formik.values, phone: `966${formik.values.phone}` },
      })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lang}`]);
          handleClose();
        })
        .catch((error) => {
          toast.error("error update", error?.data?.[`error_${lang}`]);
        }),
  });
  React.useEffect(() => {
    if (item) {
      formik.setFieldValue("name", item.name);
      formik.setFieldValue("description", item.description);
      formik.setFieldValue("icon", item.icon);
      formik.setFieldValue("phone", item.phone);
      formik.setFieldValue("date", moment(item.date).format("YYYY-MM-DD"));
    }
  }, [item]);
  React.useEffect(() => {
    if (open && item.icon !== formik.values.icon) {
      formik.setFieldValue("icon", item.icon);
    }
  }, [open]);
  return (
    <div>
      <Button
        sx={{
          minWidth: 0,
          width: 0,
        }}
        onClick={handleOpen}
      >
        <ModeOutlinedIcon
          sx={{
            cursor: "pointer",
          }}
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <OccInput
                width={{
                  md: 0.48,
                  xs: 1,
                }}
                type="text"
                value={formik.values.name}
                name="name"
                label={lang === "en" ? "Name" : "الاسم"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.name}
                touched={formik.touched.name}
              />
              <OccInput
                type="text"
                width={{
                  md: 0.48,
                  xs: 1,
                }}
                value={formik.values.description}
                name="description"
                label={lang === "en" ? "description" : "الوصف"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.description}
                touched={formik.touched.description}
              />
              {/* <OccInput
                width={1}
                type="text"
                name="phone"
                value={formik.values.phone}
                label={lang === "en" ? "Phone" : "رقم الجوال"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.phone}
                touched={formik.touched.phone}
              /> */}
              <SaPhoneInput
                fullWidth
                type="text"
                extraStyles={{
                  mt: "20px",
                }}
                name="phone"
                label={lang === "en" ? "Phone" : "رقم الجوال"}
                value={formik.values.phone}
                error={formik.errors.phone}
                touched={formik.touched.phone}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
              <OccInput
                width={1}
                type="date"
                name="date"
                value={formik.values.date}
                label={lang === "en" ? "Date" : "التاريخ"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.date}
                touched={formik.touched.date}
              />
              <SelectImage
                formik={formik}
                label={lang === "en" ? "Image" : "صورة"}
                open={open}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              mt={"50px"}
              gap={"50px"}
            >
              <Button
                type="submit"
                sx={{
                  bgcolor: `${colors.main} !important`,
                  border: 1,
                  borderColor: colors.main,
                  fontWeight: "900",
                  fontFamily: publicFontFamily,
                  color: "#fff",
                  borderRadius: "20px",
                  width: {
                    md: 125,
                    xs: 100,
                  },
                  fontSize: {
                    md: "19px",
                    xs: "16px",
                  },
                }}
              >
                {lang === "en" ? "Save" : "حفظ"}
              </Button>
              <Button
                sx={{
                  bgcolor: "#ffff",
                  border: 1,
                  borderColor: colors.main,
                  fontWeight: "900",
                  fontFamily: publicFontFamily,
                  color: colors.main,
                  borderRadius: "20px",
                  width: {
                    md: 125,
                    xs: 100,
                  },
                  fontSize: {
                    md: "19px",
                    xs: "16px",
                  },
                }}
                onClick={() => {
                  handleClose();
                }}
              >
                {lang === "en" ? "Cancel" : "إلغاء"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    md: 600,
    xs: 0.9,
  },
  height: {
    md: "auto",
    xs: "90%",
  },
  overflow: {
    md: "auto",
    xs: "scroll",
  },

  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};
