import React from 'react'
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useGetAllPrivcayQuery } from '../../APIs/privacyApi';
import { contactWaysIcons, ImportantLinksData } from '../../Pages/contactUs/assets/contact.data';
import { useTranslation } from 'react-i18next';
import { footerStyle, iconBoxStyle } from './FooterStyle';
import { publicFontFamily } from '../publicStyle/publicStyle';

export const ImportantLinks = () => {
    const { data, } = useGetAllPrivcayQuery();
    const navigate = useNavigate();
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
                    gap: 1,
                }}>
                <Box
                    sx={{
                        display: {
                            xs: "flex",
                            md: "inline"
                        },
                        justifyContent: "center",
                    }}>
                    <Box>{contactWaysIcons[1].icon}</Box>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: publicFontFamily,
                            fontWeight: "bold",
                            fontSize: {
                                md: "18px",
                                xs: "14px",
                            },
                        }}>
                        {contactWaysIcons[1][`title_${lang}`]}
                    </Typography>
                </Box>
            </Box>
            <Typography sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                fontSize: {
                    md: "20px",
                    xs: "14px",
                },
                borderBottom: 1,
                borderColor: 'white',
            }}>
                {lang === 'ar' ? "روابط مهمة" : "Important Links"}
            </Typography>
            {data?.data?.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        disableRipple
                        onClick={() => {
                            navigate(`/policies/${item?.type}`);
                            window.scrollTo(0, 0);
                        }}
                        sx={{
                            fontWeight: "bold",
                            fontSize: {
                                md: "18px",
                                xs: "14px",
                            },
                            textAlign: 'start',
                            textTransform: "capitalize",
                            backgroundColor: "transparent !important",
                            display: "block",
                            color: footerStyle.color,
                            fontFamily: publicFontFamily,
                        }}
                    >
                        {lang === "en" ? item?.title_en : item?.title_ar}
                    </Button>
                </Box>
            ))}
            {ImportantLinksData.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        disableRipple
                        onClick={() => {
                            navigate(`${item.link}`);
                            window.scrollTo(0, 0);
                        }}
                        sx={{
                            fontWeight: "bold",
                            fontSize: {
                                md: "18px",
                                xs: "14px",
                            },
                            textTransform: "capitalize",
                            backgroundColor: "transparent !important",
                            display: "block",
                            color: footerStyle.color,
                            fontFamily: publicFontFamily,
                        }}
                    >
                        {lang === "en" ? item.title_en : item.title_ar}
                    </Button>
                </Box>
            ))}
        </Box>
    )
}
