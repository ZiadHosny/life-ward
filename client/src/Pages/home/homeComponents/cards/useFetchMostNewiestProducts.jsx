import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMostNewiestProductsQuery } from "../../../../APIs/ProductApis";
import { unsetRefetch } from "../../../../APIs/refetchSlice";

function useFetchMostNewiestProducts() {
  const { refetching } = useSelector((state) => state.refetching);
  const {
    data,
    isSuccess,
    isError,
    isLoading,
    refetch: mostNewiestRefetch,
  } = useGetMostNewiestProductsQuery();
  console.log(data,'mostNewiestProductsmostNewiestProductsmostNewiestProductsmostNewiestProducts')
  const [mostNewiestProducts, setMostNewiestProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && !isError) {
      setMostNewiestProducts((_) => data?.data);
    }
    if (refetching) {
      mostNewiestRefetch();
      dispatch(unsetRefetch());
    }
  }, [isSuccess, refetching]);
  return { mostNewiestProducts, isLoading };
}

export default useFetchMostNewiestProducts;
