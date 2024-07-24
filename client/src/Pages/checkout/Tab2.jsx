import { Grid, Stack, Typography } from '@mui/material'
import { colors, publicFontFamily } from '../../components/publicStyle/publicStyle'
import { useTranslation } from 'react-i18next';
import CheckTextInput from './latest/CheckTextInput';
import SaPhoneInput from '../../components/SaPhoneInput/SaPhoneInput';
import { MobileTab } from './MobileTab';

export const Tab2 = ({
    setValue,
    mobileTabShowed,
    setMobileTabShowed,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
}) => {
    const [_, { language: lang }] = useTranslation();

    return (
        <>
            <Grid
                item lg={4} xs={12}
                sx={{
                    display: mobileTabShowed ? 'none' : 'block',
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
                        "Enter the following information?"
                        :
                        "ادخل المعلومات التالية؟"
                    }
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
                    <CheckTextInput
                        type="text"
                        name="name"
                        label={lang === "en" ? "name" : "الأسم"}
                        value={values.name}
                        error={errors.name}
                        touched={touched.name}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <CheckTextInput
                        type="email"
                        name="email"
                        label={lang === "en" ? "Email" : "البريد الإلكتروني"}
                        value={values.email}
                        error={errors.email}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <SaPhoneInput
                        type="text"
                        name="phone"
                        label={lang === "en" ? "Phone" : "رقم الجوال"}
                        value={values.phone}
                        error={errors.phone}
                        touched={touched.phone}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                </Stack>
            </Grid>

            <MobileTab
                setValue={setValue}
                showed={mobileTabShowed}
                setMobileTabShowed={setMobileTabShowed}
                userPhone={values.phone}
            />
        </>
    )
}
