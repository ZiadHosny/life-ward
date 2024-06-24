import { Badge, CardMedia, IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { colors } from "../publicStyle/publicStyle";
import NotificationIcon from "../../assets/Notification-Icon.png";
const NotificationsButton = ({
  unreadNots,
  handleClick,
  lng,
  iconColor,
  bgColorBtn,
}) => {
  return (
    <IconButton
      aria-label="more"
      id="long-button"
      aria-controls={open ? "long-menu" : undefined}
      aria-expanded={open ? "true" : undefined}
      aria-haspopup="true"
      onClick={handleClick}
      sx={{
        bgcolor: "transparent !important",
        ".MuiBadge-badge": {
          ' background-color':' #693096',
          color: '#fff',
          'font-size': '15px',
          height:' 20px',
          width:' 20px',
          padding: '7px',
          top:' -5px',
         ' border-radius': '50%',
         fontWeight:'bold',

        },
      }}
    >
      <Badge
        sx={{ color: colors.main ,
          
           
        }}
        badgeContent={unreadNots?.length > 0 ? unreadNots?.length : undefined}
        overlap="circular"
      >
        <Tooltip
          title={lng === "en" ? "Notifications" : "الإشعارات"}
          sx={{
            cursor: "pointer",
            bgcolor: "transparent",
          }}
        >
          <CardMedia
            component={"img"}
            src={NotificationIcon}
            onClick={handleClick}
            sx={{
              height: { md: 21, xs: 17 },
              width: { md: 21, xs: 17 },
              objectFit: "fill",
            }}
          />
        </Tooltip>
      </Badge>
    </IconButton>
  );
};

export default NotificationsButton;
