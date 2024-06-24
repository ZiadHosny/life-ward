import {
  CardMedia,
  Container,
  Grid,
  Typography,
  Stack,
  Box,
  ButtonGroup,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { imageBaseUrl } from "../../components/service";
// import useDeleteSavedProduct from "../../Pages/ProductsListForCart_Saved/useDeleteSavedProduct";
// import {useUpdateQuantityMutation} from '../../APIs/cartApi'
import { useDeleteSavedProductMutation } from "../../APIs/SavedProductApi";
import { motion } from "framer-motion";
import {
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useUpdateQuantityMutation,
} from "../../APIs/cartApi";
import {} from "../../APIs/cartApi";
import { useDispatch } from "react-redux";
import { DecrementCart, incrementCart } from "../../APIs/cartSlice";
import { descrementSaved } from "../../APIs/savedSlice";
const CardList = (props) => {
  const { setAlertFetching } = props;
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [Quantity, setQuantity] = useState(1);
  // const [mutateDeleteSavedProduct] = useDeleteSavedProduct();
  const [deleteSavedProduct] = useDeleteSavedProductMutation();
  const [addToCart] = useAddToCartMutation();
  const [deleteFromCart] = useDeleteFromCartMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
  const dispatch = useDispatch();
  const deleteProduct = (id) => {
    if (props.path === "/savedProducts") {
      deleteSavedProduct(id);
      dispatch(descrementSaved());
    } else {
      deleteFromCart(id);
      dispatch(DecrementCart());
    }
    setAlertFetching(true);
  };
  const inc = (id) => {
    updateQuantity({ product: id, Quantity: props.data.Quantity + 1 });
    setAlertFetching(true);
  };
  const dec = (id) => {
    updateQuantity({ product: id, Quantity: props.data.Quantity - 1 });
    setAlertFetching(true);
  };
  // useEffect(() => {
  //  setQuantity(props.data.Quantity)
  // }, [])

  return (
    <Container
      sx={{ maxHeight: "10%" }}
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { duration: 0.3 } }}
    >
      <Grid container textAlign="center">
        <Grid item xs={props.columns} sx={boxStyle}>
          <CardMedia
            component="img"
            src={`${imageBaseUrl}/${
              props?.data && props?.data?.product?.images[0]
            }`}
            sx={{ width: "50%" }}
          />
        </Grid>

        <Grid item xs={props.columns} sx={boxStyle}>
          <Typography sx={{ wordBreak: "break-word" }}>
            {props?.data && props?.data?.product?.title}
          </Typography>
        </Grid>
        {props.path === "/cart" && (
          <Grid item xs={props.columns} sx={boxStyle}>
            <ButtonGroup size="small" variant="contained">
              <Button
                variant="outlined"
                disabled={props.data.Quantity === 1}
                onClick={() => dec(props?.data?.product?._id)}
              >
                -
              </Button>
              <Button variant="outlined">{props.data?.Quantity}</Button>
              <Button
                variant="outlined"
                disabled={props?.data?.Quantity === 5}
                onClick={() => inc(props?.data && props?.data?.product?._id)}
              >
                +
              </Button>
            </ButtonGroup>
          </Grid>
        )}
        <Grid item xs={props.columns} sx={boxStyle}>
          <Typography sx={{ wordBreak: "break-word" }}>
            {props?.data && props?.data?.product?.price}
          </Typography>
        </Grid>
        {props.path === "/cart" && (
          <Grid item xs={props.columns} sx={boxStyle}>
            <Typography>
              {props?.data &&
                props?.data?.product?.price * props.data?.Quantity}
            </Typography>
          </Grid>
        )}
        <Grid item xs={props.columns} sx={boxStyle}>
          <Stack direction="row" sx={{ gap: 2 }}>
            <Box
              sx={{
                borderRadius: 2,
                padding: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                color: "white",
                background: "red",
                cursor: "pointer",
              }}
              onClick={() => {
                deleteProduct(props.data.product._id);
                setAlertFetching(true);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </Box>
            {props.path === "/savedProducts" && (
              <Box
                sx={{
                  borderRadius: 2,
                  padding: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  color: "white",
                  background: "#BF692D",
                  cursor: "pointer",
                }}
                onClick={() => {
                  addToCart({ product: props.data.product._id });
                  dispatch(incrementCart());
                }}
              >
                <ShoppingCartOutlinedIcon /> 12
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardList;
