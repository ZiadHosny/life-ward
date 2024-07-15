import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileItemListContainerStyle } from "../nav/nav.styes";
import { NavLinksMobileData } from "../nav/nav.data";
import Profile from "./Profile";
import { NestedNavMobile } from "./NestedNavMobile";

export default function SideBar() {
  const { pathname } = useLocation();
  const [_, { language: lang }] = useTranslation();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    setState({
      left: false,
      right: false,
    });
  }, [pathname]);

  return (
    <Box
      sx={{
        display: {
          md: "none",
          xs: "block",
        },
        position: "fixed",
        right: lang === "ar" ? "10px" : undefined,
        left: lang === "en" ? "10px" : undefined,
        mt: '3px'
      }}
    >
      <Button
        sx={{
          minWidth: 0,
          width: 0,
        }}
        onClick={toggleDrawer(lang === "en" ? "left" : "right", true)}
      >
        <MenuIcon
          sx={{
            fontSize: "27px",
            color: {
              md: colors.main,
              xs: !'pathname.includes("/productDetails/")' ? "#fff" : colors.main,
            },
          }}
        />
      </Button>
      <Drawer
        anchor={lang === "en" ? "left" : "right"}
        open={state[lang === "en" ? "left" : "right"]}
        onClose={toggleDrawer(lang === "en" ? "left" : "right", false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 0.55,
            bgcolor: colors.main,
            pt: 2,
            px: 3,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Profile />
          <Button
            sx={{
              width: "40px",
              height: "40px",
              minWidth: "auto",
              borderRadius: 1,
              bgcolor: `${colors.heavyMainColor} !important`,
            }}
            onClick={toggleDrawer(lang === "en" ? "left" : "right", false)}
          >
            <CloseIcon
              sx={{
                width: "30px",
                height: "30px",
                color: "#fff",
                transform: lang === "ar" ? "rotateY(180deg)" : 0,
              }}
            />
          </Button>
        </Stack>
        <Box sx={MobileItemListContainerStyle}>
          {NavLinksMobileData().map((item, index) => {
            return item.nestedLinks ? (
              item.nestedLinks.map((item) => (
                <NestedNavMobile
                  handleClose={toggleDrawer(lang === "en" ? "left" : "right", false)}
                  key={index}
                  item={item}
                />
              ))
            ) : (
              <>
                <Button
                  key={item.link}
                  disableRipple
                  onClick={() => navigate(item.link)}
                  sx={{
                    color: pathname === item.link ? "#fff" : "#aaa",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    backgroundColor: "transparent !important",
                    display: "block",
                    fontFamily: publicFontFamily,
                  }}
                >
                  {item[`title_${lang}`]}
                </Button>
                {
                  NavLinksMobileData().length - 1 <= index ?
                    <></>
                    :
                    < hr />
                }
              </>
            );
          })}
        </Box>
      </Drawer>
    </Box>
  );
}
