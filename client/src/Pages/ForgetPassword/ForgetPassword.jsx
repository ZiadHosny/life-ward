import {
  Box,
  ButtonBase,
  InputBase,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useFormik } from "formik";
import { ForgetPassStyle } from "./ForgetPassStyle";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useForgetPassMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} from "../../APIs/forgetPassApi";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import HttpsIcon from "@mui/icons-material/Https";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailIcon from "@mui/icons-material/Mail";
import { useTranslation } from "react-i18next";
// ===========================|| FORMIK DATA ||=========================== //
const useFormikData = () => {
  const [, { language: lang }] = useTranslation();
  const initialValues = {
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  };
  return { initialValues };
};

// ===========================|| EMAIL VERIFICATION stage1 ||=========================== //
const EmailVerification = (props) => {
  const [disable, setDisable] = useState(false);
  const [forgetPass] = useForgetPassMutation();
  const navigaet = useNavigate();
  const { initialValues } = useFormikData();

  const [_, { language: lang }] = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: initialValues.email,
    },
    // i need to add validationSchema of email here
    validationSchema: yup.object({
      email: yup
        .string()
        .email(lang === "en" ? "Invalid email" : "بريد إلكتروني خاطئ")
        .required(
          lang === "en" ? "Email is required*" : "*البريد الإلكتروني مطلوب"
        ),
    }),
    onSubmit: (values) => {
      const data = {
        username: values.email,
      };
      setDisable(true);
      forgetPass(data)
        .unwrap()
        .then((res) => {
          props.setValue(2);
        })
        .catch((err) => {
          setDisable(false);
          toast.error(err?.data[`error_${lang}`]);
        });
    },
  });
  return (
    <Box
      sx={{
        
        direction: lang === "en" ? "ltr" : "rtl",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: { xs: "100%", sm: "50%", lg: "35%", xl: "25%" },
          p: 2,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <MailIcon
                    sx={{
                      color: `#693096 !important`,
                      mx: 2,
                    }}
                  />
                </InputAdornment>
              }
              placeholder={lang === "en" ? "Email" : "البريد الإلكتروني"}
              type={"text"}
              sx={{
                borderRadius: props.style.borderRadius
                  ? "50px !important"
                  : "0 !important",
                mt: "20px",
                p: "15px 0px",
                width: "100%",
                border: `2px solid ${
                  formik.errors.email && formik.touched.email
                    ? "red"
                    : "#693096"
                }`,
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  opacity: 0,
                },
                "& input::placeholder": {
                  color: props.style.placeholderColor
                    ? props.style.placeholderColor
                    : "gray",
                },
              }}
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <Typography
                fontWeight={"bold"}
                fontSize={13}
                //   variant="p"
                color="red"
              >
                {formik.errors.email}
              </Typography>
            )}
          </Box>

          <Box mt={2}>
            <ButtonBase
              disabled={disable}
              type="submit"
              sx={{
                color: props.style.colorBtn ? props.style.colorBtn : "white",
                bgcolor: "#693096 !important",
                mt: "20px",
                fontSize: {
                  xl: "35px",
                  lg: "20px",

                  xs: "18px",
                },

                p: { xs: "10px 30px", sm: "6px 30px" },
                width: "100%",
                // fontWeight: 'bold',
                borderRadius: "5px",
              }}
            >
              {lang === "en"
                ? disable
                  ? "Send Cod..."
                  : "Send Code"
                : disable
                ? "ارسال الكود..."
                : "ارسال الكود"}
            </ButtonBase>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

// ================================================================================= //

// ===========================|| VERIFY CODE stage2 ||=========================== //

