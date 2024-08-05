import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { toast } from "react-toastify";
import { allowed } from "../../helper/roles.js";
import { useSelector } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useDeleteNeighborhoodByIdMutation, useGetAllNeighborhoodsForSpecificCityQuery } from "../../api/neighborhoods.api.js";

function TraderAddOrderModal({ open, setOpen, city }) {
  const { role } = useSelector((state) => state.user);
  const [deleteNeighborhood, { isLoading: DeleteNeighborhoodLoading }] =
    useDeleteNeighborhoodByIdMutation()
  const { data, isSuccess } = useGetAllNeighborhoodsForSpecificCityQuery({
    id: city?._id,
  });

  const { colors, customColors } = useTheme();
  const [openUpdateSub, setOpenUpdateSub] = useState(false);
  const [selectSub, setSelectSub] = useState({});

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
  const {
    i18n: { language },
  } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdateSub = (neighborhood) => {
    setSelectSub(neighborhood);
    setOpenUpdateSub(true);
  };

  const handleDeleteNeighborhood = (id) => {
    deleteNeighborhood(id)
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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "720px!important",
          py: "40px",
          px: "30px",
          borderRadius: "10px",
        },
      }}
    >
      {/* <CityAddNeighborhoodModal
        open={openUpdateSub}
        setOpen={setOpenUpdateSub}
        city={city.data}
        neighborhood={selectSub}
      /> */}

      <Stack>
        <Typography sx={{ color: colors.main }}>
          {language === "en" ? "Neighborhoods" : "الأحياء"}
        </Typography>
      </Stack>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          width: "100%",
          backgroundColor: "#b2f6f1",
          my: "20px",
          color: "grey",
        }}
      />
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              sx={{ bgcolor: customColors.secondary, borderRadius: "5px" }}
            >
              <TableRow>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    #
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {language === "en" ? "Neighborhood" : "الحي"}
                  </Typography>
                </TableCell>

                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>

            {data === undefined ? (
              <TableBody>
                <TableRow>
                  <TableCell colspan="3" sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                        width: "100%",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ textAlign: "center", width: "100%" }}
                      >
                        {language === "en"
                          ? "No Neighborhoods In this City"
                          : "لا يوجد أحياء في هذه المدينة"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {isSuccess &&
                  data.data.map((neighborhood, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        {language === "en"
                          ? neighborhood.name_en
                          : neighborhood.name_ar}
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
                          {/* Delete and Edit Neighborhood */}
                          {allowed({ page: "Neighborhoods", role }) ? (
                            <Box
                              sx={{
                                display: "flex",
                                direction: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              {/* Edit Neighborhood */}
                              <BootstrapTooltip
                                title={
                                  language === "en"
                                    ? "Edit Neighborhood"
                                    : "تعديل هذا الحي"
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
                                  // onClick={handleClickOpen}
                                  onClick={() =>
                                    handleClickOpenUpdateSub(neighborhood)
                                  }
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

                              {/* Delete Neighborhood */}
                              <BootstrapTooltip
                                title={
                                  language === "en"
                                    ? "Delete Neighborhood"
                                    : "حذف هذا الحي"
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
                                  onClick={() =>
                                    handleDeleteNeighborhood(neighborhood._id)
                                  }
                                  disabled={DeleteNeighborhoodLoading}
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
                            </Box>
                          ) : (
                            <> </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>

      <Stack
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mt: "20px",
          gap: 2,
        }}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            bgcolor: colors.main,
            color: "white",
            textTransform: "capitalize",
            "&:hover": { bgcolor: customColors.main },
          }}
        >
          {language === "en" ? "Close" : "أغلاق"}
        </Button>
      </Stack>
    </Dialog>
  );
}

export default TraderAddOrderModal;
