import { useTranslation } from 'react-i18next';
import WhatsAppLogo from '../assets/whatsapp.svg'
import { IconButton, Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';

const whatsAppLink = "https://wa.me/+966599790939"
const titleWhenHoverEn = 'Chat With Us'
const titleWhenHoverAr = 'تواصل معانا'

export const WhatsAppChat = () => {
    const { pathname } = useLocation()
    const [_, { language }] = useTranslation();

    const inProductDetails = pathname.includes('productDetails')

    return (
        <Tooltip
            dir='rtl'
            title={
                language === "en"
                    ? titleWhenHoverEn
                    : titleWhenHoverAr
            }>
            <IconButton
                href={whatsAppLink}
                target='_blank'
                sx={{
                    bottom: inProductDetails ? 60 : 20,
                    right: language === "en" ? 30 : null,
                    left: language === "ar" ? 30 : null,
                    zIndex: 999,
                    position: 'fixed',
                    height: { xs: "60px", xl: "70px" },
                    backgroundColor: "rgb(37, 211, 102)",
                    "&:hover": {
                        backgroundColor: "rgb(18, 140, 126)",
                    }
                }}
            >
                <img
                    src={WhatsAppLogo}
                    alt="whatsApp"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </IconButton >
        </Tooltip >
    )
}
