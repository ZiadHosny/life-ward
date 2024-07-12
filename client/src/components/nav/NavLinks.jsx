import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { publicFontFamily } from "../publicStyle/publicStyle";
import LinkDropDown from "./LinkDropDown";
import { NestedNav } from './NestedNav'
import { NavLinksData } from "./nav.data";
import { colors } from "./nav.styes";
export default function NavLinks() {
  const [_, { language: lang }] = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Grid
      container
      sx={{
        width: 0.85,
        mx: "auto",
        borderBottom: `2px solid ${colors.main}`,
        bgcolor: "#fff",
        display: {
          md: "flex",
          xs: "none",
        },
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {NavLinksData()
        .map((item, index) => {
          return item.nestedLinks ? (
            item.nestedLinks.map((dep) => {
              return (
                <Grid
                  key={index}
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <NestedNav
                    key={index}
                    item={dep}
                  />
                  {/* <LinkDropDown
                    key={dep}
                    item={dep}
                    pathname={pathname}
                    color={pathname.includes("/department") ? "#fff" : colors.main}
                  /> */}
                </Grid>
              )
            })
          ) : (
            <Grid
              key={index}
              item
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                key={item.link}
                disableRipple
                onClick={() => navigate(item.link)}
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "13px",
                  },
                  textTransform: "capitalize",
                  backgroundColor: "transparent !important",
                  fontFamily: publicFontFamily,
                  fontWeight: "bolder !important",
                  borderRadius: 0,
                  py: "7.5px",
                  px: {
                    lg: "30px",
                    md: "20px",
                  },
                  color: pathname === item.link ? "#fff" : colors.main,
                  bgcolor:
                    pathname === item.link
                      ? `${colors.main} !important`
                      : "transparent",
                }}
              >
                {item[`title_${lang}`]}
              </Button>
            </Grid>
          );
        })}
    </Grid>
  );
}
