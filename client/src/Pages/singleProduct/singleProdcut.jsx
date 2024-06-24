export const   style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      md: 0.7,
      xs: 0.9,
    },
    height: {
      lg: "audo",
      md: "70vh",
      xs: "85vh",
    },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    overflowY: {
      lg: "hidden",
      xs: "scroll",
    },
    "&::-webkit-scrollbar": {
      width: "10px",
    },

    /* Track */
    "::-webkit-scrollbar-track": {
      background: "#f0f0f0",
      borderRadius: "20px",
    },

    /* Handle */
    "::-webkit-scrollbar-thumb": {
      background: "#555555",
      borderRadius: "20px",
    },
  };