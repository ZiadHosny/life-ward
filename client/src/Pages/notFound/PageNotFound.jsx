import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";
import { colors, publicButton } from "../../components/publicStyle/publicStyle";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        direction: "ltr",
        position: "relative",
      }}
    >
      <CardMedia
        component={"img"}
        // src={siteLofo}
        src={
          "https://tse4.mm.bing.net/th?id=OIP.KwdqITvxXCfB-HCCwvx7PQHaHk&pid=Api&P=0&h=180"
        }
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "auto",
          height: 0.75,
          mx: "auto",
          zIndex: "-1",
          opacity: 0.1,
        }}
      />
      <Box>
        <Box className={`shaked-error`}>
          <Typography
            variant={"h1"}
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: {
                lg: "100px",
                md: "75px",
                xs: "60px",
              },
            }}
          >
            404
          </Typography>
          <Typography
            variant={"h2"}
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: {
                lg: "50px",
                md: "30px",
                xs: "30px",
              },
            }}
          >
            PAGE NOT FOUND!
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: {
              md: "25px",
              xs: "23px",
            },
            width: {
              md: 900,
              xs: 0.9,
            },
            m: "25px auto 0",
            textAlign: "center",
          }}
        >
          The page you were looking for could not be found. it might have been
          removed, renamed, or did not exists in the first place.
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "60px",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            type="submit"
            sx={{
              ...publicButton,
              width: {
                md: "auto",
                xs: 0.7,
              },
              bgcolor: `${colors.newMainColor} !important`,
              py: "12px",
              fontSize: "19px",
              color: "#fff",
              "&:active": {
                transform: "scale(0.86)",
              },
            }}
          >
            Go to home page
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default PageNotFound;
