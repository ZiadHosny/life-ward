import React, { useEffect, useState } from "react";
import { useGetAllCartsQuery } from "../../APIs/cartApi";
import { Button, Box, Stack, Typography } from "@mui/material";
import applePayIMG from "../../assets/payment/apple.jpg";
import stcPayIMG from "../../assets/payment/stc.jpg";

import Master from "../../assets/payment/master.jpg";
import Visa from "../../assets/payment/visa.jpg";
import Transfer from "../../assets/payment/transfer.jpg";
import Mda from "../../assets/payment/mda.jpg";

import { useTranslation } from "react-i18next";
import { MoyaserClientBaseUrl } from "../../components/service";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { colors, publicFontFamily } from '../../components/publicStyle/publicStyle';

const CheckBoxComponent = ({ label, value }) => {
  const [_, { language }] = useTranslation();

  return (
    <FormControlLabel
      sx={{
        my: "10px",
        gap: '0px',
        '& .MuiFormControlLabel-label': {
          width: '100%',
        }
      }}
      value={value}
      control={
        <Radio
          checkedIcon={
            <Box sx={{
              bgcolor: colors.main,
              borderRadius: '10px',
              border: 2,
              borderColor: colors.main,
              width: '50px',
              height: '50px',
            }} />
          }
          icon={
            <Box sx={{
              bgcolor: 'white',
              borderRadius: '10px',
              border: 2,
              borderColor: colors.main,
              width: '50px',
              height: '50px',
            }} />
          }
        />
      }
      label={
        <Box
          sx={{
            width: '100%',
            height: '50px',
            width: '100%',
            display: "flex",
            justifyContent: "space-between",
            px: {
              lg: '100px',
              md: '70px',
              sm: '70px',
              xs: '20px',
            },
            alignItems: "center",
            background: "white",
            borderRadius: "25px",
            border: "1px solid",
            borderColor: colors.main,
          }}
        >
          {label}
        </Box>
      }
      labelPlacement={'end'}
    />
  )
}


const publishable_api_key = "pk_test_jbeoHr2PpoSUwvKzHruPeChRLvtoH7rLaVywgprU";

const Creditcard = ({ amount, callback_url, description, metadata }) => {
  useEffect(() => {
    // @ts-ignore
    Moyasar.init({
      element: ".creditcard",
      amount,
      currency: "SAR",
      description,
      metadata,
      publishable_api_key,
      callback_url,
      methods: ["creditcard"],
    });
  }, [amount]);
  return <div className="creditcard"></div>;
};
const Stcpay = ({ amount, callback_url, description, metadata }) => {
  useEffect(() => {
    // @ts-ignore
    Moyasar.init({
      element: ".stcpay",
      amount,
      currency: "SAR",
      description,
      publishable_api_key,
      callback_url,
      metadata,
      methods: ["stcpay"],
    });
  }, [amount]);
  return <div className="stcpay"></div>;
};

const Applepay = ({ amount, callback_url, description, metadata }) => {
  useEffect(() => {
    // @ts-ignore
    Moyasar.init({
      element: ".applepay",
      amount,
      currency: "SAR",
      description,
      publishable_api_key,
      callback_url,
      methods: ["applepay"],
      metadata,
      apple_pay: {
        country: "SA",
        label: description,
        validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
      },
    });
  }, [amount]);
  return <div className="applepay"></div>;
};