const VerifyPassword = (props) => {
  const [verifyCode] = useVerifyCodeMutation(undefined);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const [_, { language: lang }] = useTranslation();
  const { initialValues } = useFormikData();

  const formik = useFormik({
    initialValues: {
      otp: initialValues.otp,
    },
    validationSchema: yup.object({
      otp: yup
        .string()
        .required(lang === "en" ? "Code is required*" : "*الكود مطلوب")
        .matches(
          /^\d{6}$/,
          lang === "en" ? "Code must be 6 digits" : "الكود يجب أن يكون 6 أرقام"
        ),
    }),
    onSubmit: (values) => {
      const data = {
        resetCode: values.otp, // Use Formik's 'otp' field value
      };
      setDisable(true);
      verifyCode(data)
        .unwrap()
        .then((res) => {
          props.setValue(3);
          props.setData(res.data);
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(err?.data[`error_${lang}`]);
          setDisable(false);
        });
    },
  });

  return (
    <Box
     
    >
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: { xs: "100%", sm: "70%", lg: "40%", xl: "30%" },
          p: 2,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" gap={2}>
            <OtpInput
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: "10px",
              }}
              inputStyle={{
                width: "100%",
                height: "80px",
                borderRadius: "10px",
                border: `2px solid ${
                  formik.errors.otp && formik.touched.otp ? "red" : "#693096"
                }`,

                fontSize: "25px",
              }}
              name="otp"
              value={formik.values.otp} // Use Formik field value
              onChange={(otp) => formik.setFieldValue("otp", otp)} // Update Formik field value
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
          </Box>

          {formik.errors.otp && formik.touched.otp && (
            <Typography
              fontWeight={"bold"}
              fontSize={13}
              color="red"
              sx={{ mt: 2, direction: lang === "en" ? "ltr" : "rtl" }}
            >
              {formik.errors.otp}
            </Typography>
          )}

          <Box mt={2}>
            <ButtonBase
              disabled={disable}
              type="submit"
              sx={{
                color: props.style.colorBtn ? props.style.colorBtn : "white",
                bgcolor: "#693096",
                mt: "20px",
                fontSize: {
                  xl: "35px",
                  lg: "20px",
                  xs: "18px",
                },
                p: { xs: "10px 30px", sm: "6px 30px" },
                width: "100%",
                borderRadius: "5px",
              }}
            >
              {lang === "en"
                ? disable
                  ? "Check..."
                  : "Check"
                : disable
                ? "...جاري التحقق"
                : "تحقق"}
            </ButtonBase>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

// ================================================================================= //

// ===========================|| RESET PASSWORD stage3 ||=========================== //
const ResetPassword = (props) => {
  const [resetPassword] = useResetPasswordMutation(undefined);
  const [passwordType, setPasswordType] = useState(true);
  const [ConfirmpasswordType, setConfirmPasswordType] = useState(true);
  const navigate = useNavigate();
  const [_, { language: lang }] = useTranslation();
  const [disable, setDisable] = useState(false);
  const { initialValues } = useFormikData();

  const formik = useFormik({
    initialValues: {
      password: initialValues.password,
      confirmPassword: initialValues.confirmPassword,
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required(lang === "en" ? "Password is required" : "كلمة المرور مطلوبة")
        .min(
          6,
          lang === "en"
            ? "Password must be at least 6 characters"
            : "يجب أن تكون كلمة المرور على الأقل 6 أحرف"
        ),
      confirmPassword: yup
        .string()
        .required(
          lang === "en"
            ? "Confirm Password is required"
            : "يجب تأكيد كلمة المرور"
        )
        .oneOf(
          [yup.ref("password")],
          lang === "en" ? "Passwords must match" : "يجب أن تتطابق كلمتي المرور"
        ),
    }),
    onSubmit: (values) => {
      const data = {
        username: props.data?.email,
        newPassword: values.password,
      };
      setDisable(true);
      resetPassword(data)
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${lang}`]);
          navigate("/sign-in");
        })
        .catch((err) => {
          toast.error(err?.data[`error_${lang}`]);
          setDisable(false);
        });
    },
  });

  return (
    <Box
      sx={{
        
        direction: lang === "en" ? "ltr" : "rtl",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: { xs: "100%", sm: "50%", lg: "35%", xl: "25%" },
          p: 2,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          {/* Password */}
          <Box>
            <InputBase
              name="password"
              value={formik.values.password}
              placeholder={lang === "en" ? "Password" : "كلمة المرور"}
              type={passwordType ? "password" : "text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              startAdornment={
                <InputAdornment position="start">
                  <HttpsIcon
                    sx={{
                      color: `#693096`,
                      mx: 2,
                    }}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordType(!passwordType)}
                    // onMouseDown={handleMouseDownPassword}

                    edge="end"
                  >
                    {passwordType ? (
                      <VisibilityOff
                        sx={{
                          color: `#693096`,
                          mx: lang === "en" ? 2 : 1,
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          color: `#693096`,
                          mx: lang === "en" ? 2 : 1,
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                p: "15px 0px",
                width: "100%",
                borderRadius: props.style.borderRadius ? "50px" : "0",
                mt: "20px",
                border: `2px solid ${
                  formik.errors.password && formik.touched.password
                    ? "red"
                    : "#693096"
                }`,
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  opacity: 0,
                },
                ".css-2ehmn7-MuiInputBase-root-MuiOutlinedInput-root": {
                  px: lang === "en" ? undefined : "0",
                },
                " .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input": {
                  p: lang === "en" ? undefined : "16.5px 14px",
                },
                "& input::placeholder": {
                  color: props.style.placeholderColor
                    ? props.style.placeholderColor
                    : "gray",
                },
              }}
            />

            {formik.errors.password && formik.touched.password && (
              <Typography fontWeight={"bold"} fontSize={13} color="red">
                {formik.errors.password}
              </Typography>
            )}
          </Box>

          {/* confirm pass */}
          <Box>
            <InputBase
              name="confirmPassword"
              value={formik.values.confirmPassword}
              placeholder={
                lang === "en" ? "Confirm Password" : "تأكيد كلمة المرور"
              }
              type={ConfirmpasswordType ? "password" : "text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              startAdornment={
                <InputAdornment position="start">
                  <HttpsIcon
                    sx={{
                      color: `#693096`,
                      mx: 2,
                    }}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setConfirmPasswordType(!ConfirmpasswordType)}
                    // onMouseDown={handleMouseDownPassword}

                    edge="end"
                  >
                    {ConfirmpasswordType ? (
                      <VisibilityOff
                        sx={{
                          color: `#693096`,
                          mx: lang === "en" ? 2 : 1,
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          color: `#693096`,
                          mx: lang === "en" ? 2 : 1,
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                p: "15px 0px",
                width: "100%",
                borderRadius: props.style.borderRadius ? "50px" : "0",
                mt: "20px",
                border: `2px solid ${
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? "red"
                    : "#693096"
                }`,
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  opacity: 0,
                },
                ".css-2ehmn7-MuiInputBase-root-MuiOutlinedInput-root": {
                  px: lang === "en" ? undefined : "0",
                },
                " .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input": {
                  p: lang === "en" ? undefined : "16.5px 14px",
                },
                "& input::placeholder": {
                  color: props.style.placeholderColor
                    ? props.style.placeholderColor
                    : "gray",
                },
              }}
            />

            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <Typography fontWeight={"bold"} fontSize={13} color="red">
                  {formik.errors.confirmPassword}
                </Typography>
              )}
          </Box>

          <Box mt={2}>
            <ButtonBase
              type="submit"
              disabled={disable}
              sx={{
                color: "white",
                bgcolor: "#693096",
                mt: "20px",
                fontSize: {
                  xl: "35px",
                  lg: "20px",
                  xs: "18px",
                },
                p: { xs: "10px 30px", sm: "6px 30px" },
                width: "100%",
                borderRadius: "5px",
              }}
            >
              {lang === "en"
                ? disable
                  ? "Login..."
                  : "Login"
                : disable
                ? "تسجيل الدخول..."
                : "تسجيل الدخول"}
            </ButtonBase>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

