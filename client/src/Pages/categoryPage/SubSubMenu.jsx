import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import {
  publicFontFamily,
  colors,
} from "../../components/publicStyle/publicStyle";
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation, useNavigate } from "react-router-dom";

const SubSubMenu = ({
  item,
  moreStyle,
  subSubId,
  setSubSubId,
  setSubCategoryId,
  subCategoryId,
}) => {
  const [_, { language: lang }] = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: justifyContenValue && justifyContenValue,
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
          color: "#8455A9",
          bgcolor: "transparent",
          fontWeight: "bolder",
          textTransform: "capitalize",
          fontSize: subCategoryId === item.id ? "18px" : "16px",
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
        onClose={handleClose}
        disableScrollLock={true}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiList-root": {
            width: "in",
          },
        }}
      >
        {item?.subSubCategories.map((nested) => {
          return (
            <MenuItem
              key={nested.id}
              onClick={() => {
                setSubSubId(nested?.id);
                setSubCategoryId(item.id);
                handleClose();
              }}
              sx={{
                justifyContent: "center",
                fontFamily: publicFontFamily,
                color:
                  subSubId === nested?.id
                    ? `#693096  !important`
                    : `#8F949A !important `,
              }}
            >
              {nested[`title_${lang}`]}
            </MenuItem>
          );
        })}
        <MenuItem
          onClick={() => {
            setSubSubId(``);
            setSubCategoryId(item.id);
            handleClose();
          }}
          sx={{
            fontFamily: publicFontFamily,
            bgcolor: "transparent !important",
            color:
              subSubId === "" && subCategoryId === item.id
                ? "#693096"
                : "#8F949A",
            justifyContent: "center",
          }}
        >
          {lang === "en"
            ? "All sub sub categories"
            : "جميع الأقسام الفرعية الفرعية"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SubSubMenu;
