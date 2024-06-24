import React, { useEffect, useState } from "react";
import { useLazyGetMeQuery, useLoginMutation } from "../../APIs/UserApis";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLazyGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { useLazyGetAllCartsQuery } from "../../APIs/cartApi";
import { useDispatch } from "react-redux";
import { setSaved } from "../../APIs/savedSlice";
import { setCart } from "../../APIs/cartSlice";
import { setCurrentUser } from "../../APIs/userSlice";
import { useVerifyCodeMutation } from "../../APIs/verifySmsApi";
function useLogin() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [_, { language: lang }] = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [getMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const [getCartsByUser, {}] = useLazyGetAllCartsQuery();
  const [getSavedProducts, {}] = useLazyGetAllSavedProductsQuery();
  const handleDispatchedData = () => {
    if (localStorage.getItem("token")) {
      getCartsByUser().then(({ data, error }) => {
        if (data?.cart[0] && !error) {
          dispatch(setCart(data?.cart.length));
        }
      });
      getSavedProducts().then(({ data, error }) => {
        if (data?.products[0] && !error) {
          dispatch(setSaved(data?.products.length));
        }
      });
    }
  };
  const verifySMSCode = (payload) => {
    verifyCode({ endpoint: "/auth/verifyCode", payload })
      .unwrap()
      .then((res) => {
        if (res?.data) {
          dispatch(setCurrentUser(res.data));
          setOpenModal(false);
          localStorage.setItem("token", res.token);
          navigate("/");
        }
      })
      .catch((ERR) => toast.error(ERR.data[`error_${lang}`]));
  };
  function authUser(user, productRoute) {
    console.log(user,'userasddsadsa')
    const phoneType = user?.registrationType==="phone"?{...user,phone:`966${user?.phone}`}:user;

    login(phoneType)
      .then(({ data, error }) => { 
         
          
        if (data) {
          if (user.registrationType === "email") {
            handleDispatchedData();
            dispatch(setCurrentUser(data.data));
            localStorage.setItem("token", data.token);
            setTimeout(() => {
              navigate(productRoute ? productRoute : "/");
            }, 500);
          } else {
            setOpenModal(true);
          }
        } else {
          toast.error(error?.data[`error_${lang}`] || error?.data);
        }
      })
      .catch((e) => {
         
      });
  }

  return [authUser, { setOpenModal,openModal ,verifySMSCode }];
}

export default useLogin;
