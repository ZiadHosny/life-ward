import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import CityShowNeighborhoodModal from "./CityShowNeighborhoodModal";
import { useDeleteCategoryByIdMutation } from "../../api/category.api";
import { toast } from "react-toastify";
import { allowed } from "../../helper/roles";
import { useSelector } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import CityModal from "./CityModal";
import CityAddNeighborhoodModal from "./CityAddNeighborhoodModal";
// import { useDeleteCityByIdMutation } from "../../api/city.api";

function CityCard(city) {
  const { role } = useSelector((state) => state.user);
  // const [deleteCity, { isLoading: deleteCityLoading }] =
  //   useDeleteCityByIdMutation();
  const [deleteCity, { isLoading: deleteCityLoading }] =
    useDeleteCategoryByIdMutation();
  const { colors, customColors } = useTheme();
  const {
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openNeighborhood, setOpenNeighborhood] = useState(false);
  const [openCreateNeighborhood, setOpenCreateNeighborhood] = useState(false);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenNeighborhood = () => {
    setOpenNeighborhood(true);
  };
  const handleClickOpenCreateNeighborhood = () => {
    setOpenCreateNeighborhood(true);
  };

  const handleDeleteCity = () => {
    deleteCity(city.data._id)
      .unwrap()
      .then(() => {
        toast.success(
          language === "en" ? "Deleted Successfully" : "تم الحذف بنجاح"
        );
      })
      .catch((error) => {
        const message =
          language === "en" ? error?.data?.error_en : error?.data?.error_ar;
        toast.error(message);
      });
  };

  return (
    <>
      <CityModal open={open} setOpen={setOpen} data={city.data} />
      <CityShowNeighborhoodModal
        open={openNeighborhood}
        setOpen={setOpenNeighborhood}
        city={city.data}
      />

      <CityAddNeighborhoodModal
        open={openCreateNeighborhood}
        setOpen={setOpenCreateNeighborhood}
        city={city.data}
      />

      <TableRow
        sx={{
          bgcolor: customColors.bg,
        }}
      >
        <TableCell align="center">
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
            }}
          >
            {city.index + 1}
          </Typography>
        </TableCell>
        <TableCell align="center">
          {language === "en" ? city.data.name_en : city.data.name_ar}
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Add Neighborhood */}
            {allowed({ page: "cities", role }) ? (
              <BootstrapTooltip
                title={
                  language === "en" ? "Add Neighborhood" : "أضافة حي"
                }
              >
                <Button
                  variant="raised"
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent", // Remove the hover effect by setting a transparent background
                    },
                    p: "2px",
                    minWidth: "0px",
                  }}
                  onClick={handleClickOpenCreateNeighborhood}
                >
                  <AddCircleOutlineIcon
                    sx={{
                      color: "green",
                      p: "4px",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </Button>
              </BootstrapTooltip>
            ) : (
              <></>
            )}

            {/* View Neighborhood */}
            <BootstrapTooltip
              title={
                language === "en"
                  ? "View all Neighborhood in this City"
                  : "عرض كل الاحياء الموجودة في هذه المدينة"
              }
            >
              <Button
                variant="raised"
                sx={{
                  ":hover": {
                    backgroundColor: "transparent", // Remove the hover effect by setting a transparent background
                  },
                  p: "2px",
                  minWidth: "0px",
                }}
                onClick={handleClickOpenNeighborhood}
              >
                <VisibilityIcon
                  sx={{
                    color: colors.main,
                    p: "2px",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </Button>
            </BootstrapTooltip>

            {/* Edit City */}
            {allowed({ page: "cities", role }) ? (
              <BootstrapTooltip
                title={language === "en" ? "Edit City" : "تعديل مدينة"}
              >
                <Button
                  variant="raised"
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent", // Remove the hover effect by setting a transparent background
                    },
                    p: "2px",
                    minWidth: "0px",
                  }}
                  onClick={handleClickOpen}
                >
                  <BorderColorIcon
                    sx={{
                      color: "#f7ff00",
                      p: "2px",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </Button>
              </BootstrapTooltip>
            ) : (
              <></>
            )}

            {/* Delete City */}
            {allowed({ page: "cities", role }) ? (
              <BootstrapTooltip
                title={language === "en" ? "Delete City" : "مسح مدينة"}
              >
                <Button
                  variant="raised"
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent", // Remove the hover effect by setting a transparent background
                    },
                    p: "2px",
                    minWidth: "0px",
                  }}
                  disabled={deleteCityLoading}
                  onClick={handleDeleteCity}
                >
                  <DeleteIcon
                    sx={{
                      color: colors.dangerous,
                      p: "2px",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </Button>
              </BootstrapTooltip>
            ) : (
              <></>
            )}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CityCard;
