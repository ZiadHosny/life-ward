import React, { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../../APIs/ProductApis";
const useFetchProducts = () => {
  const { data, isSuccess, isError } = useGetAllProductsQuery();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
 
  useEffect(() => {
    if (isSuccess && !isError) {
      setProducts(data?.products?.products);
     
      setError("");
    } else {
      setError("Error While Fetching Products");
    }
  }, [isSuccess]);
  return { products, error };
};

export default useFetchProducts;
