import React from "react";
import { useState } from "react";
import { useGetAboutUsDataQuery } from "../../APIs/aboutUsApi";
import { useTranslation } from "react-i18next";
import Loader from "../../components/loader/loader";
import { useEffect } from "react";
import CustomError from "../../components/Error/Error";
import { Box, Button, CardMedia, Grid, Stack, Typography } from "@mui/material";
import {
  colors,
  publicButton,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import flowerBackground from "../../assets/life5.png";
import flowerImg from "../../assets/life4.png";
import { useNavigate } from "react-router-dom";
const HomeAbout = () => {
  const { data, isLoading } = useGetAboutUsDataQuery();
   
  const [_, { language }] = useTranslation();
  const navigate = useNavigate();
  const [aboutUsSection, setSection] = useState();
  useEffect(() => {
    if (data?.data) {
      setSection(data?.data[0]);
    }
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : aboutUsSection ? (
        <Box
          sx={{
            my: "100px",
            marginBottom: { md: "200px" },
          }}
        >
          <Grid
            container
            sx={{
              width: {
                lg: 1,
                xs: 1,
              },
              mx: "auto",
              height: {
                md: 400,
                xs: "auto",

              },
            }}
          >
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: 0.85,
                  mx: "auto",
                  height: "auto",
                  mt: {
                    md: "0",
                    xs: 0,
                  },
                  pb: "50px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bolder",
                    my: 4,
                    fontSize: {
                      md: "33px",
                      xs: "26px",
                    },
                    py: "20px",
                    color: colors.main,
                    fontFamily: publicFontFamily,
                  }}
                >
                  {aboutUsSection[`title_${language}`]}
                </Typography>
                <Box
                  sx={{
                    fontFamily: publicFontFamily,
                    my: 4,
                    fontWeight: "bold",
                    fontSize: {
                      xl: "20px",
                      lg: "17.5px",
                      xs: "15px",
                    },
                    color: colors.main,
                    "&  *": {
                      textAlign:
                        language === "ar"
                          ? "right !important"
                          : "left !important",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      aboutUsSection[`description_${language}`]?.slice(0, 400) +
                      "...",
                  }}
                />
                <Stack
                  direction="row"
                  justifyContent={"flex-start"}
                  mt={"30px"}
                >
                  <Button
                    sx={{
                      ...publicButton,
                      borderRadius: 0,
                      bgcolor: `${colors.main} !important`,
                      color: "#fff",
                      fontWeight: "bolder",
                      borderRadius: "25px",
                    }}
                    onClick={() => navigate("/aboutUs")}
                  >
                    {language === "en" ? "See more" : "رؤية المزيد"}
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid
              mx={{ xs: "auto", md: "0" }}
              order={({ xs: "-1" }, { md: "1" })}
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  height: { md: "500px", xs: "300px", xl: "600px" },
                  backgroundImage: `url(${flowerBackground})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  width: { md: "500px", xs: "300px",lg:"500px",xl:'700px' },
                }}
              />
              <Box
                left={
                  language === "en" ? "" : { lg: "27%", md: "20%", xs: "20%" }
                }
                top={{ lg: "27%", md: "25%", xs: "20%" }}
                right={
                  language === "en" ? { lg: "30%", md: "25%", xs: "22%" } : ""
                }
                sx={{
                  position: "absolute",

                  height: { md: "500px", xs: "300px",xl:'490px'},
                  backgroundImage: `url(${flowerImg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  width: { md: "328px", xs: "400px",lg:'500px',xl:"700px" },
                  backgroundPosition: "center center",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CustomError
          errorMessage={
            language == "en"
              ? "About us Not Been Added Yet"
              : "لم يتم إضافة قسم من نحن حتى الآن"
          }
        />
      )}
    </div>
  );
};

export default HomeAbout;
