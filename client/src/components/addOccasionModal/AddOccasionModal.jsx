import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OccInput } from "./OccInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAddOccasionMutation } from "../../APIs/occasionsApi";
import { toast } from "react-toastify";
import { SelectImage } from "./SelectImg";
import { useSelector } from "react-redux";
import SaPhoneInput from "../SaPhoneInput/SaPhoneInput";
export default function AddOccasionDrawer() {
  const [_, { language: lang }] = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [addOccasion] = useAddOccasionMutation();
  const toggleDrawer = (boolean) => setOpen(boolean);
  const { currentUser } = useSelector((state) => state);
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
      addOccasion({ ...formik.values, phone: `966${formik.values.phone}` })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lang}`]);
          toggleDrawer(false);
          formik.resetForm();
        })
        .catch((error) => {
          toast.error(error.data[`error_${lang}`]);
        }),
  });
  React.useEffect(() => {
    if (!open) {
      formik.resetForm();
    } else {
      formik.setFieldValue(
        "phone",
        currentUser?.phone ? currentUser.phone : ""
      );
    }
  }, [open]);

  return (
    <Box>
      <Button
        sx={{
          bgcolor: `#fff !important`,
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "15px",
        }}
        endIcon={
          <AddIcon
            sx={{
              color: colors.main,
            }}
          />
        }
        onClick={() => toggleDrawer(true)}
      >
        <Typography
          sx={{
            fontWeight: 999,
            fontFamily: publicFontFamily,
            color: colors.main,
            mx: "10px",
          }}
        >
          {lang === "en" ? "Add Occasion" : " إضافة مناسبة "}
        </Typography>
      </Button>
      <Drawer
        open={open}
        onClose={() => toggleDrawer(false)}
        sx={{
          transition: "15s all !important",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 1,
            bgcolor: "#fff",
            overflowY: {
              md: "auto",
              xs: "scroll",
            },

            pt: 6,
            px: 3,
          },
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          sx={{
            width: 0.9,
            m: "50px auto 60px",
          }}
        >
          <CloseIcon
            sx={{
              color: colors.main,
              fontSize: "33px",
              cursor: "pointer",
            }}
            onClick={() => toggleDrawer(false)}
          />
        </Stack>
        <Box
          component="form"
          sx={{
            width: {
              md: 0.8,
              xs: 0.92,
            },
            mx: "auto",
            height: 400,
          }}
          onSubmit={formik.handleSubmit}
        >
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
            {/* <OccInput
              width={{
                md: 0.48,
                xs: 1,
              }}
              type="text"
              value={formik.values.name_ar}
              name="name_ar"
              label={lang === "en" ? "Arabic Name" : "الاسم بالعربي"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name_ar}
              touched={formik.touched.name_ar}
            /> */}
            <OccInput
              type="text"
              width={{
                md: 0.48,
                xs: 1,
              }}
              value={formik.values.description}
              name="description"
              label={lang === "en" ? "Description" : "الوصف"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.description}
              touched={formik.touched.description}
            />
            <SaPhoneInput
              width={{
                md: 0.48,
                xs: 1,
              }}
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
              width={{
                md: 0.48,
                xs: 1,
              }}
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
              width={{
                md: 0.48,
                xs: 1,
              }}
              formik={formik}
              label={lang === "en" ? "Image" : "صورة"}
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
                width: 125,
                fontSize: "19px",
              }}
            >
              {lang === "en" ? "Save" : "حفظ"}
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
