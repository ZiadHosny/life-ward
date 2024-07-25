import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThirdTab from "./latest/ThirdTab";
import { useTranslation } from "react-i18next";
import { Label, TabPanel } from "./Label";
import { Tab1 } from "./Tab1";
import { Tab2 } from "./Tab2";
import { publicFontFamily } from "../../components/publicStyle/publicStyle";
import { Tab3 } from "./Tab3";
import { Tab4 } from "./Tab4";
import { useFormik } from "formik";
import { checkoutValidaions, checkoutValues } from "./check_assets/checkout.inputs";
import * as Yup from "yup";
import { useUploadMediaMutation } from "../../APIs/UploadAPi";
import { useAddOrderMutation, useSendOrderSmsMutation } from "../../APIs/ordersApi";
import { useVerifyCartMutation } from "../../APIs/cartApi";
import { useLazyGetMeQuery } from "../../APIs/UserApis";
import { Dialog } from "./Dialog";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../APIs/dialogSlice";
import { toast } from "react-toastify";

const CheckTest = () => {
  const [sendSms] = useSendOrderSmsMutation()

  const [mobileTabShowed, setMobileTabShowed] = useState(false)
  const [getMe] = useLazyGetMeQuery();
  const [uploadMedia] = useUploadMediaMutation();
  const [addOrder] = useAddOrderMutation();
  const [submitCheckout] = useVerifyCartMutation();
  const [_, { language: lang }] = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch()
  const dialog = useSelector(state => state.dialog)

  const [recordVoice, setRecordVoice] = useState();
  const [uploadedVideo, setUploadVideo] = useState();


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
                    res[`success_${lang === "en" ? "en" : "ar"}`]
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
                      setValue(3);
                    })
                    .catch((err) =>
                      toast.error(err.data[`error_${lang}`] || err.data)
                    );
                })
                .catch((e) => {
                  // toast.error(e?.data[`error_${lang === 'en' ? 'en' : 'ar'}`]);
                  toast.error(
                    lang === "en" ? e.data?.error_en : e?.data?.error_ar
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
                  setValue(3);
                })
                .catch((err) =>
                  toast.error(err.data[`error_${lang}`] || err.data)
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
                  res[`success_${lang === "en" ? "en" : "ar"}`]
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
                    setValue(3);
                  })
                  .catch((err) =>
                    toast.error(err.data[`error_${lang}`] || err?.data)
                  );
                // nav('/checkout')
              })
              .catch((e) => {
                // toast.error(e?.data[`error_${lang === 'en' ? 'en' : 'ar'}`]);
                toast.error(
                  lang === "en" ? e.data?.error_en : e?.data?.error_ar
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
                setValue(3);
              })
              .catch((err) =>
                toast.error(err.data[`error_${lang}`] || err?.data)
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
              toast.success(res[`success_${lang === "en" ? "en" : "ar"}`]);
              localStorage.removeItem("couponData");

              addOrder(values)
                .unwrap()
                .then(() => {
                  setValue(3);
                })
                .catch((err) =>
                  toast.error(err.data[`error_${lang}`] || err?.data)
                );
            })
            .catch((e) => {
              // toast.error(e?.data[`error_${lang === 'en' ? 'en' : 'ar'}`]);
              toast.error(
                lang === "en" ? e.data?.error_en : e?.data?.error_ar
              );
            });
        } else {
          addOrder(values)
            .unwrap()
            .then(() => {
              setValue(3);
            })
            .catch((err) =>
              toast.error(err.data[`error_${lang}`] || err?.data)
            );
        }
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

  useEffect(() => {
    dispatch(openDialog())
  }, []);

  useEffect(() => {
    if (dialog.for !== 'friend') {
      setValue(1)
    } else {
      setValue(0)
    }
    if (dialog.phone) {
      setFieldValue("phone", dialog.phone)
      setFieldValue("for", dialog.for)
    }
  }, [dialog]);

  useEffect(() => {
    if (!values?.congratzStatus) {
      delete values?.congratz;
    } else {
      setFieldValue("congratz", {
        type: "text",
        content: {
          from: "",
          to: "",
          data: "",
        },
      });
    }
  }, [values?.congratzStatus]);


  useEffect(() => {
    getMe().then(({ data, error }) => {
      if (data.data && !error) {
        const tempUser = { ...data.data };
        setFieldValue("name", tempUser.name.trim());
        setFieldValue("email", tempUser.email);
        setFieldValue("phone", tempUser.phone);
        setFieldValue("country", lang === "en" ? "Saudi Arabia" : "السعودية");
        // setFieldValue("city", lang === "en" ? "Jeddah" : "جدة");
      }
    });
  }, []);

  useEffect(() => {
    if (values.fastDelivery) {
      setFieldValue("receiveDate", "");
    }
  }, [values.fastDelivery]);

  useEffect(() => {
    setValues({
      ...values,
      country: lang === "en" ? "Saudi Arabia" : "السعودية",
    });
  }, [lang]);

  const changeTab = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          p: 3,
          width: {
            lg: 0.9,
            md: 0.8,
            sm: 1,
            xs: 1,
          },
          mx: "auto",
          pt: {
            md: '200px',
            sm: "100px",
            xs: '100px'
          },
          pb: "100px"
        }}
      >

        <Tabs
          sx={{
            width: '100%',
            mb: 5,
          }}
          centered
          indicatorColor=""
          value={value}
          variant="fullWidth"
          onChange={changeTab}>

          {dialog.for === 'friend' ?
            <Tab
              label={
                <Label
                  title={lang === 'en' ? "Congratulations" : "التهنئة"}
                  number={1}
                  value={value}
                />
              }
            />
            :
            <></>}
          <Tab
            disabled={value < 2}
            label={
              <Label
                title={lang === 'en' ? "Information" : "المعلومات"}
                number={2}
                value={value} />
            } />
          <Tab
            disabled={value < 3}
            label={
              <Label
                title={lang === 'en' ? "Address" : "العنوان"}
                number={3}
                value={value} />
            } />
          <Tab
            disabled={value < 4}
            label={
              <Label
                title={lang === 'en' ? "Paying Off" : "الدفع"}
                number={4}
                value={value} />
            } />
        </Tabs>
        <TabPanel value={value} index={0} >
          <Tab1
            recordVoice={recordVoice}
            setRecordVoice={setRecordVoice}
            uploadedVideo={uploadedVideo}
            setUploadVideo={setUploadVideo}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            setValues={setValues}
            setFieldValue={setFieldValue}
          />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <Tab2
            setValue={setValue}
            mobileTabShowed={mobileTabShowed}
            setMobileTabShowed={setMobileTabShowed}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        </TabPanel>
        <TabPanel value={value} index={2} >
          <Tab3
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
          />
        </TabPanel>
        <TabPanel value={value} index={3} >
          <Tab4 />
        </TabPanel>

        <Box
          sx={{
            mx: 'auto',
            width: '100%',
            textAlign: 'center',
          }}>
          <Button
            onClick={() => {
              if (value === 1 && values.for === 'yourself') {
                sendSms({ phone: values.phone })
                  .unwrap()
                  .then((e) => {
                    toast.success(
                      lang === 'ar' ?
                        'تم ارسال الكود بنجاح' :
                        'The code was sent successfully'
                    )
                  })
                  .catch(e => {
                    toast.error(e?.data[`error_${lang}`] || e?.data)
                  })
                setMobileTabShowed(true)
              } else {
                if (value === 0) {
                  setValue(1)
                } else if (value === 1) {
                  setValue(2)
                } else if (value === 2) {
                  handleSubmit()
                }
              }
            }}
            sx={{
              color: "#fff",
              bgcolor: "#693096",
              "&:hover": {
                color: "#fff",
                bgcolor: "#693096",
              },
              fontWeight: "bolder",
              fontSize: {
                md: "25px",
                sm: "20px",
                xs: '14px',
              },
              borderRadius: "30px",
              fontFamily: publicFontFamily,
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              width: {
                lg: '40%',
                md: '55%',
                sm: '60%',
                xs: '70%'
              },
              textWrap: 'nowrap',
              marginX: 'auto',
              padding: "10px",
              marginY: '30px'
            }}>
            {value < 3 ?
              (lang === "en") ? "Proceed with payment" : "تابع الدفع"
              :
              (lang === "en") ? "Pay now" : "ادفع الان"
            }
          </Button>
        </Box>
      </Box>
      <Dialog />

    </form >
  );
};

export default CheckTest;
