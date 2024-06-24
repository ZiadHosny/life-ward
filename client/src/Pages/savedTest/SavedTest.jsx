import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  useDeleteSavedProductMutation,
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import { toast } from "react-toastify";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import SavedItem from "./SavedIem";
import Loader from "../../components/loader/loader";
const SavedTest = () => {
  const [_, { language: lang }] = useTranslation();
  const {
    data: savedProducts,
    isError: isErrSaved,
    error,
    isLoading,
  } = useGetAllSavedProductsQuery();
  const [deleteSavedProduct] = useDeleteSavedProductMutation();

  return (
    <Box
      sx={{
        py: "150px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 0.9,
          mx: "auto",
          py: {
            lg: "30px",
            md: "45px",
            xs: "35px",
          },
        }}
      >
        <Stack direction="row" alignItems={"center"} gap={"10px"} my={"50px"}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: publicFontFamily,
              fontWeight: "bold",
              color: colors.main,
              py: "5px",
              px: "10px",
              fontSize: { lg: "25px", md: "20px", xs: "17px" },
              borderLeft:
                lang === "ar" ? `2px solid ${colors.main}` : undefined,
              borderRight:
                lang === "en" ? `2px solid ${colors.main}` : undefined,
            }}
          >
            {lang === "en" ? "Favourite" : "المفضلة"}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: publicFontFamily,
              fontWeight: "bold",
              color: colors.main,
              px: "5px",
              fontSize: { lg: "25px", md: "20px", xs: "16px" },
            }}
          >
            {savedProducts?.data?.favourite && !isErrSaved
              ? savedProducts?.data?.favourite?.length
              : 0}
            {savedProducts?.data?.favourite?.length > 1
              ? lang === "en"
                ? " Items"
                : " عناصر"
              : lang === "en"
              ? " Item"
              : " عنصر"}
          </Typography>
        </Stack>
      </Stack>
      {console.log(
        "sdj asd asdsad",
        savedProducts?.data?.favourite?.length > 0 && !isErrSaved
      )}
      {isLoading ? (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"30vh"}
        >
          <Loader />
        </Stack>
      ) : savedProducts?.data?.favourite?.length > 0 && !isErrSaved ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: {
              xl: "75px",
              lg: "100px",
              md: "5%",
              xs: "5%",
            },
            width: 0.9,
            mx: "auto",
          }}
        >
          {savedProducts?.data?.favourite?.map((item) => (
            <SavedItem item={item} />
          ))}
        </Box>
      ) : (
        <Box
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "30vh",
          }}
        >
          <Typography
            sx={{
              color: "red",
              fontWeight: "bold",
              fontFamily: publicFontFamily,
              fontSize: {
                md: "25px",
                xs: "20px",
              },
            }}
          >
            {error?.data?.error_en
              ? error.data[`error_${lang}`]
              : lang == "ar"
              ? "!هناك خطأ في الخادم"
              : "Something went wrong in server!"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SavedTest;
