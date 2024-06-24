import React from "react";
import { useGetAboutUsDataQuery } from "../../APIs/aboutUsApi";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  CardMedia,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../components/nav/nav.data";
import { imageBaseUrl } from "../../components/service";
import { motion } from "framer-motion";
import {
  publicFontFamily,
  colors,
  publicButton,
} from "../../components/publicStyle/publicStyle";
import Loader from "../../components/loader/loader";
import CustomError from "../../components/Error/Error";
export const AboutUsShared = ({ data, isLoading, error }) => {
  const { pathname } = useLocation();
  const [_, { language }] = useTranslation();
  const isHomePage = pathname === "/" ? true : false;
  const aboutUsSection = data && data?.data[0];
  const navigate = useNavigate();
  console.log('error', error)
  return (
    <Box
      sx={{
        py: 3,
      }}
    >
      {isLoading ? (
        <Loader />
      ) : aboutUsSection ? (
        <Box
          sx={{
            width: {
              xl: 1500,
              lg: 1100,
              md: 0.85,
              xs: 0.9,
            },
            mx: "auto",
          }}
        >
          {aboutUsSection && (
            <Typography
              variant="h3"
              sx={{
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                textAlign: "center",
                mb: {
                  md: "50px",
                  xs: "35px",
                },
                color: colors.main,
                fontSize: {
                  xl: "60px",
                  lg: "55px",
                  md: "45px",
                  xs: "40px",
                },
              }}
            >
              {aboutUsSection[`title_${language}`]}
            </Typography>
          )}
          <Grid container>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                mb: "10px",
                display: {
                  md: "none",
                  xs: "block",
                },
              }}
            >
              <Box>
                <CardMedia
                  component="img"
                  src={imageBaseUrl + "/" + aboutUsSection.image}
                  sx={{
                    height: 300,
                    width: 0.96,
                    mx: "auto",
                    borderRadius: 0,
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                wordBreak: "break-word",
                textAlign: {
                  md: "initial",
                  xs: "center",
                },
              }}
            >
              <Box
                sx={{
                  height: 1,
                  px: 3,
                  py: 1.5,
                  width: 0.96,
                  mx: {
                    md: 0,
                    xs: "auto",
                  },
                  bgcolor:
                    pathname === "/"
                      ? `${colors.lightGreen} !important`
                      : "transparent",
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

                    fontFamily: publicFontFamily,
                    color: colors.main,
                  }}
                >
                  {aboutUsSection[`title_${language}`]}
                </Typography>
                <Box
                  sx={{
                    fontFamily: publicFontFamily,
                    my: 4,
                    fontWeight: "bold",
                    color: colors.main,
                    fontSize: "20px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: isHomePage
                      ? aboutUsSection[`description_${language}`]?.slice(
                        0,
                        451
                      ) + "..."
                      : aboutUsSection[`description_${language}`],
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: {
                  md: "block",
                  xs: "none",
                },
              }}
            >
              <Box>
                <CardMedia
                  component="img"
                  src={imageBaseUrl + "/" + aboutUsSection.image}
                  sx={{
                    height: 500,
                    width: 1,
                    borderRadius: 0,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CustomError
          errorMessage={
            error?.data?.error_en === 'getaddrinfo ENOTFOUND ac-hxs06fy-shard-00-00.iqthlge.mongodb.net' ? language === 'en' ? "Connection error!" : "خطأ فى الإتصال" :
              language == "en"
                ? "About us Not Been Added Yet"
                : "لم يتم إضافة قسم من نحن حتى الآن"
          }
        />
      )}
    </Box>
  );
};

const AboutUsPage = () => {
  const { data: aboutSectionData, isLoading: aboutIsLoading, error: aboutError } =
    useGetAboutUsDataQuery();
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        py: "200px",
      }}
    >
      <AboutUsShared data={aboutSectionData} isLoading={aboutIsLoading} error={aboutError} />
    </Box>
  );
};

export default AboutUsPage;
