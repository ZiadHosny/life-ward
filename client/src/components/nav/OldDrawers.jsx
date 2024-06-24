import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, IconButton, SvgIcon, Avatar } from "@mui/material";
import { customDrawerIcon, colors } from "./nav.styes";
import { profile_cart_likesData } from "./nav.data";
import LanguageToggler from "./LanguageToggler";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./../../store/Store";
import {
  savedProductsApi,
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import cartApi, { useGetAllCartsQuery } from "../../APIs/cartApi";
import { setSaved } from "../../APIs/savedSlice";
import { setCart } from "../../APIs/cartSlice";
import DrawerItem from "./DrawerItem";
import useFetchSavedProducts from "../../Pages/ProductsListForCart_Saved/useFetchSavedProducts";
import useFetchCart from "../../Pages/cart/useFetchCart";

export const CustomDrawer = ({ icon, data, name }) => {
  // const { data: savedProducts, isError: savedError } =
  //   useGetAllSavedProductsQuery();
  const { savedProducts: savedData, getSaved } = useFetchSavedProducts();
  const { data: carts, isError: isErrCart } = useGetAllCartsQuery();
  const { carts: cartData, getCarts } = useFetchCart();
  const [callDrawerData, setCallDrawerData] = React.useState();
  React.useEffect(() => {
    if (callDrawerData) {
      // getSaved();
      // getCarts();
      setCallDrawerData(false);
    }
  }, [callDrawerData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saved } = useSelector((state) => state.saved);
  const { cart } = useSelector((state) => state.cart);
  const [state, setState] = React.useState({
    right: false,
  });
  const handleLogout = () => {
    localStorage.clear();
    localStorage.clear();
    store.dispatch(savedProductsApi.util.resetApiState());
    dispatch(setSaved(0));
    store.dispatch(cartApi.util.resetApiState());
    dispatch(setCart(0));
    navigate("/sign-in");
  };
  const handleNavigation = (path) => {
    navigate(path);
  };
  const {
    data: savedProducts,
    isError: isErrSaved,
    error,
  } = useGetAllSavedProductsQuery();

  const chooseWherToFetch = () => {
    if (name == "likes") {
      // fetchfromSavedProduct
    } else if (name == "cart") {
      //fetch from the cart
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    

    setState({ ...state, [anchor]: open });
    setCallDrawerData(true);
  };
  const [_, { language }] = useTranslation();

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {data && data[0] && (
        <List>
          {[...data].map((text, index) => (
            <Box
              key={text.name_en}
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => {
                if (text.name_en == "Logout") {
                  handleLogout();
                } else {
                  handleNavigation(text.path);
                }
              }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Box>
                      <SvgIcon component={text.icon} inheritViewBox />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={language === "en" ? text.name_en : text.name_ar}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
      {name === "likes" || name === "cart" ? (
        <DrawerItem
          name={name}
          data={name === "likes" ? savedData[0] && savedData : cartData}
        />
      ) : null}
      {/* <Divider /> */}
    </Box>
  );
  return (
    <div>
      {[language === "en" ? "right" : "left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Box sx={customDrawerIcon} onClick={toggleDrawer(anchor, true)}>
            <Badge
              badgeContent={
                name == "likes"
                  ? savedProducts?.products[0] && !isErrSaved
                    ? savedProducts?.products.length
                    : 0
                  : name == "cart"
                  ? carts?.cart[0] && !isErrCart
                    ? carts?.cart.length
                    : 0
                  : undefined
              }
              showZero={name != "profile"}
              sx={{}}
            >
              {icon}
            </Badge>
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default function Drawers({ handleDrawerToggle }) {
  // const { callGetSaved, savedProducts, error } = useFetchSavedProducts();
  const [_, { language }] = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {[...profile_cart_likesData].map((item, index) => {
        return (
          <CustomDrawer
            icon={item.icon}
            key={index}
            data={item?.data[0] ? item?.data : []}
            name={item.name}
          />
        );
      })}
      <LanguageToggler />
      <Avatar
        alt="Remy Sharp"
        src="https://thumbs.dreamstime.com/z/cartoon-funny-monster-halloween-vector-illustration-monster-face-avatar-97155715.jpg"
        onClick={() => navigate("/profile")}
        sx={{
          cursor: "pointer",
          ml: {
            xl: language === "en" ? "70px" : 0,
            xs: language === "en" ? "10px" : 0,
          },

          mr: {
            xl: language === "ar" ? "70px" : 0,
            xs: language === "ar" ? "10px" : 0,
          },
        }}
      />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mx: 1,
          display: {
            md: "none",
            xs: "flex",
          },
          backgroundColor: `${colors.newMainColor} !important`,
          borderRadius: 1,
          p: {
            sm: 0.8,
            xs: 0.7,
          },
        }}
      >
        <MenuIcon sx={{ fontSize: "19px", color: "#fff" }} />
      </IconButton>
    </Box>
  );
}
