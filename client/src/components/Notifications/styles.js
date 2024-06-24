export const MenuStyles = ({ lng }) => ({
  Menu: {
    maxHeight: 500,
    ".MuiMenu-paper": {
      px: 2,
      width: 360,
      color: "#414b54",
      bgcolor: "#fff !important",
      boxShadow: "0 0 10px 0 rgb(0 0 0 / 20%)",
    },
    ".MuiMenu-paper::-webkit-scrollbar": {
      width: "9px",
      left: 0,
    },
    ".MuiMenu-paper::-webkit-scrollbar-track": {
      background: "#fff",
    },
    ".MuiMenu-paper::-webkit-scrollbar-thumb": {
      background: "#dbdbd9",
      borderRadius: 4,
    },
  },
  menuTitle: {
    textAlign: lng === "ar" ? "right" : "left",
    fontWeight: "bold",
    fontSize: "20px",
    p: 1,
  },
  Tabs: {
    mb: 3,
    px: 1,
    "& .MuiTabs-indicator": {
      bgcolor: "transparent",
    },
    "& .MuiTabs-flexContainer": {
      // flexDirection: lng === 'en' ? 'row' : 'row-reverse',
      justifyContent: lng === "en" ? "flex-start" : "flex-end",
    },
  },
  tab: {
    "&.Mui-selected": {
      bgcolor: "#693096",
      color: "white",
    },
    color: "#414b54",
    textTransform: "capitalize",
    borderRadius: 3,
    fontSize: "15px",
  },
});
