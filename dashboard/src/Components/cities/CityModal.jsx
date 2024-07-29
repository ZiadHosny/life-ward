import { useTheme } from "@emotion/react";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateCityMutation,
  useUpdateCityByIdMutation,
} from "../../api/city.api";
import { Map } from "./Map";

const position = [24.4672, 39.6024];

function CityModal({ open, setOpen, data }) {
  const [createCity, { isLoading: addLoading }] =
    useCreateCityMutation();
  const [updateCity, { isLoading: updateCitiesLoading }] =
    useUpdateCityByIdMutation();
  const { colors, customColors } = useTheme();
  const {
    i18n: { language },
  } = useTranslation();

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const {
    handleSubmit,
    errors,
    setFieldValue,
    values,
    touched,
    handleChange,
    resetForm,
    handleBlur,
  } = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
      lat: data?.lat ? data.lat : position[0],
      lng: data?.lng ? data.lng : position[1],
    },
    validationSchema: Yup.object({
      name_ar: Yup.string().required(language === "en" ? "Required" : "مطلوب"),
      name_en: Yup.string().required(language === "en" ? "Required" : "مطلوب"),
      lat: Yup.number().required(language === "en" ? "Required" : "مطلوب"),
      lng: Yup.number().required(language === "en" ? "Required" : "مطلوب"),
    }),
    onSubmit: (values) => {
      if (data) {
        handleUpdateTempCity(values);
      } else {
        handleAddTempCity(values);
      }
    },
  });

  React.useEffect(() => {
    if (data && open) {
      setFieldValue("name_ar", data.name_ar);
      setFieldValue("name_en", data.name_en);
      setFieldValue("lat", data.lat);
      setFieldValue("lng", data.lng);
    }
  }, [data, open]);

  const handleAddTempCity = (values) => {
    createCity(values)
      .unwrap()
      .then(() => {
        handleClose();
        resetForm();
        toast.success(
          language === "en" ? "Created Successfully" : "تم الاضافة بنجاح"
        );
      })
      .catch((error) => {
        const message =
          language === "en" ? error?.data?.error_en : error?.data?.error_ar;
        toast.error(message);
      });
  };
  const handleUpdateTempCity = (values) => {
    updateCity({ body: values, id: data._id })
      .unwrap()
      .then(() => {
        handleClose();
        resetForm();
        toast.success(
          language === "en" ? "Updated Successfully" : "تم التعديل بنجاح"
        );
      })
      .catch((error) => {
        const message =
          language === "en" ? error?.data?.error_en : error?.data?.error_ar;
        toast.error(message);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "720px!important",
          py: "40px",
          px: {
            lg: "30px",
            md: "15px",
            xs: 0,
          },
          borderRadius: "15px",
          direction: language === "en" ? "ltr" : "rtl",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%", gap: 3 }}>
          <Stack>
            <Typography sx={{ color: customColors.label, mb: "4px" }}>
              {language === "en" ? "Name Arabic" : "اسم المدينة بالعربي"}
            </Typography>
            <TextField
              name="name_ar"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name_ar}
              helperText={
                touched.name_ar && errors.name_ar ? errors.name_ar : ""
              }
              error={touched.name_ar && errors.name_ar}
              variant="outlined"
              sx={{
                "&:hover": {
                  fieldset: { borderColor: customColors.inputField },
                },
                fieldset: { borderColor: customColors.inputField },
              }}
            />
          </Stack>
          <Stack>
            <Typography sx={{ color: customColors.label, mb: "4px" }}>
              {language === "en" ? "Name English" : "اسم المدينة بالانجليزي"}
            </Typography>
            <TextField
              name="name_en"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name_en}
              helperText={
                touched.name_en && errors.name_en ? errors.name_en : ""
              }
              error={touched.name_en && errors.name_en}
              variant="outlined"
              sx={{
                "&:hover": {
                  fieldset: { borderColor: customColors.inputField },
                },
                fieldset: { borderColor: customColors.inputField },
              }}
            />
          </Stack>
          <Map
            setFieldValue={setFieldValue}
            lat={values.lat}
            lng={values.lng} />

        </FormControl>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mt: "20px",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: colors.main,
              textTransform: "capitalize",
              "&:hover": { bgcolor: customColors.main },
            }}
            disabled={addLoading || updateCitiesLoading}
          >
            { }
            {language === "en" ? "Save" : "حفظ"}
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: colors.main,
              color: colors.main,
              textTransform: "capitalize",
              "&:hover": { borderColor: customColors.main },
            }}
          >
            {language === "en" ? "cancel" : "الغاء"}
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
}

export default CityModal;
