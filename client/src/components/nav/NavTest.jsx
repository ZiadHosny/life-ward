import * as React from "react";
// import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { Box, Grid, Stack, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import NavLinks from "./NavLinks";
import Drawers from "./Drawers";
import Logo from "./Logo";
import MobileSidebar from "./MobileSidebar";
import LanguageToggler from "./LanguageToggler";
import urlPath from "../../assets/life-icon.png";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import SideBar from "../../components/Sidebar/SideBar";
import { Search } from "./Search";
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [_, { language: lang }] = useTranslation();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { pathname } = useLocation();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });
  return (
    <Box
      sx={{
        display:
          pathname === "/sign-in" ||
            pathname === "/register" ||
            pathname === "/forgetPassword" ||
            pathname === "/thanksOrder" ||
            pathname === "/ourTarget"
            ? "none"
            : "block",
        position: "absolute",
        top: "-5px",
        width: 1,
        bgcolor: "transparent",
        zIndex: "1000",
      }}
    >
      <CssBaseline />
      <Box>
        <Box
          sx={{
            width: "100% !important",
            bgcolor: "#EBEBEB",
            py: "20px",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: {
                md: 0.85,
                xs: 0.95,
              },
              mx: "auto",
            }}
          >
            <Box
              sx={{
                display: {
                  md: "none",
                  xs: "block",
                },
                px: "30px",
              }}
            >
              <SideBar />
              <Logo imagePath={urlPath} isNavbar={true} />
            </Box>
            <Drawers />
            <Box
              sx={{
                alignItems: 'center',
                display: {
                  md: "flex",
                  xs: "none",
                },
                gap: 3,
              }}
            >
              <Logo
                imagePath={urlPath}
                isNavbar={true}
                extraStyles={{
                  width: {
                    md: 80,
                    xs: 50,
                  },
                  width: {
                    md: 55,
                    xs: 35,
                  },
                  // transform: `translateX(${lang === "en" ? "-70px" : "65px"})`,
                }}
              />
              <Search />
            </Box>
            <Box
              sx={{
                display: {
                  md: "block",
                  xs: "none",
                },
              }}>
              <LanguageToggler />
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            display: {
              md: "none",
              xs: "block",
              padding: '20px 40px',
            },
          }}>
          <Search mobile={true} />
        </Box>
        <NavLinks />
      </Box>
      <MobileSidebar
        container={container}
        mobileOpen={state[lang === "en" ? "left" : "right"]}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
}

export default DrawerAppBar;
