import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  CardMedia,
  Stack,
  Typography,
  Input,
  ButtonBase,
} from "@mui/material";
import CheckTextInput from "./CheckTextInput";
import visaPay from "../../../assets/visa.png";
import madaPay from "../../../assets/payment-mada.png";
import {
  colors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  checkoutValidaions,
  checkoutValues,
} from "../check_assets/checkout.inputs";
import moment from "moment";
import { useCreateOnlineOrderMutation, useLazyGetMyLastOrderQuery } from "../../../APIs/ordersApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useNavigate } from "react-router-dom";

const ThirdTab = ({ showed }) => {
  const [_, { language }] = useTranslation();
  const [createOnlineOrder] = useCreateOnlineOrderMutation();
  const { cart } = useSelector((state) => state.cart);

  const navigate= useNavigate();
const [getMyLastOrder]=useLazyGetMyLastOrderQuery()
  useEffect(()=>{
    // window.scrollTo(0, 0);
    if(showed)
    getMyLastOrder().then(res =>{
      if (res.paymentType === "cash") {
        navigate("/thankYou");
      } else {
        navigate(`/payment-moyasar`);
      }
    })

  },[showed])

  // formalName: "",
  //   creditCard: "",
  //   expirationDate: "",
  //   protectionSymbol: "",
 
  return (
    null
  );
};

// const ThirdTab=()=>{
//   const navigate= useNavigate();
// const [getMyLastOrder]=useLazyGetMyLastOrderQuery()
//   useEffect(()=>{
//     window.scrollTo(0, 0);
//     getMyLastOrder().then(res =>{
//       if (res.paymentType === "cash") {
//         navigate("/thankYou");
//       } else {
//         navigate(`/payment-moyasar`);
//       }
//     })

//   },[])
//   return null
// }

export default ThirdTab;