// ===========================|| FORGET PASSWORD ||=========================== //
const ForgetPassword = () => {
  const [value, setValue] = useState(1);
  const [data, setData] = useState();
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {/* <TabContext value={value}>
        <TabPanel value="1">
          <EmailVerification
            style={{
              borderInputColor: ForgetPassStyle.borderInputColor,
              placeholderColor: ForgetPassStyle.placeholderColor,
              backgroundColorBtn: ForgetPassStyle.backgroundColorBtn,
              colorBtn: ForgetPassStyle.colorBtn,
            }}
            setValue={setValue}
            setData={setData}
          />
        </TabPanel>

        <TabPanel value="2">
          <VerifyPassword
            style={{
              borderInputColor: ForgetPassStyle.borderInputColor,
              placeholderColor: ForgetPassStyle.placeholderColor,
              backgroundColorBtn: ForgetPassStyle.backgroundColorBtn,
              colorBtn: ForgetPassStyle.colorBtn,
            }}
            setValue={setValue}
            setData={setData}
          />
        </TabPanel>
        <TabPanel value="3">
          <ResetPassword
            style={{
              borderInputColor: ForgetPassStyle.borderInputColor,
              placeholderColor: ForgetPassStyle.placeholderColor,
              backgroundColorBtn: ForgetPassStyle.backgroundColorBtn,
              colorBtn: ForgetPassStyle.colorBtn,
            }}
            setValue={setValue}
            data={data}
            setData={setData}
          />
        </TabPanel>
      </TabContext> */}
      <Box sx={{ width: "100%", pt: "200px" }}>
        <CustomTabPanel value={value} index={1}>
          <EmailVerification
            style={{
              borderInputColor: ForgetPassStyle.borderInputColor,
              placeholderColor: ForgetPassStyle.placeholderColor,
              backgroundColorBtn: ForgetPassStyle.backgroundColorBtn,
              colorBtn: ForgetPassStyle.colorBtn,
            }}
            setValue={setValue}
            setData={setData}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <VerifyPassword
            style={{
              borderInputColor: ForgetPassStyle.borderInputColor,
              placeholderColor: ForgetPassStyle.placeholderColor,
              backgroundColorBtn: ForgetPassStyle.backgroundColorBtn,
              colorBtn: ForgetPassStyle.colorBtn,
            }}
            setValue={setValue}
            setData={setData}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <ResetPassword
            style={{
              borderInputColor: ForgetPassStyle.borderInputColor,
              placeholderColor: ForgetPassStyle.placeholderColor,
              backgroundColorBtn: ForgetPassStyle.backgroundColorBtn,
              colorBtn: ForgetPassStyle.colorBtn,
            }}
            setValue={setValue}
            data={data}
            setData={setData}
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default ForgetPassword;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
