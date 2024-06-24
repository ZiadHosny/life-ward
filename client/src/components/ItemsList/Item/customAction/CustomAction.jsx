import { Box } from "@mui/system";
import React from "react";
import { ActionIcon } from "./customAction.data";
function CustomAction({ path }) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {Object.entries(ActionIcon).map((icon) => {
        return path == "/cart" ? icon[0] !== "cart" && icon[1] : icon[1];
      })}
    </Box>
  );
}

export default CustomAction;
