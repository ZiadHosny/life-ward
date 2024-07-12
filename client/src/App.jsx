import "./App.css";
import Nav from "./components/nav/Nav";
import NavTest from "./components/nav/NavTest";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Router/Router";
import Cards from "./components/cards/Cards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
// import { useCreateGuestUserMutation } from "./APIs/gestUserApi";
import Footer from "./components/footer/Footer";
import useFetchCart from "./Pages/cart/useFetchCart";
import useFetchSavedProducts from "./Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import ScrollingUpDuringRouting from "./ScrollingUp";
import { useLazyGetMeQuery } from "./APIs/UserApis";
import { setCurrentUser } from "./APIs/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCreateGuestUserMutation } from "./APIs/gestUserApi";
import { WhatsAppChat } from "./components/WhatsAppChat";
function App() {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { getSaved } = useFetchSavedProducts();
  const { getCarts } = useFetchCart();
  const dispatch = useDispatch();
  const [createGuestUser] = useCreateGuestUserMutation()

  const { currentUser } = useSelector((state) => state);


  useEffect(() => {
    i18n.changeLanguage(i18n.language || "ar")
  }, [])
  useEffect(() => {
    if (localStorage?.token) {
      getMe()
        .unwrap()
        .then((res) => res)
        .catch(() => {
          createGuestUser()
            .unwrap()
            .then((res) => {
              localStorage.setItem('token', res.token)
            })
        })
    }
  }, [])
  useEffect(() => {
    if (!localStorage.token) {
      createGuestUser()
        .unwrap()
        .then((res) => {
          localStorage.setItem('token', res.token)
        })
    }
  }, [])

  useEffect(() => {
    getSaved();
    getCarts();
  }, []);

  useEffect(() => {

    const language = localStorage.getItem("i18nextLng");

    if (language?.includes("en")) {

      i18n.changeLanguage("en" || "en");
      return
    }
    i18n.changeLanguage(language || "en");

  }, []);


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     getGuestUser().then(({ data, error }) => {
  //       if (data) {
  //         // localStorage.setItem("token", data.token);
  //       }
  //     });
  //   }
  // }, [localStorage.getItem("token")]);
  const [getMe] = useLazyGetMeQuery();
  useEffect(() => {
    getMe()
      .then(({ data }) => {
        if (data) {
          dispatch(setCurrentUser(data?.data));
        }
      })
      .catch((e) => {

      });
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <NavTest />
      <AppRoutes />
      <Footer />
      <WhatsAppChat />
      <ScrollingUpDuringRouting />
    </BrowserRouter>
  );
}

export default App;
