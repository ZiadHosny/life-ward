import { useTheme } from "@emotion/react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import React from "react";
const ReuasbleField = ({
  context,
  type,
  state,
  lang,
  setState,
  handleClick,
}) => {
  const { colors, btnStyle } = useTheme();
  return (
    <Box
      sx={{
        mt: "10px",
      }}
    >
      <Typography component="label">{context}</Typography>
      <Stack direction={"row"} gap={"5px"}>
        <InputBase
          type={type}
          placeholder={context}
          value={state}
          onChange={(e) => setState(e.target.value)}
          sx={{
            width: {
              md: 250,
              xs: 1,
            },
            border: `1px solid ${colors.inputBorderColor} !important`,
            bgcolor: colors.inputBorderColor,
            py: 0.5,
            px: 1,
            fontWeight: "bold",
          }}
        />
        <Button
          type="button"
          sx={{ ...btnStyle, color: "#ffff" }}
          onClick={handleClick}
        >
          {lang === "en" ? "Save" : "حفظ"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ReuasbleField;
