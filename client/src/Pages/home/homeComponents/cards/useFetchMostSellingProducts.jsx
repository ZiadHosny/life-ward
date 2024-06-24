import React, { useEffect, useState } from "react";
import { useGetMostSellingProductsQuery } from "../../../../APIs/ProductApis";

const handleUniqueMostSelling = (mostSelling) => {
  let newProductsObj = {};
  let copyProducts = mostSelling
  let newProducts = [];
  copyProducts.forEach((product, index) => {
    console.log(product,'copyProductscopyProductscopyProductscopyProducts')
    if (!newProductsObj[product._id]) {
      newProductsObj[product._id] = product;
      newProducts.push(product);
    }
  });
  return newProducts;
};
function useFetchMostSellingProducts() {
  const {
    data,
    isSuccess,
    isError,
    isLoading,
    refetch: refetchMostSelling,
  } = useGetMostSellingProductsQuery();
  const [mostSellingProducts, setMostSellingProducts] = useState([]);
  useEffect(() => {
    if (isSuccess && !isError) { 
      console.log(data?.data,'dwaawwawfaw')
      let products = handleUniqueMostSelling(data.data);
      setMostSellingProducts((_) => products);
    }
  }, [isSuccess]);
  return {
    mostSellingProducts,
    refetchMostSelling,
    isLoading,
  };
}

export default useFetchMostSellingProducts;
