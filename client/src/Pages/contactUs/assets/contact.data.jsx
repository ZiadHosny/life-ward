import i18next from "i18next";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import * as Yup from "yup";
const { language: lang } = i18next;

export const contactHeroSection = {
  heading_en: "We want to hear from you",
  heading_ar: "نريد أن نسمع منك",
  p_en: "Home / Contact",
  p_ar: "الصفحة الرئيسية",
};

export const contactHeader = {
  headTitle_en: "Our Contacts",
  headTitle_ar: "تواصلات بنا",
  headBody_en:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old",
  headBody_ar:
    "خلافًا للاعتقاد الشائع ، فإن Lorem Ipsum ليس مجرد نص عشوائي. لها جذور في قطعة من الأدب اللاتيني الكلاسيكي من 45 قبل الميلاد ، مما يجعلها أكثر من 2000 عام",
};

export const contactWaysIcons = [
  {
    title_en: "966599790939",
    title_ar: "966599790939",
    icon: <LocalPhoneIcon />,
    des_en: "0-123-456-7890",
    des_ar: "0-123-456-7890",
  },
  {
    title_en: "lifewardshop@gmail.com",
    title_ar: "lifewardshop@gmail.com",
    icon: <EmailOutlinedIcon />,
    des_en: "lifewardshop@gmail.com",
    des_ar: "lifewardshop@gmail.com",
  },
];

export const contactFormik = {
  heading_en: "Quick Contact Form",
  heading_ar: "نموذج الإتصال السريع",

  values: {
    name: "",
    email: "",
    phone: "",
    message: "",
    contactType: "",
  },

  errors: Yup.object({
    name: Yup.string().required(
      lang === "en" ? "Name is required" : "الأسم مطلوب"
    ),
    email: Yup.string()
      .email(() => (lang === "en" ? "Invalid Email" : "بريد إلكتروني خاطئ"))
      .required(
        lang === "en" ? "Email is required" : "البريد الإلكتروني مطلوب"
      ),
    phone: Yup.string()
      .matches(
        // /^966\d{9}$/,
        /^\d+$/,
        lang == "en"
          ? "Phone must be numbers only"
          : "رقم الجوال يجب ان يكون أرقام فقط"
      )
      .min(
        9,
        lang == "en"
          ? "Phone must be 9 numbers"
          : "رقم الجوال يجب ان يكون 9 أرقام"
      )
      .max(
        9,
        lang == "en"
          ? "Phone must be 9 numbers"
          : "رقم الجوال يجب ان يكون 9 أرقام"
      )
      .required(lang === "en" ? "Phone is required" : "رقم الجوال مطلوب"),
    message: Yup.string().required(
      lang === "en" ? "Message is required" : "الرسالة مطلوبة"
    ),
    contactType: Yup.string()
      .ensure()
      .oneOf(["complaints", "suggestions", "customerService"])
      .required(lang === "en" ? "Select Contact Type" : "اختار نوع التواصل"),
  }),
  ButtonContext_en: "Send",
  ButtonContext_ar: "إرسال",
};
