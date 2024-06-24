import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../APIs/UserApis";
import { useVerifyCodeMutation } from "../../APIs/verifySmsApi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../APIs/userSlice";
import { useLazyGetAllCartsQuery } from "../../APIs/cartApi";
import { setCart } from "../../APIs/cartSlice";
import { useLazyGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
function useSignUp() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [getCartsByUser, {}] = useLazyGetAllCartsQuery();
  const [getSavedProducts, {}] = useLazyGetAllSavedProductsQuery();
  const [_, { language: lang }] = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [verifyCode] = useVerifyCodeMutation();
  const dispatch = useDispatch();
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
        dispatch(setCurrentUser(res.data));
        setOpenModal(false);
        localStorage.setItem("token", res.token);
        navigate("/");
        handleDispatchedData();
      })
      .catch((ERR) => toast.error(ERR?.data[`error_${lang}`]));
  };
  function signUp(user, productRoute) {
    !user.birthDate ? delete user.birthDate : undefined;
    !user.gender ? delete user.gender : undefined;
    const phoneType = user?.registrationType==="phone"?{...user,phone:`966${user?.phone}`}:user;
    register(phoneType)
      .unwrap()
      .then((res) => {
        if (res.success_en) {
          if (user.registrationType === "email") {
            dispatch(setCurrentUser(res.data));
            setOpenModal(false);
            localStorage.setItem("token", res.token);
            setTimeout(() => {
              navigate(productRoute ? productRoute : "/");
            }, 500);
            handleDispatchedData();
          } else {
            setOpenModal(true);
          }
        }
      })
      .catch((error) => {
        toast.error(error.data[`error_${lang}`]);
      });
  }
  return [signUp, {setOpenModal ,openModal, verifySMSCode }];
}

export default useSignUp;
