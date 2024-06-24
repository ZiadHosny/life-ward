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
import {
  Badge,
  IconButton,
  SvgIcon,
  Avatar,
  Tooltip,
  CardMedia,
} from "@mui/material";
import { customDrawerIcon } from "./nav.styes";
import { profile_cart_likesData } from "./nav.data";
import LanguageToggler from "./LanguageToggler";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./../../store/Store";
import {
  savedProductsApi,
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import { useGetAllCartsQuery } from "../../APIs/cartApi";
import MobileProfileMenu from "./MobileProfileMenu";
import { colors } from "../publicStyle/publicStyle";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "../Notifications/Notifications";
import CartIcon from "../../assets/Cart-Icon.png";
import SavedIcon from "../../assets/Saved-Icon.png";
import searchSvg from "../../assets/Search-Icon.svg";

export default function Drawers() {
  const [_, { language }] = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {[...profile_cart_likesData].map((item, index) => {
        return (
          <CustomDrawer
            icon={item.icon}
            key={index}
            data={item?.data?.length > 0 ? item?.data : []}
            name={item.name}
            path={item.path}
          />
        );
      })}
      <Box
        sx={{
          mx: "2px",
        }}
      >
        <MobileProfileMenu />
      </Box>
      <Box mx={"8px"}>
        <Tooltip title={language === "en" ? "search" : "بحث"}>
          <CardMedia
            component={"img"}
            src={searchSvg}
            alt="Search"
            onClick={() => navigate("/search")}
            sx={{
              height: { md: 21, xs: 17 },
              width: { md: 21, xs: 17 },
              objectFit: "fill",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: { xs: "block" },
        }}
      >
        <Notifications
          lng={language}
          iconColor={"#000"}
          bgColorBtn={"transparent"}
        />
      </Box>
      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
          },
          mt: "4px",
        }}
      >
        <LanguageToggler />
      </Box>
    </Box>
  );
}

export const CustomDrawer = ({ icon, data, name, path }) => {
  const { data: carts, isError: isErrCart } = useGetAllCartsQuery();
  const [callDrawerData, setCallDrawerData] = React.useState();
  React.useEffect(() => {
    if (callDrawerData) {
      setCallDrawerData(false);
    }
  }, [callDrawerData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: savedProducts, isError: isErrSaved } =
    useGetAllSavedProductsQuery();

  const [_, { language }] = useTranslation();

  return (
    <div>
      {[language === "en" ? "right" : "left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Box
            sx={{
              ...customDrawerIcon,
              cursor: "pointer",
              borderRadius: 0,
              padding: "10px",

              svg: {
                color: colors.main,
              },
              display: "flex",
              mx: "4px",
              width: {
                md: 30,
                xs: 25,
              },
              height: {
                md: 40,
                xs: 30,
              },
              ".MuiBadge-badge": {
                fontWeight: "bolder",
                bgcolor: colors.main,
                color: "#fff",
                fontSize: "15px",
                top: "-5px",
              },
            }}
            onClick={() => navigate(path)}
          >
            <Badge
              badgeContent={
                name == "likes"
                  ? savedProducts?.data?.favourite[0] && !isErrSaved
                    ? savedProducts?.data?.favourite.length
                    : undefined
                  : name == "cart"
                  ? carts?.data?.totalQuantity > 0 && !isErrCart
                    ? carts?.data?.totalQuantity
                    : undefined
                  : undefined
              }
              showZero={name != "profile"}
            >
              <Tooltip
                title={
                  name == "likes"
                    ? language === "en"
                      ? "Saved products"
                      : "المنتجات المفضلة"
                    : language === "en"
                    ? "Cart"
                    : "عربة التسوق"
                }
              >
                <CardMedia
                  component={"img"}
                  src={name === "likes" ? SavedIcon : CartIcon}
                  sx={{
                    width: {
                      md: 22,
                      xs: 20,
                    },
                    height: {
                      md: 22,
                      xs: 20,
                    },
                    objectFit: "fill",
                  }}
                />
              </Tooltip>
            </Badge>
          </Box>
        </React.Fragment>
      ))}
    </div>
  );
};
