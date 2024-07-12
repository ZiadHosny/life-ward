import Accordion from '@mui/material/Accordion';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { publicFontFamily } from '../publicStyle/publicStyle';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubId } from '../../APIs/subSlice';
import { colors } from './nav.styes';
import React from 'react';

export const NestedNav = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const [_, { language: lang }] = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const link = `/departments/${item.id}/${item.title_en.replace(
    / /g,
    "-"
  )}`

  const onNavigate = () => {
    navigate(link)
  }

  return (
    <>
      {item.subs.length > 1 ?
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            key={item.link}
            disableRipple
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
            {item.subs.map((sub, i) => {
              return (
                <MenuItem
                  key={sub.id}
                  onClick={() => {
                    onNavigate();
                    handleClose();
                  }}
                  sx={{
                    bgcolor: "transparent !important",
                    fontFamily: publicFontFamily,
                    // color: pathname.includes(`/departments/${nested?.id}`)
                    //   ? `#693096 !important`
                    //   : `#8F949A !important `,
                    // fontWeight: pathname.includes(`/departments/${nested?.id}`)
                    //   ? "bold !important"
                    //   : "normal",
                  }}
                >  {sub.subSubCategories.length > 1 ?
                  <Accordion
                    sx={{
                      color: pathname === link ? colors.main : "#aaa",
                      bgcolor: 'transparent',
                      outline: 'none',
                      padding: 0,
                      boxShadow: 'none',
                      fontSize: "20px",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontFamily: publicFontFamily,
                    }}>
                    <AccordionSummary
                      sx={{ paddingX: '8px' }}
                      expandIcon={
                        <ExpandMoreIcon sx={{
                          color: pathname === link ?
                            "#fff" : "#aaa",
                        }} />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      {sub[`title_${lang}`]}
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      paddingX: 3, marginBottom: 2,
                    }}>
                      <Button
                        key={sub.id}
                        disableRipple
                        onClick={(e) => {
                          onNavigate(e)
                        }}
                        sx={{
                          color: "#aaa",
                          borderBottom: 1,
                          fontSize: "20px",
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          backgroundColor: "transparent !important",
                          display: "block",
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {sub[`title_${lang}`]}
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  :
                  sub[`title_${lang}`]
                  }
                </MenuItem>
              );
            })}
          </Menu>
        </>
        :
        <Button
          key={item.id}
          disableRipple
          onClick={(e) => {
            onNavigate(e);
          }}
          sx={{
            color: pathname === link ? "#fff" : colors.main,
            bgcolor:
              pathname === link
                ? `${colors.main} !important`
                : "transparent",
            fontSize: {
              lg: "16px",
              md: "13px",
            },
            px: {
              lg: "30px",
              md: "20px",
            },
            py: "7.5px",
            borderRadius: 0,
            textTransform: "capitalize",
            fontWeight: "bolder !important",
            display: "block",
            fontWeight: "bolder !important",
            fontFamily: publicFontFamily,
          }}
        >
          {item[`title_${lang}`]}
        </Button>
      }
    </>
  )
}


{/* <Accordion
sx={{
  color: pathname === link ? "#fff" : "#aaa",
  bgcolor: 'transparent',
  outline: 'none',
  padding: 0,
  boxShadow: 'none',
  fontSize: "20px",
  textTransform: "capitalize",
  fontWeight: "bold",
  fontFamily: publicFontFamily,
}}>
<AccordionSummary
  sx={{ paddingX: '8px' }}
  expandIcon={
    <ExpandMoreIcon sx={{
      color: pathname === link ?
        "#fff" : "#aaa",
    }} />
  }
  aria-controls="panel1-content"
  id="panel1-header"
>
  {item[`title_${lang}`]}
</AccordionSummary>
<AccordionDetails sx={{
  padding: 0, marginBottom: 2,
}}>
  {item.subs.map((sub, i) => {
    return (
      sub.subSubCategories.length > 1 ?
        <Accordion
          sx={{
            color: pathname === link ? "#fff" : "#aaa",
            bgcolor: 'transparent',
            outline: 'none',
            padding: 0,
            boxShadow: 'none',
            fontSize: "20px",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontFamily: publicFontFamily,
          }}>
          <AccordionSummary
            sx={{ paddingX: '8px' }}
            expandIcon={
              <ExpandMoreIcon sx={{
                color: pathname === link ?
                  "#fff" : "#aaa",
              }} />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {sub[`title_${lang}`]}
          </AccordionSummary>
          <AccordionDetails sx={{
            paddingX: 3, marginBottom: 2,
          }}>
            <Button
              key={sub.id}
              disableRipple
              onClick={(e) => {
                onNavigate(e)
              }}
              sx={{
                color: "#aaa",
                borderBottom: 1,
                fontSize: "20px",
                textTransform: "capitalize",
                fontWeight: "bold",
                backgroundColor: "transparent !important",
                display: "block",
                fontFamily: publicFontFamily,
              }}
            >
              {sub[`title_${lang}`]}
            </Button>
          </AccordionDetails>
        </Accordion>
        :
        <Button
          key={sub.id}
          disableRipple
          onClick={(e) => {
            dispatch(setSubId(sub.id))
            onNavigate(e)
          }}
          sx={{
            color: "#aaa",
            borderBottom: 1,
            fontSize: "20px",
            textTransform: "capitalize",
            fontWeight: "bold",
            backgroundColor: "transparent !important",
            display: "block",
            fontFamily: publicFontFamily,
          }}
        >
          {sub[`title_${lang}`]}
        </Button>
    )
  })}
</AccordionDetails>
</Accordion> */}