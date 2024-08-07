import { useTranslation } from 'react-i18next';
import WhatsAppLogo from '../assets/whatsapp.svg'
import { useLocation } from 'react-router-dom';

const whatsAppLink = "https://wa.me/+966599790939"
const titleWhenHoverEn = 'Chat With Us'
const titleWhenHoverAr = 'تواصل معانا'

export const WhatsAppChat = () => {
    const { pathname } = useLocation()
    const [_, { language }] = useTranslation();

    const inProductDetails = pathname.includes('productDetails')
    const inCart = pathname.includes('cart')

    return (
        <div
            dir='rtl'
            title={
                language === "en"
                    ? titleWhenHoverEn
                    : titleWhenHoverAr
            }>
            <a
                href={whatsAppLink}
                target='_blank'
                style={{
                    bottom: (inProductDetails || inCart) ? 65 : 20,
                    right: language === "en" ? 30 : null,
                    left: language === "ar" ? 30 : null,
                    zIndex: 999,
                    position: 'fixed',
                    height: "65px",
                    width: "65px",
                    padding: "15px",
                    backgroundColor: "rgb(37, 211, 102)",
                    borderRadius: "50%"

                    // "&:hover": {
                    //     backgroundColor: "rgb(18, 140, 126)",

                    // }
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
            </a >
        </div >
    )
}
