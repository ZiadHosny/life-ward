import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../../../APIs/ProductApis";
import { unsetRefetch } from "../../../../APIs/refetchSlice";

function useFetchDepartmentsProducts() {
  const { refetching } = useSelector((state) => state.refetching);
  const { isLoading, data, isSuccess, isError, refetch: departmentsProductsRefetch } = useGetAllProductsQuery();
  const [departmentsProducts, setDepartmentsProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && !isError) {
      setDepartmentsProducts((_) => data?.data);
    }
    if (refetching) {
      departmentsProductsRefetch();
      dispatch(unsetRefetch());
    }
  }, [isSuccess, refetching]);
  return { departmentsProducts, isLoading };
}

export default useFetchDepartmentsProducts;
