import { Box, Container, Grid, Typography } from "@mui/material";



import { imageBaseUrl } from "../../App";
import CustomAction from "./Item/customAction/CustomAction";



export  function Item({ product, index, path }) {

  return (
    <>
      <Grid
        className="SavedHeader"
        container
        sx={{ background: "#f1f1f1", display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} sm={6} lg={3}>
          <img
            src={imageBaseUrl + product?.images[0]}
            alt=""
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography>{product?.title}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography>{product?.price}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <CustomAction path={path} />
        </Grid>
      </Grid>
    </>
  );
}


function ItemList({ path, data }) {
  const { items, error } = data;

  return (
    <Container sx={{ textAlign: "center" }}>
      
      <Grid className="SavedHeader" container mb={10}>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography>Image</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography>ProductName</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Typography>Price</Typography>
        </Grid>
        {path === "/cart" && (
          <Grid item xs={12} sm={6} lg={3}>
            <Typography>Quantity</Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6} lg={3}>
          <Typography>Action</Typography>
        </Grid>
      </Grid>
      {!error && items[0] ? (
        items.map(({ product }, index) => {
          return <Item key={index} product={product} path={path} />;
        })
      ) : (
        <Box>
          <Typography>{error}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default ItemList;
