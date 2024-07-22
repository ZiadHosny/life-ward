import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import CheckTextInput from './latest/CheckTextInput';
import { colors, publicFontFamily } from '../../components/publicStyle/publicStyle'
import { useTranslation } from 'react-i18next';
import { useGetFastCoast, useGetNote } from './latest/FirstHooks';

const timesAr = ["٤ عصراً - ٧ مساءً", "٧ مساءً - ٩ مساءً", "٩ مساءً- ١٢ مساءً"]
const timesEn = ["4pm - 7pm", "7pm - 9pm", "9pm - 12pm"]

export const Tab3 = ({
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
}) => {
    const { fastCoast } = useGetFastCoast();
    const { noteMessage } = useGetNote();

    const [_, { language: lang }] = useTranslation();
    const times = lang === 'en' ? timesEn : timesAr

    return (
        <Grid
            item lg={4} xs={12}
            sx={{
                mx: 'auto',
                width: {
                    lg: '70%',
                    md: '90%',
                    sm: '100%',
                    xs: '100%'
                },
                pb: 10,
                borderRadius: 8,
                bgcolor: '#f2e5fc',
            }}>
            <Typography
                sx={{
                    fontSize: {
                        lg: 35,
                        md: 25,
                        sm: 25,
                        xs: 15,
                    },
                    p: 5,
                    color: colors.main,
                    fontWeight: "bolder",
                    fontFamily: publicFontFamily,

                }}>
                {lang === 'en' ?
                    "Enter the address?"
                    : "ادخل العنوان ؟"}
            </Typography>

            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: "center",
                    gap: 3,
                    width: '100%',
                    px: {
                        md: 0,
                        sm: 10,
                        xs: 5,
                    }
                }}>

                <Stack
                    sx={{
                        flexDirection: 'column',
                        width: {
                            md: 0.49,
                            xs: 1,
                        },
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}>
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
                        {lang === "en" ? "City" : "المدينة"}
                    </Typography>
                    <select
                        name="city"
                        onChange={(e) => {
                            handleChange(e);
                            setFieldValue("address", "");
                        }}
                        onBlur={handleBlur}
                        value={values.city}
                        style={{
                            width: "100%",
                            border: `1px solid ${errors.city && touched.city ? "red" : colors.main
                                }`,
                            borderRadius: "20px",
                            fontSize: "20px",
                            padding: "8px 15px",
                            fontFamily: publicFontFamily,
                            fontWeight: "bold",
                            outline: 0,
                        }}>
                        <Typography
                            fontFamily={publicFontFamily}
                            py="15px" component="option" selected hidden>
                            {lang === "en" ? "Select a city" : "أختر مدينة"}
                        </Typography>
                        {["المدينة المنورة", "جدة"].map((option) => (
                            <Typography
                                fontFamily={publicFontFamily}
                                sx={{
                                    cursor: 'pointer',
                                    color: colors.main,
                                    borderColor: colors.main,
                                    borderWidth: 1,
                                    fontSize: 20,
                                }}
                                value={option}
                                component="option">
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
                                color: "red",
                            }}
                        >
                            {errors.city}
                        </Typography>
                    ) : undefined}
                </Stack>

                <CheckTextInput
                    type="text"
                    name="address"
                    label={lang === "en" ? "Address" : "العنوان"}
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

                {!values.fastDelivery ? (
                    <CheckTextInput
                        type="date"
                        name="receiveDate"
                        label={lang === "en" ? "Receive" : "تاريخ الاستلام"}
                        value={values.receiveDate}
                        error={errors.receiveDate}
                        touched={touched.receiveDate || touched.fastDelivery}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                ) : undefined}

                <Stack
                    sx={{
                        flexDirection: 'column',
                        width: {
                            md: 0.49,
                            xs: 1,
                        },
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                    }}>

                    <Typography
                        fontFamily={publicFontFamily}
                        fontWeight={"bold"}
                        sx={{
                            color: colors.main,
                            fontSize: {
                                md: "19px",
                                xs: "17.5px",
                            },
                        }}>
                        {lang === "en" ? "Time" : "الوقت"}
                    </Typography>
                    <select
                        name="time"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.time}
                        style={{
                            width: "100%",
                            border: `1px solid ${errors.time && touched.time ? "red" : colors.main}`,
                            borderRadius: "20px",
                            fontSize: "20px",
                            padding: "8px 15px",
                            fontFamily: publicFontFamily,
                            fontWeight: "bold",
                            outline: 0,
                        }}
                    >
                        <Typography
                            fontFamily={publicFontFamily}
                            py="15px"
                            component="option"
                            selected hidden>
                            {lang === "en" ? "Select time" : "أختر الوقت"}
                        </Typography>
                        {times.map((option) => (
                            <Typography
                                fontFamily={publicFontFamily}
                                sx={{
                                    cursor: 'pointer',
                                    color: colors.main,
                                    borderColor: colors.main,
                                    borderWidth: 1,
                                    fontSize: 20,
                                }}
                                value={option}
                                component="option">
                                {option}
                            </Typography>
                        ))}
                    </select>
                    {errors.time && touched.time ? (
                        <Typography
                            sx={{
                                fontFamily: publicFontFamily,
                                fontSize: "17px",
                                fontWeight: "bold",
                                color: "red",
                            }}
                        >
                            {errors.time}
                        </Typography>
                    ) : undefined}

                </Stack>

                <Stack
                    sx={{
                        width: {

                            md: 0.49,
                            xs: 1,
                        },
                        flexDirection: 'row',
                        display: 'flex',
                        alignSelf: 'start',
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px",
                        mt: "10px",
                        mb: "20px",
                        mx: 'auto',
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
                        }}>
                        {lang === "en" ? "Fast delivery" : "توصيل سريع"}
                    </Typography>
                </Stack>

                {values.fastDelivery ? (
                    <Box sx={{
                        width: {

                            md: 0.49,
                            xs: 1,
                        },
                        mx: 'auto',
                        alignSelf: 'start',
                    }}>
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
                                {lang === "en"
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
                                {fastCoast} {lang === "en" ? "SAR" : "ر.س"}
                            </Typography>
                        </Stack>
                    </Box>
                ) : undefined}

            </Stack>
        </Grid>
    )
}
