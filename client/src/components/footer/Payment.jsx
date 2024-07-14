import { Box, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { contactWaysIcons } from "../../Pages/contactUs/assets/contact.data";
import Apple from "../../assets/payment/apple.jpg";
import Master from "../../assets/payment/master.jpg";
import Visa from "../../assets/payment/visa.jpg";
import Transfer from "../../assets/payment/transfer.jpg";
import Mda from "../../assets/payment/mda.jpg";
import Stc from "../../assets/payment/stc.jpg";
import { useTranslation } from 'react-i18next';
import { publicFontFamily } from '../publicStyle/publicStyle';

export const Payment = () => {
    const [_, { language: lang }] = useTranslation();

    return (
        <Box
            sx={{
                flex: 1,
                mx: "auto",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                flexDirection: "column",
                gap: 3,
                flexWrap: "wrap",
            }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "fit-content",
                    gap: {
                        lg: 2.5,
                        md: 1.5,
                        xs: 0.5,
                    },
                }}
            >
                <Box
                    sx={{
                        display: {
                            xs: "flex",
                            md: "inline"
                        },
                        justifyContent: "center",
                    }}
                >
                    <Box >{contactWaysIcons[0].icon}</Box>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: publicFontFamily,
                            fontWeight: "bold",
                            fontSize: {
                                md: "18px",
                                sm: '15px',
                                xs: "12px",
                            },
                        }}
                    >
                        {contactWaysIcons[0][`title_${lang}`]}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Typography
                    sx={{
                        fontFamily: publicFontFamily,
                        fontWeight: "bold",
                        fontSize: {
                            md: "20px",
                            md: "17px",
                            xs: "12px",
                        },
                        // borderBottom: 1,
                        // borderColor: 'white',
                    }}>
                    {lang === 'ar' ? "طرق الدفع المتاحة" : "Available payment methods"}
                </Typography>
                <hr />
                <Box
                    sx={{
                        marginY: '20px',
                        paddingX: '20px',
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                        },
                        gap: 2,
                        flexWrap: 'wrap'
                    }}>
                    <Box>
                        <CardMedia
                            component={"img"}
                            src={Mda}
                            sx={{
                                // width: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // height: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // objectFit: "fill",
                            }}
                        />
                    </Box>
                    <Box>
                        <CardMedia
                            component={"img"}
                            src={Visa}
                            sx={{
                                // width: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // height: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // objectFit: "fill",
                            }}
                        />
                    </Box>
                    <Box>
                        <CardMedia
                            component={"img"}
                            src={Master}
                            sx={{
                                // width: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // height: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // objectFit: "fill",
                            }}
                        />
                    </Box>
                    <Box>
                        <CardMedia
                            component={"img"}
                            src={Apple}
                            sx={{
                                // width: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // height: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // objectFit: "fill",
                            }}
                        />
                    </Box>
                    <Box>
                        <CardMedia
                            component={"img"}
                            src={Stc}
                            sx={{
                                // width: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // height: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // objectFit: "fill",
                            }}
                        />
                    </Box>
                    <Box>
                        <CardMedia
                            component={"img"}
                            src={Transfer}
                            sx={{
                                // width: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // height: {
                                //     md: 50,
                                //     xs: 25,
                                // },
                                // objectFit: "fill",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
