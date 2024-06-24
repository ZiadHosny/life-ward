import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
const ProfileTest = () => {
  const [_, { language: lang }] = useTranslation();
  return (
    <Box
      sx={{
        py: "150px",
      }}
    >
      <Typography variant="h4" align="center">
        {lang === "en" ? "Account Details" : "تفاصيل الحساب"}
      </Typography>
      <Box component="form">
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <div>
              <input label="a" />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileTest;
