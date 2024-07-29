import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Divider,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreateNeighborhoodMutation,
  useUpdateNeighborhoodByIdMutation,
} from "../../api/neighborhoods.api.js";
import { toast } from "react-toastify";

function CityAddNeighborhoodModal({ open, setOpen, city, neighborhood }) {
  const [createNeighborhood, { isLoading: NeighborhoodLoading }] =
    useCreateNeighborhoodMutation();
  const [updateNeighborhood] = useUpdateNeighborhoodByIdMutation();

  const { customColors } = useTheme();
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
    values,
    touched,
    handleChange,
    setFieldValue,
    resetForm,
    handleBlur,
  } = useFormik({
    initialValues: {
      name_ar: "",
      name_en: "",
    },
    validationSchema: Yup.object({
      name_ar: Yup.string().required(language === "en" ? "Required" : "مطلوب"),
      name_en: Yup.string().required(language === "en" ? "Required" : "مطلوب"),
    }),
    onSubmit: (values) => {
      if (city) {
        handleCreateTempNeighborhood(values);
      } else if (neighborhood) {
        handleUpdateTempNeighborhood(values);
      }
    },
  });
  React.useEffect(() => {
    if (open && neighborhood) {
      setFieldValue("name_ar", neighborhood.name_ar);
      setFieldValue("name_en", neighborhood.name_en);
    }
  }, [open, neighborhood]);
  const handleCreateTempNeighborhood = (values) => {
    values.city = city._id;
    createNeighborhood(values)
      .unwrap()
      .then((res) => {
        handleClose();
        resetForm();
        toast.success(language === "en" ? res.success_en : res.success_ar);
      })
      .catch((error) => {
        const message =
          language === "en" ? error?.data?.error_en : error?.data?.error_ar;
        toast.error(message);
      });
  };
  const handleUpdateTempNeighborhood = (values) => {
    updateNeighborhood({ id: neighborhood._id, body: values })
      .unwrap()
      .then((res) => {
        handleClose();
        resetForm();
        toast.success(language === "en" ? res.success_en : res.success_ar);
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
          px: "30px",
          borderRadius: "15px",
        },
      }}
    >
      <Stack>
        <Typography sx={{ color: customColors.main }}>
          {language === "en" ? "Name Neighborhood" : "أسم حي"}
        </Typography>
      </Stack>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          width: "100%",
          backgroundColor: customColors.grey,
          my: "20px",
        }}
      />
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%", gap: 3 }}>
          <Stack>
            <Typography sx={{ mb: "10px" }}>
              {language === "en" ? "Name Arabic" : "اسم الحي بالعربي"}
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
            <Typography sx={{ mb: "10px" }}>
              {language === "en" ? "Name English" : "اسم الحي بالانجليزي"}
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
              bgcolor: customColors.main,
              textTransform: "capitalize",
              "&:hover": { bgcolor: customColors.main },
            }}
            disabled={NeighborhoodLoading}
          >
            {language === "en" ? "Save" : "حفظ"}
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: customColors.main,
              color: customColors.main,
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

export default CityAddNeighborhoodModal;
