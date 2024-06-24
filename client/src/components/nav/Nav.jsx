import * as React from "react";
// import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { Box, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { urlPath } from "./nav.data";
import NavLinks from "./NavLinks";
import Drawers from "./Drawers";
import Logo from "./Logo";
import MobileSidebar from "./MobileSidebar";
import LanguageToggler from "./LanguageToggler";
import { colors } from "./nav.styes";
import { motion } from "framer-motion";

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      sx={{
        position: "absolute",
        top: "300px",
        width: "100%",
        zIndex: 2,
      }}
      // component={motion.div}
      // initial={{ scale: 0.5 }}
      // animate={{ scale: 1, transition: { duration: 0.1 } }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "transparent",

          boxShadow: 0,
          borderRadius: "50px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#fff",
            py: 1.5,
            width: {
              xs: 0.8,
              md: 0.8,
            },
            mx: "auto",
            borderRadius: "50px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Logo imagePath={urlPath} />
          </Stack>
          <NavLinks />
          <Drawers handleDrawerToggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <MobileSidebar
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
}

export default DrawerAppBar;
