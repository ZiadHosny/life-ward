import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { savedHeader, cartHeader } from "./ProductsListForCart_Saved.data";
import { useTranslation } from "react-i18next";
import CardList from "../../components/cards/CardLis";
import { Link, useLocation } from "react-router-dom";
// import useFetchSavedProducts from "./useFetchSavedProducts";
// import useFetchCart from "../cart/useFetchCart";
import { useGetAllCartsQuery } from "../../APIs/cartApi";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { colors } from "../home/homeStyle";
const ProductsListForCart_Saved = () => {
  const path = useLocation().pathname;
  const [_, { language }] = useTranslation();
  // const { savedProducts, error:savedProductError } = useFetchSavedProducts();
  const { data: savedProducts, isError: isErrSaved } =
    useGetAllSavedProductsQuery();
  const { data: carts, isError: isErrCart } = useGetAllCartsQuery();

  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [err, setErr] = useState(false);

  // let header ;
  useEffect(() => {
    if (path === "/cart") {
      setHeader(cartHeader);
      setData(carts?.cart);
      setErr(isErrCart);
    } else if (path === "/savedProducts") {
      setHeader(savedHeader);
      setData(savedProducts?.products);
      setErr(isErrSaved);
    }
  }, [carts, savedProducts, isErrCart, isErrSaved]);
  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Paper elevation={10} sx={{ paddingY: 5, minWidth:'650px' }}>
        <Grid container mb={3}>
          {header &&
            header.map((item) => (
              <Grid item xs={12 / header.length} key={item.en}>
                <Typography fontWeight="bold" textAlign="center">
                  {language === "en" ? item.en : item.ar}
                </Typography>
              </Grid>
            ))}
        </Grid>
        <Divider />
        <Box sx={{ ">*:nth-of-type(2n)": { background: " #f5f5f0" } }}>
          {data &&
            !err &&
            data.map((product) => (
              <Box p={5}>
                <CardList
                  columns={12 / header?.length}
                  path={path}
                  data={product}
                />
              </Box>
            ))}
          {err &&
            (path === "/savedProducts" ? (
              <Typography variant="h5" color="error"></Typography>
            ) : (
              "cart error"
            ))}
          {path === "/cart" && (
            <Link to='/checkout' style={{textDecoration:'none', color:'black', margin:'40%'}}>
              <Button variant="contained" sx={{background:colors.lightMainColor}}>{language === 'en' ? 'Checkout' : 'الدفع'}</Button>
            </Link>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductsListForCart_Saved;
