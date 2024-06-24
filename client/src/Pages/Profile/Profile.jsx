import {
  Box,
  Button,
  Grid,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { inputs } from "./Profile.data";
import { formData } from "./Profile.form";
import { useTranslation } from "react-i18next";
import { useLazyGetMeQuery, useUpdateUserMutation } from "../../APIs/UserApis";
import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../APIs/userSlice";
import ProfileForm from "../../components/profile/ProfileForm";
import ProfileOccasions from "../../components/profile/ProfileOccasions";
import { useUploadImageMutation } from "../../APIs/UploadAPi";
const Profile = () => {
  const [_, { language }] = useTranslation();
  const [updateUser] = useUpdateUserMutation();
  const [uploadedImage, setUploadedImage] = useState(null);
  const { currentUser } = useSelector((state) => state);
  const [getMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const [uploadImage] = useUploadImageMutation();
  const formik = useFormik({
    initialValues: formData.initialVals,
    validationSchema: formData.validation,
    onSubmit: (values, { setFieldValue }) => {
      if (uploadedImage) {
        const userImage = new FormData();
        userImage.append("image", uploadedImage);
        uploadImage(userImage)
          .unwrap()
          .then((res) => {
            updateUser({ ...values, image: res.image }).then((res) => {
              toast.success(res.data[`success_${language}`]);
              dispatch(setCurrentUser(res?.data.data));
              setUploadedImage();
              setFieldValue("image", res?.data?.data?.image);
            });
          });
      } else {
        updateUser(values).then((res) => {
          toast.success(res.data[`success_${language}`]);
          dispatch(setCurrentUser(res?.data.data));
        });
      }
    },
  });
  const inputFileRef = useRef(null);
  const handelUploadImage = () => inputFileRef.current?.click();
  const handelChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };
  useEffect(() => {
    const formKeys = Object.keys(formik.values);
    getMe()
      .unwrap()
      .then((res) => {
        formKeys.forEach((key) =>
          key === "password"
            ? formik.setFieldValue(key, "")
            : formik.setFieldValue(
                key,
                key === "birthDate"
                  ? moment(res.data[key]).format("YYYY-MM-DD")
                  : res.data[key]
              )
        );
      });
  }, []);
  console.log("Chwecking asasqwe", formik.values);

  return (
    <Box
      sx={{
        p: {
          lg: "250px 0 100px",
          md: "200px 0 75px",
          xs: "125px 0 50px",
        },
        width: {
          md: 0.85,
          xs: 0.95,
        },
        mx: "auto",
      }}
    >
      <Grid container>
        <Grid item md={6} xs={12}>
          <ProfileForm
            formik={formik}
            language={language}
            inputs={inputs}
            currentUser={currentUser}
            inputFileRef={inputFileRef}
            uploadedImage={uploadedImage}
            handelChangeImage={handelChangeImage}
            handelUploadImage={handelUploadImage}
            setUploadedImage={setUploadedImage}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <ProfileOccasions />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
