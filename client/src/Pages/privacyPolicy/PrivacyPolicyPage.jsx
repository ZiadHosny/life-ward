import React, { useEffect, useState } from "react";
import { useGetPrivacyQuery } from "../../APIs/privacyApi";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const { type } = useParams();
  const { data, isLoading, error } = useGetPrivacyQuery(type);
  const [_, { language: lang }] = useTranslation();
  const [privacy, setPrivacy] = useState();
   
  useEffect(() => {
    if (data) {
      setPrivacy(data?.data[0]);
    }
  }, [data]);
  return (
    <Box
      sx={{
        py: "170px",
        px: "50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isLoading ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "70vh",
          }}
        >
          <CircularProgress
            sx={{
              color: colors.newMainColor,
            }}
          />
        </Stack>
      ) : privacy ? (
        <Box
          sx={{
            px: {
              lg: "70px",
              md: "30px",
              xs: "20px",
            },
          }}
        >
          <Box>
            <p
              className="lead fw-bold"
              style={{
                fontSize: "1.8rem",
                fontFamily: publicFontFamily,
                color: colors.main,
                fontWeight: "bold",
                textAlign:'center'
              }}
            >
              {privacy[`title_${lang}`]}
            </p>
           <Stack sx={{
"&   *":{
  textAlign:lang==="ar"?'right !important':'left !important',
  color:`${ colors.main} !important`,


}
}}>
           <div
              style={{
                fontWeight: "bold",
                fontFamily: publicFontFamily,
                color: colors.main,
                textAlign:'right !important'
                
              }}
              dangerouslySetInnerHTML={{
                __html: privacy[`description_${lang}`],
              }}
            />
           </Stack>
          </Box>
        </Box>
      ) : (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"30vh"}
        >
          <Typography
            variant="h3"
            sx={{
              color: "red",
              fontfamily: publicFontFamily,
            }}
          >
            {lang === "en"
              ? "This content is not existed yet"
              : "هذا المحتوى لا يوجد الآن"}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default PrivacyPolicyPage;
