import * as React from "react";
import Box from "@mui/material/Box";
import {
  Badge,
  Tooltip,
  CardMedia,
} from "@mui/material";
import { customDrawerIcon } from "./nav.styes";
import { profile_cart_likesData } from "./nav.data";
import LanguageToggler from "./LanguageToggler";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import { useGetAllCartsQuery } from "../../APIs/cartApi";
import MobileProfileMenu from "./MobileProfileMenu";
import { colors } from "../publicStyle/publicStyle";
import Notifications from "../Notifications/Notifications";
import CartIcon from "../../assets/Cart-Icon.png";
import SavedIcon from "../../assets/Saved-Icon.png";
import { LocationMenu } from "./LocationMenu";

export default function Drawers() {
  const [_, { language }] = useTranslation();
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
          display: {
            md: "block",
            xs: "none",
          },
          mx: "2px",
        }}
      >
        <MobileProfileMenu />
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
        }}>
        <LanguageToggler />
      </Box>
      <LocationMenu />
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
              mx: "4px",
              width: {
                md: 30,
                xs: 25,
              },
              height: {
                md: 40,
                xs: 30,
              },
              display: {
                md: "flex",
                xs: name === 'likes' ? "none" : 'flex',
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
