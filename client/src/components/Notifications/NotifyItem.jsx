import { Stack, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMarkNotificationAsReadMutation } from "../../APIs/NotificationsApi";
import { publicFontFamily } from "../publicStyle/publicStyle";

const NotifyItem = ({ message, createdAt, read, _id, setAnchorEl }) => {
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
        toast.success(res[`success_${lng === "en" ? "en" : "ar"}`]);
      })
      .catch((e) => {
        toast.error(e[`error_${lng === "en" ? "en" : "ar"}`]);
      });
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
      sx={{ width: "100%" }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        sx={{ overflow: "hidden" }}
      >
        <FiberManualRecordIcon
          sx={{
            fontSize: "11px",
            color: read ? "#6161617a" : "#693096",
          }}
        />
        <Typography
          sx={{
            fontFamily: publicFontFamily,
          }}
        >{`${message}`}</Typography>
      </Stack>
      <Typography
        my={1}
        sx={{
          fontSize: "13px",
          color: "#61616152",
          pl: 2,
          fontFamily: publicFontFamily,
        }}
      >{`${customMoment(createdAt)}`}</Typography>
    </Stack>
  );
};

export default NotifyItem;
