import { useState } from "react";
import styled from "@emotion/styled";
import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetAllCategoriesQuery } from "../../APIs/categoriesApi";
import { imageBaseUrl } from "../service";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { homeFAQ } from "../constants/homeFAQ";
import faqWall from "../../assets/faq-wall.png";

const DepartmentsSlider = ({about}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [categories, setCategories] = useState();
  const [_, { language }] = useTranslation();
  const { data } = useGetAllCategoriesQuery();
  useEffect(() => {
    if (data?.categories) {
      setCategories(data?.categories?.category);
    }
  }, [data?.categories]);
  const StyledBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding:'0 5%',
    cursor: "pointer",
    gap: "50",
  });
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignItems:'center',
        justifyContent:"space-between",
        gap: {
          xs: "15px",
        },
        backgroundImage: {
          md: "none",
          xs: `url(${faqWall})`,
        },
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: {
          xs: "none",
          md:pathName=='/'? colors.main:'none'
          
        },
      }}
    >
      {homeFAQ.map((item,index) => (
        <StyledBox
          sx={{
            height: {
              
              xs: 150,
            },
            width: {
              md: 0.28,
              xs: 1,
            },
            justifyContent:{
              md:'space'
            },
            gap:{
              xs:1,
              md:2
            },
            backgroundColor: {
              xs: index== 1?  colors.subMain:colors.main,
               md:pathName=='/'? colors.main:index== 1? colors.subMain:colors.main
            },
            color:{
              xs: index== 1?  colors.main:"",
              md:pathName=='/'? "#fff":index== 1? colors.main:""
            }
            
          }}
        >
          <Avatar
            src={item.icon}
           
            sx={{
              height: {
                md: 50,
                xs: 40,
              },
              width: {
                md: 50,
                xs: 40,
              }, 
            }}
          />
          <Box>
            <Typography
              variant="h6"
              mt="6px"
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                fontSize: {
                  lg: "20px",
                  xs: "15px",
                },
              }}
            >
              {item[`title_${language}`]}
            </Typography>
            <Typography
              variant="h4"
              mt="6px"
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                fontSize: {
                  lg: "20px",
                  xs: "15px",
                },
              }}
            >
              {item[`description_${language}`]}
            </Typography>
          </Box>
        </StyledBox>
      ))}
    </Box>
  );
};

export default DepartmentsSlider;
