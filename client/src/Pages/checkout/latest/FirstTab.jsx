import {
  Box,
  Button,
  CardMedia,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CheckTextInput from "./CheckTextInput";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import CheckTextArea from "./CheckTextArea";
import RecordVoice from "./RecordVoice";
import UploadFile from "./UploadFile";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  checkoutValidaions,
  checkoutValues,
} from "../check_assets/checkout.inputs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useUploadMediaMutation } from "../../../APIs/UploadAPi";
import { useLazyGetMeQuery } from "../../../APIs/UserApis";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAddOrderMutation } from "../../../APIs/ordersApi";
import { useSelector } from "react-redux";
import { useGetFastCoast, useGetNote } from "./FirstHooks";
import { useVerifyCartMutation } from "../../../APIs/cartApi";
import SaPhoneInput from "../../../components/SaPhoneInput/SaPhoneInput";
import RecordVoideNew from "./RecordVoiceNew";
const FirstTab = ({ showed, setValue, setUserPhone }) => {
  const [getMe] = useLazyGetMeQuery();
  const [uploadedVideo, setUploadVideo] = useState();
  const [recordVoice, setRecordVoice] = useState();
  const [uploadMedia] = useUploadMediaMutation();
  const [addOrder] = useAddOrderMutation();
  const [submitCheckout] = useVerifyCartMutation();
  const formik = useFormik({
    initialValues: { ...checkoutValues.first },
    validationSchema: Yup.object(checkoutValidaions.first),
    onSubmit: ({ total: cart, ...values }) => {
      const couponData = JSON.parse(localStorage.getItem("couponData"));
      !values.receiveDate ? delete values.receiveDate : undefined;
      if (uploadedVideo && values.congratzStatus) {
        const formData = new FormData();
        formData.append("file", uploadedVideo);
        uploadMedia(formData).then(({ data }) => {
          if (data.file) {
            if (couponData?.couponEnter !== "") {
              submitCheckout({
                productsIds: couponData?.products,
                code: couponData?.couponEnter,
              })
                .unwrap()
                .then((res) => {
                  toast.success(
                    res[`success_${language === "en" ? "en" : "ar"}`]
                  );
                  localStorage.removeItem("couponData");
                  addOrder({
                    ...values,
                    congratz: {
                      ...values.congratz,
                      content: {
                        ...values.congratz.content,
                        data: data.file,
                      },
                    },
                  })
                    .unwrap()
                    .then(() => {
                      setValue((value) => value + 1);
                      setUserPhone(values.phone);
                    })
                    .catch((err) =>
                      toast.error(err.data[`error_${language}`] || err.data)
                    );
                })
                .catch((e) => {
                  // toast.error(e?.data[`error_${language === 'en' ? 'en' : 'ar'}`]);
                  toast.error(
                    language === "en" ? e.data?.error_en : e?.data?.error_ar
                  );
                });
            } else
              addOrder({
                ...values,
                congratz: {
                  ...values.congratz,
                  content: {
                    ...values.congratz.content,
                    data: data.file,
                  },
                },
              })
                .unwrap()
                .then(() => {
                  setValue((value) => value + 1);
                  setUserPhone(values.phone);
                })
                .catch((err) =>
                  toast.error(err.data[`error_${language}`] || err.data)
                );
          }
        });
      } else if (recordVoice && values.congratzStatus) {
        const formData = new FormData();
        formData.append("file", recordVoice);
        uploadMedia(formData).then(({ data }) => {
          if (couponData?.couponEnter !== "") {
            submitCheckout({
              productsIds: couponData?.products,
              code: couponData?.couponEnter,
            })
              .unwrap()
              .then((res) => {
                toast.success(
                  res[`success_${language === "en" ? "en" : "ar"}`]
                );
                localStorage.removeItem("couponData");
                // cartApi.endpoints.getAllCarts.initiate()

                addOrder({
                  ...values,
                  congratz: {
                    ...values.congratz,
                    content: {
                      ...values.congratz.content,
                      data: data.file,
                    },
                  },
                })
                  .unwrap()
                  .then(() => {
                    setValue((value) => value + 1);
                    setUserPhone(values.phone);
                  })
                  .catch((err) =>
                    toast.error(err.data[`error_${language}`] || err?.data)
                  );
                // nav('/checkout')
              })
              .catch((e) => {
                // toast.error(e?.data[`error_${language === 'en' ? 'en' : 'ar'}`]);
                toast.error(
                  language === "en" ? e.data?.error_en : e?.data?.error_ar
                );
              });
          } else
            addOrder({
              ...values,
              congratz: {
                ...values.congratz,
                content: {
                  ...values.congratz.content,
                  data: data.file,
                },
              },
            })
              .unwrap()
              .then(() => {
                setValue((value) => value + 1);
                setUserPhone(values.phone);
              })
              .catch((err) =>
                toast.error(err.data[`error_${language}`] || err?.data)
              );
        });
      } else {
        if (couponData?.couponEnter !== "") {
          submitCheckout({
            productsIds: couponData?.products,
            code: couponData?.couponEnter,
          })
            .unwrap()
            .then((res) => {
              toast.success(res[`success_${language === "en" ? "en" : "ar"}`]);
              localStorage.removeItem("couponData");

              // cartApi.endpoints.getAllCarts.initiate()

              addOrder(values)
                .unwrap()
                .then(() => {
                  setValue((value) => value + 1);
                  setUserPhone(values.phone);
                })
                .catch((err) =>
                  toast.error(err.data[`error_${language}`] || err?.data)
                );
            })
            .catch((e) => {
              // toast.error(e?.data[`error_${language === 'en' ? 'en' : 'ar'}`]);
              toast.error(
                language === "en" ? e.data?.error_en : e?.data?.error_ar
              );
            });
        } else
          addOrder(values)
            .unwrap()
            .then(() => {
              setValue((value) => value + 1);
              setUserPhone(values.phone);
            })
            .catch((err) =>
              toast.error(err.data[`error_${language}`] || err?.data)
            );
      }
    },
  });
  const {
    values,
    setValues,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = formik;
  const [_, { language }] = useTranslation();
  const addCongratzType = (type) => {
    setValues({
      ...values,
      congratz: { type, content: { ...values?.congratz.content, data: "" } },
    });
    setUploadVideo(null);
  };
  const arabicTybes = {
    text: "نص",
    voice: "صوت",
    video: "فيديو",
  };
  useEffect(() => {
    getMe().then(({ data, error }) => {
      if (data.data && !error) {
        const tempUser = { ...data.data };
        setFieldValue("name", tempUser.name);
        setFieldValue("email", tempUser.email);
        setFieldValue("phone", tempUser.phone);
        setFieldValue(
          "country",
          language === "en" ? "Saudi Arabia" : "السعودية"
        );
        // setFieldValue("city", language === "en" ? "Jeddah" : "جدة");
      }
    });
  }, []);
  useEffect(() => {
    setValues({
      ...values,
      country: language === "en" ? "Saudi Arabia" : "السعودية",
    });
  }, [language]);
  useEffect(() => {
    if (!values?.congratzStatus) {
      delete values?.congratz;
    } else {
      setFieldValue("congratz", {
        type: "",
        content: {
          from: "",
          to: "",
          data: "",
        },
      });
    }
  }, [values?.congratzStatus]);
  useEffect(() => {
    if (values.fastDelivery) {
      setFieldValue("receiveDate", "");
    }
  }, [values.fastDelivery]);
  const handleUploadVideo = (file) => {
    setUploadVideo(file);
    setFieldValue("congratz.content.data", file.name);
  };
  const { fastCoast } = useGetFastCoast();
  const { noteMessage } = useGetNote();

  return (
    <Box
      sx={{
        display: showed ? "block" : "none",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          sx={{
            flexDirection: {
              md: "row",
              xs: "column",
            },
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "20px",
            pb: "30px",
          }}
        >
          <InputBase
            type="checkbox"
            id="cogratz"
            sx={{
              accentColor: colors.main,
              height: 20,
              width: 20,
              cursor: "pointer",
            }}
            name="congratzStatus"
            value={values?.congratzStatus}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Typography
            component={"label"}
            htmlFor={"cogratz"}
            fontFamily={publicFontFamily}
            fontWeight={"bold"}
            sx={{
              color: colors.main,
              fontSize: {
                md: "19px",
                xs: "17.5px",
              },
              cursor: "pointer",
            }}
          >
            {language === "en"
              ? "Would you like to send congratulations?"
              : "هل تود إرسال تهنئة؟"}
          </Typography>
        </Stack>
        <Box
          sx={{
            border: values?.congratzStatus ? 1 : 0,
            borderColor: "divider",
            borderRadius: "20px",
            transition: "all ease 0.4s",
            maxHeight: values?.congratzStatus ? 1500 : 0,
            mb: values?.congratzStatus ? "25px" : 0,
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              p: "20px",
              gap: "20px",
            }}
          >
            {["text", "voice", "video"].map((item) => (
              <Button
                key={item}
                sx={{
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                  fontSize: "16px",
                  border: 1,
                  borderColor: colors.main,
                  bgcolor:
                    values?.congratz?.type === item
                      ? `${colors.main} !important`
                      : "#fff",
                  color: values?.congratz?.type === item ? "#fff" : colors.main,
                }}
                onClick={() => addCongratzType(item)}
              >
                {language === "en" ? item : arabicTybes[item]}
              </Button>
            ))}
          </Stack>
          <Stack
            sx={{
              flexDirection: {
                md: "row",
                xs: "column",
              },
              alignItems: "flex-start",
              justifyContent: "space-between",
              p: "20px",
            }}
          >
            <CheckTextInput
              type="text"
              name="congratz.content.from"
              label={language === "en" ? "Sender" : "المرسل"}
              value={values?.congratz?.content?.from}
              error={errors.congratz?.content?.from}
              touched={touched.congratz?.content?.from}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <CheckTextInput
              type="text"
              name="congratz.content.to"
              label={language === "en" ? "Reciever" : "المستلم"}
              value={values?.congratz?.content?.to}
              error={errors.congratz?.content?.to}
              touched={touched.congratz?.content?.to}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Stack>
          {values?.congratz?.type === "text" ? (
            <CheckTextArea
              name="congratz.content.data"
              label={language === "en" ? "Text" : "النص"}
              value={values?.congratz?.content?.data}
              error={errors.congratz?.content?.data}
              touched={touched.congratz?.content?.data}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          ) : undefined}
          {values?.congratz?.type === "voice" ? (
            <Box mb="25px" px="25px">
              {/* <RecordVoice
                setRecordVoice={setRecordVoice}
                setFieldValue={setFieldValue}
              /> */}
              <RecordVoideNew
                setRecordVoice={setRecordVoice}
                recordVoice={recordVoice}
                setFieldValue={setFieldValue}
              />
            </Box>
          ) : undefined}
          {values?.congratz?.type === "video" ? (
            <Box mb="25px" px="25px">
              <UploadFile
                acceptFile={"video/*"}
                label={language === "en" ? "Upload video" : "حمل فيديو"}
                language={language}
                formikKey={values?.congratz?.content?.data}
                setState={handleUploadVideo}
                error={errors?.congratz?.content?.data}
                isTouched={touched?.congratz?.content?.data}
              />
            </Box>
          ) : undefined}
          {values?.congratz?.type === "video"
            ? uploadedVideo && (
                <Box mb="25px" px="25px">
                  <CardMedia
                    controls
                    component="video"
                    sx={{
                      height: {
                        md: 400,
                        xs: 280,
                      },
                      width: {
                        md: 400,
                        xs: 1,
                      },
                    }}
                    src={URL.createObjectURL(uploadedVideo)}
                  />
                </Box>
              )
            : undefined}
        </Box>
        <Stack
          sx={{
            flexDirection: {
              md: "row",
              xs: "column",
            },
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <CheckTextInput
            type="text"
            name="name"
            label={language === "en" ? "name" : "الأسم"}
            value={values.name}
            error={errors.name}
            touched={touched.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <CheckTextInput
            type="email"
            name="email"
            label={language === "en" ? "Email" : "البريد الإلكتروني"}
            value={values.email}
            error={errors.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: {
              md: "row",
              xs: "column",
            },
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <SaPhoneInput
            type="text"
            name="phone"
            label={language === "en" ? "Phone" : "رقم الجوال"}
            value={values.phone}
            error={errors.phone}
            touched={touched.phone}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          <CheckTextInput
            type="text"
            name="country"
            label={language === "en" ? "Country" : "الدولة"}
            value={values.country}
            error={errors.country}
            touched={touched.country}
            handleChange={handleChange}
            handleBlur={handleBlur}
            disabled={true}
          />
        </Stack>
        <Stack
          sx={{
            flexDirection: {
              md: "row",
              xs: "column",
            },
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* <CheckTextInput
            type="text"
            name="city"
            label={language === "en" ? "City" : "المدينة"}
            value={values.city}
            error={errors.city}
            touched={touched.city}
            handleChange={handleChange}
            handleBlur={handleBlur}
            disabled={true}
          /> */}
          <Box
            sx={{
              position: "relative",
              pb: "20px",

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
              {language === "en" ? "City" : "المدينة"}
            </Typography>
            <select
              name="city"
              onChange={(e) => {
                handleChange(e);
                formik.setFieldValue("address", "");
              }}
              onBlur={handleBlur}
              value={values.city}
              style={{
                width: "100%",
                border: `1px solid ${
                  errors.city && touched.city ? "red" : colors.main
                }`,
                borderRadius: "20px",
                fontSize: "20px",
                padding: "8px 15px",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                outline: 0,
              }}
            >
              <Typography py="15px" component="option" selected hidden>
                {language === "en" ? "Select a city" : "أختر مدينة"}
              </Typography>
              {["المدينة المنورة", "جدة"].map((option) => (
                <Typography height="15px" value={option} component="option">
                  {option}
                </Typography>
              ))}
            </select>
            {errors.city && touched.city ? (
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
                {errors.city}
              </Typography>
            ) : undefined}
          </Box>
          <CheckTextInput
            type="text"
            name="address"
            label={language === "en" ? "Address" : "العنوان"}
            nestedLabel={
              <Typography
                sx={{
                  fontSize: "13px",
                  mx: "5px",
                  display: "inline",
                  fontWeight: "bold",
                  fontFamily: publicFontFamily,
                }}
              >
                {values?.city ? `(${values.city})` : undefined}
              </Typography>
            }
            value={values.address}
            error={errors.address}
            touched={touched.address}
            handleChange={handleChange}
            handleBlur={handleBlur}
            disabled={!values.city}
          />
        </Stack>
        {!values.fastDelivery ? (
          <Stack
            sx={{
              flexDirection: {
                md: "row",
                xs: "column",
              },
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <CheckTextInput
              type="date"
              name="receiveDate"
              label={language === "en" ? "receive" : "تاريخ الاستلام"}
              value={values.receiveDate}
              error={errors.receiveDate}
              touched={touched.receiveDate || touched.fastDelivery}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </Stack>
        ) : undefined}
        <Stack
          sx={{
            flexDirection: {
              md: "row",
              xs: "column",
            },
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "20px",
            mt: "10px",
            mb: "20px",
          }}
        >
          <input
            type="checkbox"
            id="fast-delivery"
            style={{
              accentColor: colors.main,
              height: "20px",
              width: "20px",
              cursor: "pointer",
            }}
            name="fastDelivery"
            check={values.fastDelivery}
            value={values.fastDelivery}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Typography
            component={"label"}
            htmlFor={"fast-delivery"}
            fontFamily={publicFontFamily}
            fontWeight={"bold"}
            sx={{
              color: colors.main,
              fontSize: {
                md: "19px",
                xs: "17.5px",
              },
              cursor: "pointer",
            }}
          >
            {language === "en" ? "Fast delivery" : "توصيل سريع"}
          </Typography>
        </Stack>
        {values.fastDelivery ? (
          <Box>
            <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
              <Typography
                variant="h6"
                sx={{
                  color: colors.main,
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
              >
                {noteMessage}
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
              <Typography
                sx={{
                  color: colors.main,
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
              >
                {language === "en"
                  ? "foast delivery coast: "
                  : "تكلفة التوصيل السريع: "}
              </Typography>
              <Typography
                sx={{
                  color: colors.main,
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                }}
              >
                {fastCoast} {language === "en" ? "SAR" : "ر.س"}
              </Typography>
            </Stack>
          </Box>
        ) : undefined}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Button onClick={handleSubmit}>
            <KeyboardBackspaceIcon
              sx={{
                color: colors.main,
                transform: language === "en" ? "rotateY(180deg)" : undefined,
                fontSize: "50px",
              }}
            />
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FirstTab;
