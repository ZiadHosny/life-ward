import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  colors,
  publicFontFamily,
} from "../../components/publicStyle/publicStyle";
import PriceFilter from "./PriceFilter";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect } from "react";
import { useLazyGetAllAttsQuery } from "../../APIs/ProductApis";
import GenerateAttributeData from "./attributesData";
import ReplayIcon from "@mui/icons-material/Replay";
export default function FilterAttributesMenu({
  hundleAddAtt,
  selectedAtts,
  setSelectedAtts,
  setPriceState,
  priceState,
  priceSearchedClicked,
  setPriceSearchedClicked,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [_, { language: lang }] = useTranslation();
  const { attributesData } = GenerateAttributeData();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    if (!open) {
      setExpanded(false);
    }
  }, [open]);
  return (
    <Box>
      <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={
            <FilterAltOutlinedIcon
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "4px",
              }}
            />
          }
          sx={{
            bgcolor: "#CFBCDD !important",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: publicFontFamily,
              fontSize: {
                md: "20px",
                xs: "15px",
              },
              fontWeight: "bold",
              mx: "5px",
              color: "#fff",
              my: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {lang === "en" ? "filter by" : "تصفية حسب"}
          </Typography>
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          disableScrollLock
          sx={{
            maxHeight: 600,
            p: 0,
          }}
        >
          {attributesData?.length > 0 &&
            attributesData?.map((attribute, idx) => (
              <Accordion
                key={idx}
                expanded={expanded === attribute.key_en}
                onChange={handleChange(attribute.key_en)}
                sx={{
                  m: "0 !important",
                }}
              >
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    gap={"10px"}
                  >
                    {selectedAtts.includes((item) =>
                      item.key_en == attribute.key_en ? (
                        <CheckBoxIcon
                          sx={{
                            color: colors.main,
                            fontSize: "20px",
                          }}
                        />
                      ) : undefined
                    )}
                    <Typography
                      sx={{
                        width: 150,
                        fontFamily: publicFontFamily,
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: colors.main,
                      }}
                    >
                      {attribute[`key_${lang}`]}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    overflow: "hidden",
                  }}
                >
                  {attribute.values?.map((item) => (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        id={item?.value_en}
                        value={item?.value_en}
                        checked={selectedAtts.find(
                          (selected) =>
                            selected.key_en === attribute.key_en &&
                            selected.values.find(
                              ({ value_en }) => value_en === item?.value_en
                            )
                        )}
                        style={{
                          accentColor: colors.main,
                        }}
                        onChange={(event) =>
                          hundleAddAtt(attribute,item,event)
                        }
                      />
                      <Typography
                        component="label"
                        htmlFor={item?.[`value_${lang}`]}
                        sx={{
                          color: colors.main,
                          fontFamily: "bold",
                          fontSize: "19px",
                          fontFamily: publicFontFamily,
                          cursor: "pointer",
                        }}
                      >
                        {item?.[`value_${lang}`]}
                      </Typography>
                    </Stack>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          <Accordion
            expanded={expanded === "price"}
            onChange={handleChange("price")}
            sx={{
              m: "0 !important",
            }}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                sx={{
                  width: 150,
                  fontFamily: publicFontFamily,
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: colors.main,
                }}
              >
                {lang === "en" ? "Price" : "السعر"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                border: 1,
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <PriceFilter
                expanded={expanded}
                priceState={priceState}
                setPriceState={setPriceState}
                priceSearchedClicked={priceSearchedClicked}
                setPriceSearchedClicked={setPriceSearchedClicked}
              />
            </AccordionDetails>
          </Accordion>
        </Menu>
        {selectedAtts?.length > 0 || priceSearchedClicked ? (
          <ReplayIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedAtts([]);
              setPriceSearchedClicked(false);
              setPriceState({
                from: 0,
                to: 0,
              });
            }}
          />
        ) : undefined}
      </Stack>
    </Box>
  );
}
