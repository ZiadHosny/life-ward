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
import TraderShowOrderModal from "./TraderShowOrderModal";
import { toast } from "react-toastify";
import { allowed } from "../../helper/roles";
import { useSelector } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TraderModal from "./TraderModal";
import TraderAddOrderModal from "./TraderAddOrderModal";
import { useDeleteTraderByIdMutation } from "../../api/traders.api";

function TraderCard(trader) {
  const { role } = useSelector((state) => state.user);
  const [deleteTrader, { isLoading: deleteTraderLoading }] =
    useDeleteTraderByIdMutation();
  const { colors, customColors } = useTheme();
  const {
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openNeighborhood, setOpenNeighborhood] = useState(false);
  const [openAddOrderToTrader, setOpenAddOrderToTrader] = useState(false);

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
  const handleClickOpenAddOrderToTrader = () => {
    setOpenAddOrderToTrader(true);
  };

  const handleDeleteTrader = () => {
    deleteTrader(trader.data._id)
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
      <TraderModal open={open} setOpen={setOpen} data={trader.data} />
      <TraderShowOrderModal
        open={openNeighborhood}
        setOpen={setOpenNeighborhood}
        trader={trader.data}
      />

      <TraderAddOrderModal
        open={openAddOrderToTrader}
        setOpen={setOpenAddOrderToTrader}
        trader={trader.data}
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
            {trader.index + 1}
          </Typography>
        </TableCell>
        <TableCell align="center">
          {trader.data.name}
        </TableCell>

        <TableCell align="center">
          {trader.data.email}
        </TableCell>

        {/* <TableCell align="center">
          {trader.data.password}
        </TableCell> */}

        <TableCell align="center">
          {trader.data.city[`name_${language}`]}
        </TableCell>

        <TableCell align="center">
          {trader.data.country[`name_${language}`]}
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
            {/* Add Order */}
            {/* {allowed({ page: "traders", role }) ? (
              <BootstrapTooltip
                title={
                  language === "en" ? "Add Order" : "أضافة طلب"
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
                  onClick={handleClickOpenAddOrderToTrader}
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
            )} */}

            {/* View Orders */}
            {/* <BootstrapTooltip
              title={
                language === "en"
                  ? "View all Orders for this Trader"
                  : "عرض كل الطلبات لهذا التاجر"
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
            </BootstrapTooltip> */}

            {/* Edit Trader */}
            {allowed({ page: "traders", role }) ? (
              <BootstrapTooltip
                title={language === "en" ? "Edit Trader" : "تعديل تاجر"}
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

            {/* Delete Trader */}
            {allowed({ page: "traders", role }) ? (
              <BootstrapTooltip
                title={language === "en" ? "Delete Trader" : "حذف تاجر"}
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
                  disabled={deleteTraderLoading}
                  onClick={handleDeleteTrader}
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

export default TraderCard;
