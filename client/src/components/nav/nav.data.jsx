import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import useFetchCategories from "../../Pages/home/category/useFetchCategories";
// import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import { colors } from "../publicStyle/publicStyle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import useFetchCategoriesWithSubAndSubSubs from "../../hooks/useFetchCategoriesWithSubAndSubSubs";
export const urlPath = `https://tse3.mm.bing.net/th?id=OIP.1d7TQI67pwfr0F5jqTgD1AHaGw&pid=Api&P=0`;
// export const navLinks = ["About us ", "home", "prifle"];
// const [_, {language}] = useTranslation()
export const navLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/aboutUs" },
  {
    title: "departments",
    nestedLinks: [
      { title: "men", link: "/departments/men" },
      { title: "women", link: "/departments/women" },
      { title: "children", link: "/departments/children" },
    ],
  },
  { title: "Profile", link: "/profile" },
];
const iconStyle = {
  color: colors.main,
  fontSize: "20px",
};
export const ProfileMenuData = [
  {
    name_en: "Login",
    name_ar: "تسجيل الدخول",
    path: "sign-in",
    icon: <LoginIcon sx={iconStyle} />,
  },
  {
    name_en: "Register",
    name_ar: "إنشاء حساب",
    path: "register",
    icon: <AppRegistrationIcon sx={iconStyle} />,
  },
  {
    name_en: "Profile",
    name_ar: "الملف الشخصي",
    path: "profile",
    icon: <AccountCircleIcon sx={iconStyle} />,
  },
  {
    name_en: "Logout",
    name_ar: "تسجيل خروج",
    path: "",
    icon: <LogoutIcon sx={iconStyle} />,
  },
];

export const profile_cart_likesData = [
  {
    name: "cart",
    icon: <ShoppingCartOutlinedIcon />,
    data: [],
    path: "/cart",
  },
  {
    name: "likes",
    icon: <FavoriteBorderOutlinedIcon />,
    data: [],
    path: "/savedProducts",
  },
  // {
  //   name: "profile",
  //   icon: <Person2Icon />,
  //   path: "/profile",
  // },
];

export const NavLinksData = () => {
  return [
    {
      title_en: "Home",
      title_ar: "الصفحة الرئيسية",
      link: "/",
    },
    {
      title_en: "Our Departments",
      title_ar: "أقسامنا",
      // nestedLinks: useFetchCategories(),
      nestedLinks: useFetchCategoriesWithSubAndSubSubs(),
    },
    {
      title_en: "All Departments",
      title_ar: "جميع الاقسام",
      link: "/departments",
    },
    // {
    //   title_en: "Who are we",
    //   title_ar: "من نحن",
    //   link: "/aboutUs",
    // },
    // {
    //   title_en: "Contact Us",
    //   title_ar: "تواصل معنا",
    //   link: "/contactUs",
    // },
    // {
    //   title_en: "Our Blogs",
    //   title_ar: "مدوناتنا",
    //   link: "/blogs"
    // },
  ];
};


export const NavLinksMobileData = () => {
  return [
    {
      title_en: "Home",
      title_ar: "الصفحة الرئيسية",
      link: "/",
    },
    {
      title_en: "Saved products",
      title_ar: "المفضلة لديك",
      link: "/savedProducts",
    },
    {
      title_en: "Our Departments",
      title_ar: "أقسامنا",
      // nestedLinks: useFetchCategories(),
      nestedLinks: useFetchCategoriesWithSubAndSubSubs(),
    },
    {
      title_en: "All Departments",
      title_ar: "جميع الاقسام",
      link: "/departments",
    },
    {
      title_en: "Who are we",
      title_ar: "من نحن",
      link: "/aboutUs",
    },
    {
      title_en: "Contact Us",
      title_ar: "تواصل معنا",
      link: "/contactUs",
    },
    {
      title_en: "Our Blogs",
      title_ar: "مدوناتنا",
      link: "/blogs"
    },
  ];
};

