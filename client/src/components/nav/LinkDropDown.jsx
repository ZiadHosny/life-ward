import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { Box } from "@mui/material";
const LinkDropDown = ({
  item,
  pathname,
  color,
  moreStyle,
  justifyContenValue,
}) => {
  const [_, { language: lang }] = useTranslation();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: justifyContenValue && justifyContenValue,
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
        sx={{
          ...moreStyle,
          color,
          bgcolor: pathname.includes("/department")
            ? `${colors.main} !important`
            : "transparent",
          fontWeight: "bolder",
          textTransform: "capitalize",
          fontSize: {
            xs:'14px',
            md:"16px"
          },
          borderRadius: 0,
          fontFamily: publicFontFamily,
          py: "7.5px",
          px: {
            lg: "30px",
            md: "20px",
          },
        }}
      >
        {item[`title_${lang}`]}
        <ArrowDropDownIcon
          sx={{
            transition: "transform 0.4s",
            transform: open ? "rotate(180deg)" : undefined,
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        disableScrollLock={true}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiList-root": {
            width: "in",
          },
        }}
      >
        {item?.nestedLinks.map((nested) => {
          return (
            <MenuItem
              key={nested.id}
              onClick={() => {
                navigate(
                  `departments/${nested?.id}/${nested.title_en.replace(
                    / /g,
                    "-"
                  )}`
                );
                handleClose();
              }}
              sx={{
                bgcolor: "transparent !important",
                fontFamily: publicFontFamily,
                color: pathname.includes(`/departments/${nested?.id}`)
                  ? `#693096 !important`
                  : `#8F949A !important `,
                fontWeight: pathname.includes(`/departments/${nested?.id}`)
                  ? "bold !important"
                  : "normal",
              }}
            >
              {nested[`title_${lang}`]}
            </MenuItem>
          );
        })}
        <MenuItem
          onClick={() => {
            navigate(`departments`);
            handleClose();
          }}
          sx={{
            fontFamily: publicFontFamily,
            color:
              pathname === `/departments`
                ? `#693096!important`
                : `#8F949A !important `,
            fontWeight:
              pathname === `/departments` ? "bold !important" : "normal",
            bgcolor: "transparent !important",
          }}
        >
          {lang === "en" ? "All Departments" : "جميع الأقسام"}
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default LinkDropDown;
