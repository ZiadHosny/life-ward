import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";
export const BoxIconsColor = {
  delete: "black",
  cart: "#bf692d",
};

export const ActionIcon = {
  delete: (
    <Box
      sx={{
        backgroundColor: BoxIconsColor["delete"],
        borderRadius: "4px",
        padding: "5px",
        margin: "0 5px",
      }}
    >
      <DeleteIcon
        key={"delete"}
        sx={{ fontSize: "2.5em", color: "white", margin: "0 5px" }}
      />
    </Box>
  ),
  cart: (
    <Box
      sx={{
        backgroundColor: BoxIconsColor["cart"],
        borderRadius: "4px",
        padding: "5px",
        margin: "0 5px",
      }}
    >
      <ShoppingCartIcon
        key={"cart"}
        sx={{ fontSize: "2.5em", color: "white", margin: "0 5px" }}
      />
    </Box>
  ),
};
