import { Box, Button, Drawer, Stack } from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { NavLinksData } from "./nav.data";
import { MobileItemListContainerStyle, colors } from "./nav.styes";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LinkDropDown from "./LinkDropDown";
import { publicFontFamily } from "../publicStyle/publicStyle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const MobileSidebar = ({ container, mobileOpen, handleDrawerToggle }) => {
  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (mobileOpen) {
      handleDrawerToggle();
    }
  }, [pathname]);
  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 0.55,
            bgcolor: colors.main,
            pt: 6,
            px: 3,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={lang === "en" ? "flex-start" : "flex-end"}
        >
          <Button
            sx={{
              width: "35px",
              height: "35px",
              minWidth: "auto",
              borderRadius: 1,
              bgcolor: `${colors.heavyMainColor} !important`,
            }}
            onClick={handleDrawerToggle}
          >
            <KeyboardBackspaceIcon sx={{ color: colors.newMainColor }} />
          </Button>
        </Stack>
        <Box sx={MobileItemListContainerStyle}>
          {NavLinksData().map((item, index) => {
            return item.nestedLinks ? (
              <LinkDropDown
                key={index}
                item={item}
                pathname={pathname}
                color={pathname.includes("/department") ? "#fff" : "#aaa"}
              />
            ) : (
              <Button
                key={item.link}
                disableRipple
                onClick={() => navigate(item.link)}
                sx={{
                  color: pathname === item.link ? "#fff" : "#aaa",
                  fontSize: "16px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  backgroundColor: "transparent !important",
                  display: "block",
                  fontFamily: publicFontFamily,
                }}
              >
                {item[`title_${lang}`]}
              </Button>
            );
          })}
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileSidebar;
