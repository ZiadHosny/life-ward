import {
  Box,
  Stack,
  Table,
  TableCell,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableBody,
  TextField,
  useTheme,
  IconButton,
  Collapse,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Breadcrumbs from "../../Components/Breadcrumbs";
import {
  useChangeOrderStatusByIdMutation,
  useDeleteOrderByIdMutation,
  useGetAllOrdersQuery,
} from "../../api/order.api";
import {
  useAssignOrdersToTraderMutation,
  useGetAllTradersQuery
} from "../../api/traders.api";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "../../helper/order-status";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DialogTraders } from "../../Components/traders/DialogTraders";

const OrdersSales = () => {

  const { data, isSuccess, isError, isLoading, error } =
    useGetAllOrdersQuery("?limit=1000");

  const { data: traders } = useGetAllTradersQuery()
  const [UsersDataOrder, setUsersDataOrder] = useState([]);
  const { customColors, colors } = useTheme();
  useEffect(() => {
    if (isSuccess) {
      setUsersDataOrder(data?.orders);
    }
  }, [data]);
  const [_, { language: lang }] = useTranslation();

  // search function
  const handleSearch = (value) => {
    if (value === "") {
      setUsersDataOrder(data?.orders);
    }
    const newData = data?.orders.filter((item) => {
      return (
        (item.fullname &&
          item.fullname.toLowerCase().includes(value.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(value.toLowerCase()))
      );
    });
    setUsersDataOrder(newData);
  };

  return (
    <Box
      sx={{
        p: { xs: 0, sm: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: "100vh",
      }}
    >
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: lang === "en" ? "55%" : "40%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress
            sx={{
              color: "#00e3d2",
            }}
          />
        </Box>
      )}

      {!isLoading && (
        <>
          <Breadcrumbs page_en={"Orders"} page_ar={"عمليات الشراء"} />
          <Box
            sx={{
              display: "flex",

              flexDirection: "column",
            }}
          >
            {/* search  */}
            <Stack px={2} gap={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                px={2}
                sx={{
                  background:
                    " linear-gradient(90deg,rgba(207, 249, 170, 1) 0%,rgba(117, 219, 209, 1) 100%)",
                  borderRadius: "15px",
                  height: "40px",
                  mr: lang === "ar" ? { xs: "0", md: "20px" } : undefined,
                  ml: lang === "en" ? { xs: "0", md: "20px" } : undefined,
                  width: { xs: "50%", md: "30%" },
                }}
              >
                <SearchIcon />
                <TextField
                  sx={{
                    width: "auto",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "transparent !important",
                      outline: "none !important",
                      backgroundColor: "transparent !important",
                    },
                  }}
                  placeholder={lang === "en" ? "Search" : "ابحث هنا"}
                  name="search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Stack>
              <Box
                sx={{
                  mr: lang === "ar" ? { xs: "0", md: "20px" } : undefined,
                  ml: lang === "en" ? { xs: "0", md: "20px" } : undefined,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "18px", sm: "20px", lg: "25px" },
                  }}
                >
                  {lang === "en" ? "Orders" : "عمليات الشراء"}
                </Typography>
              </Box>
            </Stack>

            {/* table */}

            <Box
              sx={{
                maxWidth: { md: "100%", sm: "100%", xs: 340 },
                mx: { xs: "auto", sm: "initial" },
                overflow: "hidden",
              }}
            >
              <Box sx={{ width: "97%", mx: "auto" }} mt={2}>
                {/* head */}
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          bgcolor: customColors.secondary,
                          borderRadius: "10px",
                          boxShadow: "0px 0px 10px 0px #c6d5d3",

                          "&:last-child td, &:last-child th": {
                            border: 0,
                            textAlign: "center",
                          },
                        }}
                      >
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            #
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {lang === "en" ? "Name" : "الاسم"}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {lang === "en" ? "Email" : "البريد الالكتروني"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {lang === "en" ? "Items" : "العناصر"}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {lang === "en" ? "Price" : "السعر"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {lang === "en" ? "Payment Way" : "طريقة الدفع"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {lang === "en" ? "Status" : " الحالة"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {lang === "en" ? " Date" : "التاريخ"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {lang === "en" ? "Trader " : "التاجر"}
                          </Typography>
                        </TableCell>

                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    {!UsersDataOrder[0] && !isError && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "60%",
                          left: lang === "en" ? "55%" : "45%",
                          transform:
                            lang === "en"
                              ? "translate(-30%, -50%)"
                              : "translate(-50%, -50%)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "20px", sm: "25px", lg: "30px" },
                            color: colors.dangerous,
                          }}
                        >
                          {lang === "en" ? "No Data" : "لا يوجد بيانات"}
                        </Typography>
                      </Box>
                    )}
                    {isError ? (
                      <Box
                        sx={{
                          display: "flex",
                          position: "absolute",
                          top: "60%",
                          left: lang === "en" ? "55%" : "45%",
                          transform:
                            lang === "en"
                              ? "translate(-30%, -50%)"
                              : "translate(-50%, -50%)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "20px", sm: "25px", lg: "30px" },
                            color: colors.dangerous,
                          }}
                        >
                          {error?.data[`error_${lang}`]}
                        </Typography>
                      </Box>
                    ) : (
                      <TableBody>
                        {UsersDataOrder.map((item, index) => (
                          <Row
                            index={index}
                            key={index}
                            item={item}
                            traders={traders?.data ?? []}
                            UsersDataOrder={UsersDataOrder}
                            setUsersDataOrder={setUsersDataOrder}
                            data={data}
                          />
                        ))}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrdersSales;


const Row = ({ index, item, UsersDataOrder, setUsersDataOrder, data, traders }) => {
  const [assignOrder,] = useAssignOrdersToTraderMutation();

  const assignOrderFn = async (traderId) => {
    await assignOrder({
      body: {
        orderId: item._id,
        traderId: traderId
      }
    })
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { customColors, colors } = useTheme();
  const [openDetails, setOpenDetails] = useState(false);
  const navigate = useNavigate();
  const [deleteOrderById, { isLoading: deleteOrderByIdLoading }] =
    useDeleteOrderByIdMutation();
  const [_, { language: lang }] = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = (order) => {
    setUsersDataOrder(UsersDataOrder.filter((item) => item._id !== order._id));
    deleteOrderById(order._id)
      .unwrap()
      .then((res) => {
        toast.success(res[`success_${lang}`]);
      })
      .catch((err) => {
        setUsersDataOrder(data?.orders);
        toast.error(err?.data[`error_${lang}`]);
      });
  };

  const [changeOrderStatusById] = useChangeOrderStatusByIdMutation();

  function handleToggleOrderState(item) {
    changeOrderStatusById({
      payload: item.orderStatus,
      id: item._id,
    })
      .unwrap()
      .then((res) => {
        const findedUpdatdItem = UsersDataOrder.find(
          (order) => order._id === item._id
        );
        toast.success(res[`success_${lang}`]);
        const newArray = UsersDataOrder.map((order) => {
          if (findedUpdatdItem) {
            return res.order;
          }
          return order;
        });
        setUsersDataOrder(newArray);
      });
  }

  return (
    <>
      <TableRow
        key={index}
        sx={{
          bgcolor: customColors.bg,
          borderRadius: "10px",
        }}
      >
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell
          onClick={() => {
            navigate(`/orders/${item._id}`);
          }}
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
          align="center"
        >
          {item.name}
        </TableCell>
        <TableCell align="center">
          {item?.email ||
            (lang === "en" ? "No Email" : "لا يوجد بريد")}
        </TableCell>

        <TableCell align="center">
          {item.totalQuantity}
        </TableCell>
        <TableCell align="center">
          {lang === "en"
            ? `${item.totalPrice} SAR`
            : `${item.totalPrice}ر.س`}
        </TableCell>
        <TableCell align="center">
          {item.payInCash
            ? lang === "en"
              ? "Pay in delivery"
              : "الدفع عند التوصيل"
            : lang === "en"
              ? `Online`
              : `اونلاين`}
        </TableCell>

        <TableCell align="center">
          <Typography
            sx={{
              // width: { xs: "100%", sm: "80%", xl: "100%" },
              p: "3px 20px",

              backgroundColor:
                item.orderStatus === "pending"
                  ? "#f7ce70"
                  : "#7DDDCD",
              color:
                item.orderStatus === "pending"
                  ? "#000"
                  : "#fff",
              fontWeight: "bold",
              borderRadius: "25px",
              textAlign: "center",
              fontSize: {
                xs: "12px",
                sm: "14px",
                lg: "16px",
              },
              cursor: "pointer",
            }}
            onClick={() => handleToggleOrderState(item)}
          >
            {ORDER_STATUS[item?.status][lang]}
          </Typography>
        </TableCell>

        <TableCell align="center">
          {
            item?.updatedAt ? item.updatedAt.slice(0, 10) : item?.createdAt.slice(0, 10)
          }
        </TableCell>

        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
          <Button
            size="small"
            onClick={handleClickOpen}
            sx={{
              fontWeight: "bold",
            }}
          >
            {lang === "en" ? "Add Trader" : "اضف تاجر"}
          </Button>
        </TableCell>

        <TableCell align="center" sx={{ margin: 0 }}>
          <Box sx={{ display: 'flex' }}>
            <Button
              size="small"
              onClick={() => {
                handleDelete(item);
              }}
              disabled={deleteOrderByIdLoading}
              sx={{
                backgroundColor: "transparent !important",

                color: colors.dangerous,
                fontWeight: "bold",
              }}
            >
              <DeleteIcon />
            </Button>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenDetails(!openDetails)}
            >
              {openDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </TableCell>
      </TableRow >
      <DialogTraders
        assignOrderFn={assignOrderFn}
        open={open}
        onClose={handleClose}
        traders={traders} />
      <TableRow sx={{
        bgcolor: customColors.bg,
      }}>
        <TableCell sx={{ padding: 0 }} colSpan={12}>
          <Collapse in={openDetails} timeout="auto" unmountOnExit>
            <TableRow sx={{ padding: 1, textAlign: 'center', display: 'flex', alignItems: 'center' }}>
              {
                item.city ?
                  <>
                    <TableCell sx={{ paddingBottom: '10px', paddingTop: '10px' }}>
                      {lang === 'en' ? 'City' : 'المدينة'} : {item.city['name_ar']}
                    </TableCell>
                    <Box sx={{ height: '30px', borderRight: 2 }}></Box>
                  </>
                  :
                  <></>
              }
              {
                item.neighborhood ?
                  <>
                    <TableCell sx={{ paddingBottom: '10px', paddingTop: '10px' }}>
                      {lang === 'en' ? 'Neighborhood' : 'الحي'} : {item.neighborhood['name_ar']}
                    </TableCell>
                    <Box sx={{ height: '30px', borderRight: 2 }}></Box>
                  </>
                  :
                  <></>
              }
              <TableCell sx={{ paddingBottom: '10px', paddingTop: '10px' }}>
                {lang === 'en' ? 'Address' : 'العنوان'} : {item.address}
              </TableCell>
            </TableRow>
          </Collapse>
        </TableCell>
      </TableRow >
    </>
  )
}