export const PaymentMoyasar = () => {
  const [_, { language }] = useTranslation();
  // totalAmount
  // const {Total} = useSelector((state) => state.NcartReducer);
  // totalAmount
  const [type, setType] = useState("creditcard");

  const { data, isLoading, isSuccess } = useGetAllCartsQuery();
  console.log(data, 'datadatadatadatadatadatadata')
  const couponData = JSON.parse(localStorage.getItem("couponData"));

  if (isLoading) {
    return <Box sx={{ minHeight: "50vh" }}>loading ......</Box>;
  }

  if (isSuccess) {
    const metadata = {
      cart_id: data._id,
      user_id: data?.data?.user?._id,
      total_quantity: data?.data?.onlineItems?.quantity,
    };
    const callback_url = `${MoyaserClientBaseUrl}/thankYou?cart_id=${data._id}`;
    // const callback_url = `https://saritestsecond.online/thankYou?cart_id=${data._id}`
    const total = (data?.data?.onlineItems?.totalPrice || 0) * 100;

    return (
      <>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            onChange={(e) => {
              setType(e.target.value)
            }}
            defaultValue={type}
            sx={{
              mr: language === 'en' ? 3 : 0,
              ml: 3,
            }}>
            <CheckBoxComponent
              value={'creditcard'}
              label={
                <>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 20,
                        sm: 15,
                      },
                      fontWeight: 'bold',
                      fontFamily: publicFontFamily,
                      color: colors.main,
                    }}
                  >
                    {language == "en" ? "Credit Card" : "البطاقة البنكية"}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    gap: {
                      md: 5,
                      sm: 2,
                      xs: 2,
                    },
                  }}>
                    <Box
                      sx={{
                        width: {
                          md: '40px',
                          sm: '30px',
                          xs: '30px',
                        },
                        height: {
                          md: '40px',
                          sm: '30px',
                          xs: '30px',
                        },
                        border: 1,
                        borderColor: colors.main,
                      }}>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        src={Mda}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: {
                          md: '40px',
                          sm: '30px',
                          xs: '30px',
                        },
                        height: {
                          md: '40px',
                          sm: '30px',
                          xs: '30px',
                        },
                        border: 1,
                        borderColor: colors.main,

                      }}>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        src={Visa}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: {
                          md: '40px',
                          sm: '30px',
                          xs: '30px',
                        },
                        height: {
                          md: '40px',
                          sm: '30px',
                          xs: '30px',
                        },
                        border: 1,
                        borderColor: colors.main,

                      }}>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        src={Master}
                      />
                    </Box>
                  </Box>
                </>
              }
            />
            <CheckBoxComponent
              value={'stcpay'}
              label={
                <>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 20,
                        sm: 15,
                      },
                      fontWeight: 'bold',
                      fontFamily: publicFontFamily,
                      color: colors.main,
                      color: colors.main,
                    }}
                  >
                    {language == "en" ? "STC Pay" : "STC باي"}
                  </Typography>
                  <Box
                    sx={{
                      width: {
                        md: '40px',
                        sm: '30px',
                        xs: '30px',
                      },
                      height: {
                        md: '40px',
                        sm: '30px',
                        xs: '30px',
                      },
                      border: 1,
                      borderColor: colors.main,

                    }}>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      src={stcPayIMG}
                    />
                  </Box>
                </>
              }
            />
            <CheckBoxComponent
              value={'applepay'}
              label={
                <>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 20,
                        sm: 15,
                      },
                      fontWeight: 'bold',
                      fontFamily: publicFontFamily,
                      color: colors.main,
                    }}
                  >
                    {language == "en" ? "Apple Pay" : "ابل باي"}
                  </Typography>
                  <Box
                    sx={{
                      width: {
                        md: '40px',
                        sm: '30px',
                        xs: '30px',
                      },
                      height: {
                        md: '40px',
                        sm: '30px',
                        xs: '30px',
                      },
                      border: 1,
                      borderColor: colors.main,

                    }}>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      src={applePayIMG}
                    />
                  </Box>
                </>
              }
            />
          </RadioGroup >
        </FormControl >

        <Box sx={{ py: 5 }}>
          {type === "creditcard" && (
            <Creditcard
              amount={total}
              callback_url={callback_url}
              description={` pay ${total / 100}`}
              metadata={metadata}
            />
          )}
          {type === "stcpay" && (
            <Stcpay
              amount={total}
              callback_url={callback_url}
              description={` pay ${total / 100}`}
              metadata={metadata}
            />
          )}
          {type === "applepay" && (
            <Applepay
              amount={total}
              callback_url={callback_url}
              description={` pay ${total / 100}`}
              metadata={metadata}
            />
          )}
        </Box>
      </ >
    );
  }

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "40vh",
      }}
      className=""
    >
      <p style={{ color: "red" }}>Something went wrong!!</p>
    </Stack>
  );
}

