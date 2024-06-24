import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThirdTab from "./latest/ThirdTab";
import FirstTab from "./latest/FirstTab";
import SecondTab from "./latest/SecondTab";
const CheckTest = () => {
  const [value, setValue] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  return (
    <Box
      sx={{
        p: 3,
        width: {
          xs: 1,
          md: 0.8,
        },
        mx: "auto",
        py: "250px",
      }}
    >
      <FirstTab
        showed={value === 0}
        setValue={setValue}
        setUserPhone={setUserPhone}
      />
      <SecondTab
        showed={value === 1}
        setValue={setValue}
        userPhone={userPhone}
      />
      <ThirdTab showed={value === 2} setValue={setValue} />
    </Box>
  );
};

export default CheckTest;
