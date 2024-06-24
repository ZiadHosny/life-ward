import { Box, Menu, MenuItem, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import NotificationsButton from "./NotificationsButton";
import { MenuStyles } from "./styles";
import NotifyItem from "./NotifyItem";
import { publicFontFamily } from "../publicStyle/publicStyle";
const NotificationsMenu = ({ notifications, lng, iconColor, bgColorBtn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [data, setData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [unreadNots, setUnreadNots] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setData(notifications);
    } else {
      setData(unreadNots);
    }
  };
  useEffect(() => {
    setData(notifications || []);
    setUnreadNots(notifications?.filter((notify) => notify?.read === false));
  }, [notifications]);

  const styles = MenuStyles({ lng });
  return (
    <Box>
      <NotificationsButton
        unreadNots={unreadNots}
        handleClick={handleClick}
        lng={lng}
        iconColor={iconColor}
        bgColorBtn={bgColorBtn}
      />

      <Menu
        className="notifications-menu"
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={styles.Menu}
      >
        {notifications.length > 0 ? (
          <div>
            <Typography
              sx={{ ...styles.menuTitle, fontFamily: publicFontFamily }}
            >
              {lng === "en" ? "Notifications" : "الاشعارات"}
            </Typography>

            <Box>
              <Tabs
                value={tabValue}
                onChange={handleChangeTabValue}
                aria-label="basic tabs example"
                sx={styles.Tabs}
              >
                <Tab label={lng === "en" ? "All" : "الكل"} sx={styles.tab} />
                <Tab
                  label={lng === "en" ? "Unread" : "غير المقروءه"}
                  sx={styles.tab}
                />
              </Tabs>
              {data?.map((notify) => (
                <MenuItem
                  key={notify?._id}
                  onClick={() => {
                    setAnchorEl(null);
                  }}
                >
                  <NotifyItem
                    message={notify?.title}
                    createdAt={notify?.createdAt}
                    read={notify?.read}
                    _id={notify?._id}
                    setAnchorEl={setAnchorEl}
                  />
                </MenuItem>
              ))}
            </Box>
          </div>
        ) : (
          <Typography
            sx={{
              fontSize: "1.1rem",
              textAlign: "center",
              fontFamily: publicFontFamily,
            }}
          >
            {lng === "en"
              ? "There is no exist notifications"
              : "لا يوجد اشعارات حاليا"}
          </Typography>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationsMenu;
