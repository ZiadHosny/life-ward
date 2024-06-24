import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { colors } from "../publicStyle/publicStyle";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems : 'center',
        justifyContent : "center",
        height: "40vh",
      }}
    >
      <CircularProgress
        sx={{
          color: colors.main,
        }}
      />
    </Box>
  );
}
