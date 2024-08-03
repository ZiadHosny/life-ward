import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "../../Pages/SignIn/SignIn";
import SignUp from "../../Pages/SignUp/SignUp";
import Home from "../../Pages/home/Home";
import ProductsListForCart_Saved from "../../Pages/ProductsListForCart_Saved/ProductsListForCart_Saved";
import Profile from "../../Pages/Profile/Profile";
import Departments from "../../Pages/departments/Departments";
import SavedProducts from "../../Pages/savedProducts/SavedProducts";
import ContactUsPage from "../../Pages/contactUs/ContactUsPage";
import { AnimatePresence } from "framer-motion";
import AboutUsPage from "../../Pages/aboutUs/AboutUsPage";
import SingleProduct from "../../Pages/singleProduct/SingleProduct";
import SavedTest from "../../Pages/savedTest/SavedTest";
import CartTest from "../../Pages/cart/CartTest";
import CheckTest from "../../Pages/checkout/CheckTest";
import PrivacyPolicyPage from "../../Pages/privacyPolicy/PrivacyPolicyPage";
import CompletePaymentPage from "../../Pages/CompletePayment/CompletePaymentPage";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import OurTarget from "../../Pages/home/OurTarget";
import VedioPage from "../../Pages/videoPage/VideoPage";
import SingleTest from "../singleTest/SingleTest";
import { lazy, useEffect } from "react";
import BlogsPage from "../../Pages/blogs/BlogsPage";
import SingleBlogPage from "../../Pages/singleBlog/SingleBlog";
import CategoryPage from "../../Pages/categoryPage/CategoryPage";
import GooglePage from "../../Pages/googlePage/GooglePage";
import SearchPage from "../../Pages/searchPage/SearchPage";
import NotificationsPage from "../../Pages/Notifications/index";
import ForgetPassword from "../../Pages/ForgetPassword/ForgetPassword";
import ThanksPage from "../../Pages/thanksOrder/ThanksPage";
import About2 from './../../Pages/aboutUs/about2/About2';
const AnalyticsMetaTags = lazy(() =>
  import('../../Pages/analyticsMeta/AnalyticsMeta')
)
const AppRoutes = () => {
  const { currentUser } = useSelector((state) => state);
  const location = useLocation();


  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  const CheckCurrentUser = (user) => {
    if (Object.keys(currentUser).length) {
      currentUser?.role !== "guest" ? false : true
    }
  }
  const checkAuthentication =
    (currentUser &&
      Object.keys(currentUser).length > 0 &&
      currentUser?.role !== "guest" ||
      currentUser?.email) ||
    currentUser?.phone
  return (
    <AnimatePresence>
      <AnalyticsMetaTags />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<About2 />} />
        {/* <Route path="/savedProducts" element={<ProductsListForCart_Saved />} /> */}
        {/* <Route path="/profile" element={<ProfileTest />} /> */}
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        <Route path="/cart" element={<CartTest />} />
        <Route path="/contactUs" element={<ContactUsPage />} />
        <Route path="/departments" element={<Departments />} />
        <Route
          path="/departments/:categoryId/:categoryName"
          element={<CategoryPage />}
        />
        <Route path="/savedProducts" element={<SavedTest />} />
        {/* <Route path="/savedProducts" element={<SavedProducts />} /> */}
        <Route
          path="/productDetails/:productId/:productName"
          element={<SingleProduct />}
        />
        <Route path="/policies/:type" element={<PrivacyPolicyPage />} />
        <Route path="/completePayment" element={<CompletePaymentPage />} />
        <Route path="/ourTarget" element={<VedioPage />} />
        <Route path="/single-test" element={<SingleTest />} />
        {/* <Route path="/payment-moyasar" element={<PaymentMoyasar />} /> */}
        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:blogId/:blogName" element={<SingleBlogPage />} />
        <Route path="/auth/google/callback" element={<GooglePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />

        <Route
          element={
            <ProtectedRoutes
              condition={currentUser?.role !== "guest"}
            />
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckTest />} />

        </Route>
        <Route path="/thankYou" element={<ThanksPage />} />

        <Route element={<ProtectedRoutes condition={currentUser?.role === "guest" || !currentUser || !Object.keys(currentUser).length} />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
export default AppRoutes;
