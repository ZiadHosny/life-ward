import { Stack } from "@mui/material";
import React from "react";

const OrderRecordVoice = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      gap={"20px"}
      sx={{ height: 0 }}
    >
      <Button
        sx={{
          cursor: "pointer",
          height: 20,
          width: 5,
          minWidth: 0,
          mt: "110px",
        }}
      >
        <CloseIcon
          sx={{
            fontSize: "2rem",
            color: "red",
            cusror: "pointer",
          }}
          onClick={() => {
            setRecordVoice();
          }}
        />
      </Button>
    </Stack>
  );
};

export default OrderRecordVoice;
