import { Box, CardMedia, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import AddOccasionDrawer from "../addOccasionModal/AddOccasionModal";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import Loader from "../loader/loader";
import {
  useGetOccasionsQuery,
  useRemoveOccasionMutation,
} from "../../APIs/occasionsApi";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { toast } from "react-toastify";
import EditOccasionModal from "../addOccasionModal/EditOccasionModal";
import { imageBaseUrl } from "../service";
const ProfileOccasions = () => {
  const { data, error, isLoading } = useGetOccasionsQuery();
  const [_, { language }] = useTranslation();
  const [removeOccasion] = useRemoveOccasionMutation();

  const deleteOccasion = (item) => {
    removeOccasion(item)
      .unwrap()
      .then((res) => {
        toast.success(res[`success_${language}`]);
      });
  };
   
  return (
    <Box
      sx={{
        width: 0.95,
        mx: "auto",
        bgcolor: "#F5F2F8",
        borderRadius: "20px",
        mt: {
          md: "-3px",
          xs: "30px",
        },
        pb: "30px",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{
          p: "20px",
        }}
      >
        <AddOccasionDrawer />
      </Stack>
      {isLoading ? (
        <Loader />
      ) : data && !error ? (
        <Stack
          sx={{
            width: 0.95,
            mx: "auto",
            mt: "25px",
            flexDirection: {
              md: "row",
              xs: "column",
            },
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {data?.occasions.map((item) => (
            <Paper
              elevation={4}
              sx={{
                height: {
                  md: 220,
                  xs: "auto",
                },
                width: {
                  xl: 0.31,
                  lg: 0.44,
                  md: 0.48,
                  xs: 0.75,
                },
                borderRadius: "20px",
                mt: "20px",
                mx: {
                  md: 0,
                  xs: "auto",
                },
                p: "15px",
              }}
            >
              <CardMedia
                component={"img"}
                src={imageBaseUrl +  item.icon}
                sx={{
                  height: 75,
                  width: 75,
                  objectFit: "contain",
                  borderRadius: "5px",
                  cursor: "pointer",
                  p: "10px",
                }}
              />
              <Typography
                sx={{
                  color: colors.main,
                  fontWeight: "bold",
                  mt: "5px",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  color: colors.main,
                  fontWeight: "bold",
                  mt: "15px",
                }}
              >
                {moment(item.date).format("YYYY-MM-DD")}
              </Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <DeleteOutlineOutlinedIcon
                  sx={{
                    color: "#FF3333",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteOccasion(item)}
                />

                <EditOccasionModal item={item} />
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "30vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error?.data && (
            <Typography
              sx={{
                textAlign: "center",
                color: "red",
                fontSize: { xs: "30px", md: "30px" },
                fontFamily: publicFontFamily,
              }}
            >
              {error?.data[`error_${language}`]}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfileOccasions;
