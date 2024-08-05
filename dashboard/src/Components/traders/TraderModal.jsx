import { useTheme } from "@emotion/react";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import SelectTag from "../../Components/globals/SelectTag";
import { toast } from "react-toastify";
import {
  useCreateTraderMutation,
  useUpdateTraderMutation,
} from "../../api/traders.api";
import { useFetchAllCities } from "../../hooks/cities.hooks";
import { useFetchNeighborhoodsByCityId } from "../../hooks/neighborhood.hooks";

function TraderModal({ open, setOpen, data }) {
  const [createTrader, { isLoading: addLoading }] =
    useCreateTraderMutation();
  const [updateTrader, { isLoading: updateTraderLoading }] =
    useUpdateTraderMutation();
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
      name: "",
      email: "",
      password: "",
      country: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(language === "en" ? "Required" : "مطلوب"),
      email: Yup.string().email().required(language === "en" ? "Required" : "مطلوب"),
      password: Yup.string().min(6).required(language === "en" ? "Required" : "مطلوب"),
      country: Yup.string().required(language === "en" ? "Required" : "مطلوب"),
      city: Yup.string().required(language === "en" ? "Required" : "مطلوب"),
    }),
    onSubmit: (values) => {
      if (data) {
        handleUpdateTempTrader(values);
      } else {
        handleAddTempTrader(values);
      }
    },
  });

  const { cities } = useFetchAllCities();
  const { neighborhoods } = useFetchNeighborhoodsByCityId(values.city);

  React.useEffect(() => {
    if (data && open) {
      setFieldValue("name", data.name);
      setFieldValue("email", data.email);
      setFieldValue("password", data.password);
      setFieldValue("city", data.city._id);
      setFieldValue("country", data.country._id);
    }
  }, [data, open]);

  const handleAddTempTrader = (values) => {
    createTrader(values)
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
        toast.error(message ?? error?.data?.message);
      });
  };
  const handleUpdateTempTrader = (values) => {
    updateTrader({ body: values, id: data._id })
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
              {language === "en" ? "Name" : "الاسم"}
            </Typography>
            <TextField
              name="name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              helperText={
                touched.name && errors.name ? errors.name : ""
              }
              error={touched.name && errors.name}
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
              {language === "en" ? "Email" : "البريد الألكتروني"}
            </Typography>
            <TextField
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              helperText={
                touched.email && errors.email ? errors.email : ""
              }
              error={touched.email && errors.email}
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
              {language === "en" ? "Password" : "كلمة السر"}
            </Typography>
            <TextField
              name="password"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
              error={touched.password && errors.password}
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
            <SelectTag
              label={
                <Typography sx={{ color: customColors.label, mb: "4px" }}>
                  {language === "en" ? "City" : "المدينة"}
                </Typography>
              }
              name="city"
              error={errors.city}
              value={values?.city || ""}
              touched={touched.city}
              handleChange={(e) => {
                handleChange(e);
                setFieldValue("country", '');
              }}
              handleBlur={handleBlur}
              optionsData={cities.data}
              itemField={`name_${language}`}
            />
          </Stack>
          <Stack>
            <SelectTag
              label={
                <Typography sx={{ color: customColors.label, mb: "4px" }}>
                  {language === "en" ? "Neighborhood" : "الحي"}
                </Typography>
              }
              name="country"
              error={errors.country}
              value={values?.country || ""}
              touched={touched.country}
              handleChange={handleChange}
              handleBlur={handleBlur}
              optionsData={neighborhoods.data}
              itemField={`name_${language}`}
            />
          </Stack>
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
            disabled={addLoading || updateTraderLoading}
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

export default TraderModal;
