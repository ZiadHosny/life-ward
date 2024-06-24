import {
  Box,
  Button,
  CardMedia,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import video from "../../assets/video.mp4";
import videoWall from "../../assets/video-wall.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VedioPage from "../videoPage/VideoPage";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TargetFlowerImage from "../../assets/target-flower.png";
const OurTarget = () => {
  const [state, setState] = useState(false);
  const videoRef = useRef();
  const [_, { language }] = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (state) {
      videoRef.current.play();
    }
  }, [state]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Grid
        container
        sx={{
          width: {
            md: 1,
            xs: 0.95,
          },
          mx: "auto",
          py: {
            lg: "40px",
            md: "25px",
            xs: "20px",
          },
        }}
      >
        <Grid
          item
          width={1}
          xs={12}
          md={6}
          xl={5.1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Stack
          className="ourVideo"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              
              height: {
                xl: 550,
                lg: 550,
                md: 350,
                xs: 300,
              },
              width: {
                xl: 550,
                lg: 550,
                md: 350,
                xs: 300,
              },
              bgcolor: "#FFF",
              borderRadius: "50%",
              bgcolor: colors.main,
              position: "relative",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: "50%",
                backgroundImage: `url(${TargetFlowerImage})`,
                height: 0.85,
                width: 0.85,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center left",
                transform: language === "en" ? "rotateY(180deg)" : undefined,
                position: "absolute",
                left: language === "ar" ? "-25%" : undefined,
                right: language === "en" ? "-25%" : undefined,
              }}
            >
              <Button
                sx={{
                  height: {
                    xl: 150,
                    lg: 125,
                    xs: 100,
                  },
                  width: {
                    xl: 150,
                    lg: 125,
                    xs: 100,
                  },
                  bgcolor: `#d5d5d58f !important`,
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleOpen}
              >
                <PlayArrowIcon
                  sx={{
                    fontSize: "100px",
                    transform:
                      language === "en" ? "rotateY(180deg)" : undefined,
                  }}
                />
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    height: "80%",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    // p: 4,
                  }}
                >
                  <VedioPage handleClose={handleClose} open={open} />
                </Box>
              </Modal>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          xl={6.9}
           sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "-10px",
          }}
        >
          <Box
            sx={{
              width: {
                xl: 0.7,
                lg: 0.6,
                md: 0.7,
                xs: 0.94,
              },
              mx: "auto",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mt: "20px",
                textAlign: language === "en" ? "left" : "right",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                wordBreak: "break-all",
                fontSize: {
                  md: "50px",
                  xs: "20px",
                },
                mb: "50px",
                color: colors.main,
              }}
            >
              {language === "en" ? "Our Target" : "هدفنا"}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: language === "en" ? "left" : "right",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                wordBreak: "break-all",
                fontSize: {
                  md: "20px",
                  xs: "15px",
                },
                color: colors.main,
                wordBreak: "break-word",
              }}
            >
              {language === "en"
                ? "Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning"
                : "قم بإنشاء نص عنصر نائب Lorem Ipsum لاستخدامه في تخطيطات الرسومات والطباعة والويب ، واكتشف المكونات الإضافية لأدوات الكتابة والتصميم والتدوين المفضلة لديك. اكتشف الأصول والتاريخ والمعنى"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OurTarget;
