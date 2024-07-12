import { Box, Typography } from "@mui/material";
import { contactWaysIcons } from "../../Pages/contactUs/assets/contact.data";
import { iconBoxStyle } from "./FooterStyle";
import { publicFontFamily } from "../publicStyle/publicStyle";
import { useTranslation } from "react-i18next";

export const ContactUs = () => {
    const [_, { language: lang }] = useTranslation();

    return (
        <Box
            sx={{
                mx: "auto",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                flexDirection: "column",
                gap: 3,
            }}
        >
            {contactWaysIcons.map((contactWay) => (
                <Box
                    key={contactWay.title_en}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        gap: {
                            lg: 2.5,
                            md: 1.5,
                            xs: 0.5,
                        },
                        width: "fit-content",
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "flex", md: "inline" },
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={iconBoxStyle}>{contactWay.icon}</Box>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: publicFontFamily,

                                fontWeight: "bold",
                                width: "100px",
                                fontSize: {
                                    md: "18px",
                                    xs: "14px",
                                },
                            }}
                        >
                            {contactWay[`title_${lang}`]}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}
