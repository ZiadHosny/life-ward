import { CircularProgress } from "@mui/material";
import React from "react";
import { colors } from "../publicStyle/publicStyle";

const ProgressIcon = ({ size, condition }) => (
  <CircularProgress
    size={size}
    sx={{
      color: condition ? "#fff" : "#FFF",
    }}
  />
);
export default ProgressIcon;
