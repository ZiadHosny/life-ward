import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetNotificationsByUserIdQuery } from "../../APIs/NotificationsApi";

import { useMarkNotificationAsReadMutation } from "../../APIs/NotificationsApi";
// import NotifyItem from '../../components/Notifications/NotifyItem'
const NotifyItem = ({ title, desc, createdAt, read, _id, slicedURL }) => {
  const [, { language: lng }] = useTranslation();
  const navigate = useNavigate();
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const customMoment = (time) => {
    const custom = moment(time).locale(lng).fromNow();
    return custom;
  };
  const handleMarkAsRead = (_id) => {
    markNotificationAsRead({ id: _id, payload: { read: true } })
      .unwrap()
      .then((res) => {
         
      })
      .catch((e) => {
        toast.error(e[`error_${lng === "en" ? "en" : "ar"}`]);
      });
  };
  const MAX_WORDS = 5;
  // Function to slice text if it contains more than MAX_WORDS
  const sliceText = (text) => {
    const words = text.split(" ");
    if (words.length > MAX_WORDS) {
      return "..." + words.slice(0, MAX_WORDS).join(" ");
    }
    return text;
  };
  return (
    <Stack
      onClick={() => {
        localStorage.setItem("notifyId", _id);
        navigate(`/notifications`);
        {
          !read && handleMarkAsRead(_id);
        }
      }}
      direction={"row-reverse"}
      sx={{ width: "100%" }}
    >
      <Box width={"100%"}>
        <Typography textAlign={"end"} noWrap>
          {sliceText(desc)}
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${slicedURL}`);
            }}
            sx={{
              wordBreak: "break-word",
              color: "#333",
              width: "fit-content",
              cursor: "pointer",
              fontSize: { xs: "16px", md: "12px" },
              textDecoration: "none",
              textAlign: lng === "ar" ? "right" : "left",
            }}
          >
            {lng === "en" ? "See More" : "رؤية المزيد"}
          </Typography>
          <Typography
            my={1}
            textAlign={"end"}
            sx={{ fontSize: "13px", color: !read ? "#fff" : "#333" }}
          >{`${customMoment(createdAt)}`}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};
const NotificationsPage = () => {
  const navigate = useNavigate();
  const [, { language: lng }] = useTranslation();
  const [getNots, { isLoading, isError, isSuccess, error }] =
    useLazyGetNotificationsByUserIdQuery();
  const [nots, setNots] = useState([]);
  const [selectedNotify, setSelectedNotify] = useState({});
  const notifyId = localStorage.getItem("notifyId");
  const customMoment = (time) => {
    const custom = moment(time).locale(lng).fromNow();
    return custom;
  };

  // Find the index of the third "/"
  const thirdSlashIndex = selectedNotify.link?.indexOf(
    "/",
    selectedNotify.link.indexOf("/", selectedNotify.link.indexOf("/") + 1) + 1
  );

  // Slice the URL after the third "/"
  const slicedURL = selectedNotify.link?.replace("/products/","/productDetails/")?.slice(thirdSlashIndex + 1);

  useEffect(() => {
    getNots()
      .unwrap()
      .then((res) => {
        // console.log('res', res)
        setNots(res?.data);
        setSelectedNotify(res?.data?.find((notify) => notify._id === notifyId));
      })
      .catch((err) => {
         
      });
  }, []);
  return (
    <Box sx={{ bgcolor: "#fff", pt: "150px", pb: 5, minHeight: "100vh" }}>
      <Container>
        {isLoading && <span className="loader"></span>}
        {isError && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <Typography
              fontSize={"1.5rem"}
              my={10}
              textAlign={"center"}
              color="error"
            >
              {error?.data && error?.data[`error_${lng}`]}
            </Typography>
          </Box>
        )}
        {isSuccess && (
          <Stack
            direction={{ xs: "column", sm: "row-reverse" }}
            justifyContent={"space-between"}
            gap={5}
            sx={{ mt: 10 }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: "45%" },

                bgcolor: "#ffffff",
                borderRadius: 1,
                boxShadow: "0 0 10px 0 rgb(0 0 0 / 4%)",
                // border: '1px solid #e0e0e0',
                py: { xs: 2, md: 3 },
                px: 0,
                maxHeight: 500,
                overflowY: "auto",
                scrollbarGutter: "stable",
                "&::-webkit-scrollbar": {
                  width: "8px",
                  "&:hover": {
                    width: "10px",
                  },
                },
                "&::-webkit-scrollbar-track": {
                  background: "#E2E2E2",
                  borderRadius: 4,
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#693096",
                  borderRadius: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: lng === "ar" ? "right" : "left",
                  fontWeight: "bold",
                  fontSize: "25px",
                  mb: 3,
                  color: "#000",
                }}
              >
                {lng === "en" ? "Notifications" : "الاشعارات"}
              </Typography>
              {nots?.map((notify) => (
                <Stack
                  sx={{
                    mb: 2,
                    px: { xs: 2, md: 3 },
                    py: 1,
                    cursor: "pointer",
                    bgcolor: notify?.read ? "transparent" : "#693096",
                    color: notify?.read ? "#000" : "#fff",
                    borderBottom: "1px solid #fff",
                  }}
                  key={notify._id}
                  onClick={() => {
                    // Create a copy of nots
                    const updatedNots = nots.map((n) =>
                      n._id === notify._id ? { ...n, read: true } : n
                    );
                    // Update the state with the modified array
                    setNots(updatedNots);
                    setSelectedNotify({ ...notify, read: true });
                  }}
                >
                  {/* <Stack direction={'row'} alignItems={'center'} spacing={1}> */}
                  <NotifyItem
                    desc={notify?.message}
                    createdAt={notify?.createdAt}
                    read={notify?.read}
                    _id={notify?._id}
                    slicedURL={slicedURL}
                  />
                  {/* </Stack> */}
                </Stack>
              ))}
            </Box>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: "45%" },
                bgcolor: "#ffffff",
                borderRadius: 1,
                boxShadow: "0 0 10px 0 rgb(0 0 0 / 4%)",
                p: { xs: 2, md: 3 },
                height: { xs: 300, sm: 500 },
                textAlign: "end",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  sx={{ fontSize: "13px", color: "#333" }}
                >{`${customMoment(selectedNotify?.createdAt)}`}</Typography>
                <Typography sx={{ wordBreak: "break-word" }} variant="h5">
                  {selectedNotify?.title}
                </Typography>
              </Stack>
              <Typography sx={{ wordBreak: "break-word" }} my={1}>
                {selectedNotify?.message}
              </Typography>
            </Box>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default NotificationsPage;
