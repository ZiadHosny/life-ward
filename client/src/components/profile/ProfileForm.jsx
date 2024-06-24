import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";

import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../publicStyle/publicStyle";
import { imageBaseUrl } from "../service";
import styles from "./profileStyle";
import EditIcon from "@mui/icons-material/Edit";
import Input from "@mui/joy/Input";
import CloseIcon from "@mui/icons-material/Close";
const ProfileForm = ({
  formik,
  currentUser,
  language,
  inputFileRef,
  uploadedImage,
  handelChangeImage,
  handelUploadImage,
  setUploadedImage,
}) => {
  const arabicGenders = {
    male: "ذكر",
    female: "أنثي",
  };

  return (
    <Paper
      elevation={4}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        px: {
          xl: "100px",
          lg: "60px",
          md: "30px",
          xs: "17px",
        },
        borderRadius: "20px",
        pt: "40px",
        pb: "50px",
        mx: "auto",
        width: 0.95,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Badge
            sx={styles.badge}
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <Box onClick={handelUploadImage}>
                <Avatar
                  sx={{
                    ...styles.EditIcon,
                    position: "absolute",
                    left: "30%",
                    top: "-10%",
                    height: "50px",
                    width: "50px",
                  }}
                >
                  <EditIcon sx={{ cursor: "pointer" }} />
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputFileRef}
                  style={{
                    visibility: "hidden",
                  }}
                  onChange={handelChangeImage}
                />
              </Box>
            }
          >
            <Avatar
              alt="Travis Howard"
              src={
                uploadedImage
                  ? URL.createObjectURL(uploadedImage)
                  : `${imageBaseUrl}${formik.values.image}`
              }
              sx={styles.avatar}
            />
            {uploadedImage || formik.values.image ? (
              <Box
                sx={{
                  position: "absolute",
                  right: "10%",
                  top: "1%",
                  height: "50px",
                  width: "50px",
                }}
                onClick={() => {
                  setUploadedImage(""), (formik.values.image = "");
                }}
              >
                <Avatar
                  sx={{
                    height: "50px",
                    width: "50px",
                  }}
                >
                  <CloseIcon sx={{ cursor: "pointer" }} />
                </Avatar>
              </Box>
            ) : null}
          </Badge>
          {/* fullName */}
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <Typography
              component="label"
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold ",
                color: colors.main,
              }}
            >
              {language === "en" ? "fullname" : "الأسم"}
            </Typography>
            <InputBase
              type={"text"}
              name={"name"}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={language === "en" ? "Name" : "الأسم"}
              sx={{
                mt: "5px",
                display: "block",
                backgroundColor: "#fff",
                p: "10px 15px",
                borderRadius: "40px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                fontFamily: publicFontFamily,
                border: `1px solid ${
                  formik.errors.fullname && formik.touched.fullname
                    ? "red"
                    : colors.main
                }`,
              }}
            />
            {formik.errors.fullname && formik.touched.fullname && (
              <Typography
                color="red"
                sx={{
                  fontFamily: publicFontFamily,
                }}
              >
                {formik.errors.fullname}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              mt: "20px",
            }}
          >
            <Typography
              component="label"
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold ",
                color: colors.main,
              }}
            >
              {language === "en" ? "Phone" : "رقم الجوال"}
            </Typography>
            <Box direction="ltr">
              <Input
                autoComplete="off"
                startDecorator={
                  <Box>
                    {language !== "ar" ? <Typography>+966</Typography> : null}
                  </Box>
                }
                endDecorator={
                  <Box>
                    {language == "ar" ? <Typography> 966+</Typography> : null}
                  </Box>
                }
                // placeholder={lang === "en" ? "phone" : "الهاتف"}
                // disabled={formik.values.email || formik.values.password}
                type={"text"}
                sx={{
                  p: "10px 15px",
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                  borderRadius: "40px",

                  border: `1px solid ${colors.main}`,
                  "& > .css-17ewsm8-JoyInput-root": {
                    inputFocusedHighlight: "black !important",
                  },

                  "& > input": {
                    textAlign: "left",
                    direction: "ltr",
                  },
                }}
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>

            {formik.errors.phone && formik.touched.phone && (
              <Typography
                color="red"
                sx={{
                  fontFamily: publicFontFamily,
                }}
              >
                {formik.errors.phone}
              </Typography>
            )}
          </Box>
          <>
            <Box
              sx={{
                mt: "20px",
              }}
            >
              <Typography
                component="label"
                sx={{
                  fontFamily: publicFontFamily,
                  fontWeight: "bold ",
                  color: colors.main,
                }}
              >
                {language === "en" ? "Email" : "البريد الالكتروني"}
              </Typography>
              <InputBase
                type={"text"}
                name={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={language === "en" ? "Email" : "البريد الالكتروني"}
                sx={{
                  mt: "5px",
                  display: "block",
                  backgroundColor: "#fff",
                  p: "10px 15px",
                  borderRadius: "40px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                  fontFamily: publicFontFamily,
                  border: `1px solid ${
                    formik.errors.email && formik.touched.email
                      ? "red"
                      : colors.main
                  }`,
                }}
              />
              {formik.errors.email && formik.touched.email && (
                <Typography
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.email}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                mt: "20px",
              }}
            >
              <Typography
                component="label"
                sx={{
                  fontFamily: publicFontFamily,
                  fontWeight: "bold ",
                  color: colors.main,
                }}
              >
                {language === "en" ? "Password" : "كلمة المرور"}
              </Typography>
              <InputBase
                type={"text"}
                name={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={language === "en" ? "Password" : "كلمة المرور"}
                sx={{
                  mt: "5px",
                  display: "block",
                  backgroundColor: "#fff",
                  p: "10px 15px",
                  borderRadius: "40px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                  fontFamily: publicFontFamily,
                  border: `1px solid ${
                    formik.errors.password && formik.touched.password
                      ? "red"
                      : colors.main
                  }`,
                }}
              />
              {formik.errors.password && formik.touched.password && (
                <Typography
                  color="red"
                  sx={{
                    fontFamily: publicFontFamily,
                  }}
                >
                  {formik.errors.password}
                </Typography>
              )}
            </Box>
          </>
          {/* birth  date*/}
          <Box
            sx={{
              mt: "20px",
            }}
          >
            <Typography
              component="label"
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold ",
                color: colors.main,
              }}
            >
              {language === "en" ? "birth date" : "تاريخ الميلاد"}
            </Typography>
            <InputBase
              type={"date"}
              name={"birthDate"}
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              slotProps={{
                input: {
                  max: new Date(new Date().getFullYear() - 18, "12", "01")
                    .toISOString()
                    .slice(0, 10),
                },
              }}
              sx={{
                mt: "5px",
                display: "block",
                backgroundColor: "#fff",
                p: "10px 15px",
                borderRadius: "40px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                fontFamily: publicFontFamily,
                border: `1px solid ${
                  formik.errors.birthDate && formik.touched.birthDate
                    ? "red"
                    : colors.main
                }`,
              }}
            />
            {formik.errors.birthDate && formik.touched.birthDate && (
              <Typography
                color="red"
                sx={{
                  fontFamily: publicFontFamily,
                }}
              >
                {formik.errors.birthDate}
              </Typography>
            )}
          </Box>
          {/* Gender */}
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: publicFontFamily,
                color: colors.main,
                mt: "10px",
                mb: "10px",
              }}
            >
              {language === "en" ? "gender" : "جنس"}
            </Typography>
            <select
              name="gender"
              value={formik.values.gender}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              style={{
                width: "100%",
                border: `1px solid ${colors.main}`,
                outline: 0,
                backgroundColor: "transparent",
                padding: "15px 10px",
                fontSize: "18px",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                borderRadius: "40px",
              }}
            >
              <option
                style={{
                  cursor: "pointer",
                }}
                component="option"
                selected
                hidden
              >
                {language === "en" ? "Select" : "اختار"}
              </option>
              {["male", "female"].map((item) => (
                <option
                  style={{
                    cursor: "pointer",
                  }}
                  component="option"
                  key={item}
                  value={item}
                >
                  {language === "en" ? item : arabicGenders[item]}
                </option>
              ))}
            </select>
            {formik.errors.gender && formik.touched.gender && (
              <Typography
                fontWeight={"bold"}
                fontSize={13}
                variant="p"
                color="red"
                sx={{
                  fontFamily: publicFontFamily,
                }}
              >
                {formik.errors.gender}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: `${colors.main} !important`,
              color: "#fff",
              p: "5px 12px",
              textTransform: "capitalize",
              mt: "25px",
              width: 125,
              fontFamily: publicFontFamily,
              fontSize: publicSizes.button,
              borderRadius: "40px",
            }}
          >
            {language === "en" ? "Save" : "حفظ"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileForm;
