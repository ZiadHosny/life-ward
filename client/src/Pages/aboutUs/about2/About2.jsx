import { Box, CardMedia, Stack } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import about2 from "../about2/images/aboutimage1.svg";
import about3 from "../about2/images/aboutimage2.svg";
import about4 from "../about2/images/aboutimage3.svg";
//  import { colors } from './about2.style'
import { imageBaseUrl } from "../../../components/service";
import { useGetAboutUsDataQuery } from "../../../APIs/aboutUsApi";
import DepartmentsSlider from "../../../components/departmentsSlider/DepartmentsSlider";
import { publicFontFamily } from "../../../components/publicStyle/publicStyle";

const About2 = () => {
  const imgs = [about2, about3, about4];
  const [_, { language: lang }] = useTranslation();
  const { data, isLoading, error } = useGetAboutUsDataQuery();
  const descLength_en = data && !error && data.data[0].description_en.length;
  const descLength_ar = data && !error && data.data[0].description_ar.length;
  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        mx: { xs: 1, lg: 10 },
        margin: "200px   0px",
        height: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row-reverse" }}
        // justifyContent={'space-between'}
        spacing={2}
        sx={{ direction: lang === "en" ? "ltr" : "rtl" }}
      >
        <Stack
          direction={"row"}
          flex={1}
          spacing={0}
          justifyContent={{ xs: "center", lg: "flex-end" }}
          sx={{ height: "80vh" }}
        >
          <Box sx={{ height: "80vh", flex: 1 }}>
            {[imgs[0], imgs[1]].map((img, index) => (
              <CardMedia
                key={index}
                component={"img"}
                src={img}
                sx={{
                  display: "block",
                  width: "95%",
                  height: { sm: "350px", xs: "300px", md: "360px" },
                  mb: 2.5,
                }}
              />
            ))}
          </Box>
          <Box sx={{ alignSelf: "center", flex: 1 }}>
            {[`${imageBaseUrl}${data?.data[0].image}`, imgs[2]].map(
              (img, index) => (
                <CardMedia
                  key={index}
                  component={"img"}
                  src={img}
                  sx={{
                    display: "block",
                    width: "95%",
                    height: { sm: "350px", xs: "300px", md: "400px" },
                    mb: 2.5,
                  }}
                />
              )
            )}
          </Box>
        </Stack>
        <Box
          flex={1}
          sx={{
            lineHeight: 2,
            fontSize: { md: 18, lg: 20, xl: 25 },
            fontFamily: publicFontFamily,
          }}
          dangerouslySetInnerHTML={{
            __html:
              lang === "en"
                ? data?.data[0].description_en
                : data?.data[0].description_ar,
          }}
        />
      </Stack>
      <Box
        sx={{
          lineHeight: 2,
          fontSize: { md: 18, lg: 20, xl: 25 },
          textAlign: lang == "en" ? "left" : "right",
          fontFamily: publicFontFamily,
          mt: 8,
        }}
        dangerouslySetInnerHTML={{
          __html:
            lang === "en"
              ? data?.data[0].description_en.slice(
                  descLength_en / 3,
                  descLength_en
                )
              : data?.data[0].description_ar.slice(
                  descLength_ar / 3,
                  descLength_ar
                ),
        }}
      />
      <Box>
        <DepartmentsSlider about={true} />
      </Box>
    </Box>
  );
};

export default About2;
