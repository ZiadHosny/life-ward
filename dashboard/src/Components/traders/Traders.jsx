import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import TraderCard from "./TraderCard";
import useSearch from "../../hooks/useSearch";
import { useGetAllTradersQuery } from "../../api/traders.api";

const OrderLoading = () => {
  const { customColors } = useTheme();
  return (
    <Box height={"60vh"} display={"grid"} sx={{ placeItems: "center" }}>
      <CircularProgress sx={{ color: customColors.main }} />
    </Box>
  );
};

function Traders() {
  const { addToSearch, search } = useSearch();
  const { data, isLoading, isError, isSuccess, error } =
    useGetAllTradersQuery();
  const {
    i18n: { language },
  } = useTranslation();
  const { customColors } = useTheme();

  useEffect(() => {
    addToSearch({ key: "limit", value: "1000" });
  }, [search]);

  if (isLoading) return <OrderLoading />;

  return (
    <>
      {!isError && isSuccess ? (
        <div>
          <TableContainer component={Paper} sx={{ minWidth: "100%" }}>
            <Table sx={{ minWidth: "100%" }}>
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
                      {language === "en" ? "Trader" : "اسم التاجر"}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {language === "en" ? "Email" : "البريد الالكتروني"}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {language === "en" ? "City" : "المدينة"}
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
              {data?.data.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colspan="6">
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
                        {language === "en"
                          ? "No Traders"
                          : "لا يوجد تجار"}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {error && (
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: { xs: "20px", sm: "25px", lg: "30px" },
                      }}>
                      {error?.data[`error_${language}`]}
                    </Typography>
                  )}
                  {isSuccess &&
                    !error &&
                    data?.data.map((trader, index) => (
                      <TraderCard key={index} index={index} data={trader} />
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Traders;
