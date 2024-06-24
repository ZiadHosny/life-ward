import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Button,
  CardMedia,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllPrivcayQuery } from "../../APIs/privacyApi";
import { contactWaysIcons } from "../../Pages/contactUs/assets/contact.data";
import TwitterXIcon from "../../assets/TwiiterX-Icon.png";
import lifeLogo from "../../assets/life-icon.png";
import flowersImageRight from "../../assets/life2.png";
import flowersImageLeft from "../../assets/life21.png";
import Logo from "../nav/Logo";
import { NavLinksData } from "../nav/nav.data";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { footerStyle, iconBoxStyle } from "./FooterStyle";
const Footer = () => {
  const { data, isLoading, error } = useGetAllPrivcayQuery();
   
   
  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const TikTokIcon = ({ color = "#000000" }) => {
    return (
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="100%"
        height="100%"
      >
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
      </svg>
    );
  };
  return (
    <Box
      sx={{
        ...footerStyle,
        display:
          pathname === "/sign-in" ||
          pathname === "/register" ||     pathname === "/forgetPassword" ||
          pathname === "/ourTarget"
            ? "none"
            : "block",
        pb: { xs: 5 },
        background: `url(${flowersImageLeft}), url(${flowersImageRight}), #693096`,
        backgroundPosition: {
          xs: "left -20px bottom -30px, right -20px bottom -30px",
          md: "left -20px bottom -90px, right -20px bottom -90px",
        },
        backgroundSize: { xs: "200px, 200px", md: "auto, auto" },
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          width: {
            md: 0.8,
            sm: 0.85,
            xs: 0.9,
          },
        }}
      >
        <Box
          sx={{
            height: {
              md: 240,
              xs: 125,
            },
            width: {
              md: 240,
              xs: 125,
            },
            bgcolor: "#DCB8FF",
            borderRadius: "50%",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "80px",
          }}
        >
          <Logo imagePath={lifeLogo} />
        </Box>

        <Stack
          sx={{
            flexDirection: {
              md: "row",
              xs: "column",
            },
            justifyContent: "center",
            gap: { xs: 5, md: 40 },
            // py: "20px",
          }}
        >
          <Box>
            <Box
              sx={{
                mx: "auto",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {contactWaysIcons.map((contactWay) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    gap: {
                      lg: 2.5,
                      md: 1.5,
                      xs: 0.5,
                    },
                    width: "fit-content",
                  }}
                >
                  <Box
                    sx={{
                      display: { xs: "flex", md: "inline" },
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={iconBoxStyle}>{contactWay.icon}</Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: publicFontFamily,

                        fontWeight: "bold",
                        width: "100px",
                        fontSize: {
                          md: "18px",
                          xs: "14px",
                        },
                      }}
                    >
                      {contactWay[`title_${lang}`]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                mx: "auto",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                flexDirection: "column",
                gap: 3,
                height: "200px",
                flexWrap: "wrap",
              }}
            >
              {data?.data?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {console.log(item, "indexindexindexindex")}
                  <Button
                    disableRipple
                    onClick={() => {
                      navigate(`/policies/${item?.type}`);
                      window.scrollTo(0, 0);
                    }}
                    sx={{
                      fontSize: {  md:"16px",
                    xs:"12px"},
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      backgroundColor: "transparent !important",
                      display: "block",
                      color: footerStyle.color,
                      fontFamily: publicFontFamily,
                    }}
                  >
                    {lang === "en" ? item?.title_en : item?.title_ar}
                  </Button>
                </Box>
              ))}

              {NavLinksData()
                ?.slice(2)
                ?.map((item) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        key={item.link}
                        disableRipple
                        onClick={() => {
                          navigate(item.link);
                          window.scrollTo(0, 0);
                        }}
                        sx={{
                          fontSize: {  md:"16px",
                          xs:"12px"},
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          backgroundColor: "transparent !important",
                          display: "block",
                          color: footerStyle.color,
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {item[`title_${lang}`]}
                      </Button>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Stack>
        <Box mt={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // mt: "15px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              sx={
                {
                  // mt: "80px",
                }
              }
            >
              
              {/* both snapChat and tiktok not done */}
             
              {/* Twitter */}
              <Tooltip title={lang === "en" ? "Twitter" : "تويتر"}>
                <a
                  href="https://twitter.com/lifewardshop"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <XIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.main,
                    }}
                  /> */}
                  <CardMedia
                    src={TwitterXIcon}
                    component={"img"}
                    fill={"red"}
                    sx={{
                      height: "20px",
                      width: "20px",
                      objectFit: "fill",
                    }}
                  />
                </a>
              </Tooltip>
              {/* Facebook */}
              <Tooltip title={lang === "en" ? "Facebook" : "فيسبوك"}>
                <a
                  href="https://www.facebook.com/profile.php?id=61556544278224&mibextid=PtKPJ9/"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FacebookOutlinedIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.main,
                    }}
                  />
                </a>
              </Tooltip>
              {/* Instagram */}
              <Tooltip title={lang === "en" ? "Instagram" : "انستجرام"}>
                <a
                  href="https://www.instagram.com/lifewardshop?igsh=OGF2Y3UxazJobXhv&utm_source=qr"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Avatar
                    src="https://www.iconpacks.net/icons/1/free-linkedin-icon-112-thumb.png"
                    sx={{
                      height: "20px",
                      width: "auto",
                      borderRadius: 0,
                    }}
                  /> */}
                  <InstagramIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.main,
                    }}
                  />
                </a>
              </Tooltip>
              {/* youtube */}
              <Tooltip title={lang === "en" ? "Youtube" : "يوتيوب"}>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#fff  ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <YouTubeIcon
                    sx={{
                      fontSize: "20px",
                      color: colors.main,
                    }}
                  />
                </a>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
      </Box>
      {/* <CardMedia
        component="img"
        src={flowersImage}
        sx={{
          height: 300,
          width: 300,
          position: "absolute",
          bottom: "-60px",
          left: "20px",
          transform: "rotateY(180deg)",
        }}
      />
      <CardMedia
        component="img"
        src={flowersImage}
        sx={{
          height: 300,
          width: 300,
          position: "absolute",
          bottom: "-60px",
          right: "20px",
        }}
      /> */}
    </Box>
  );
};
export default Footer;
