import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../../APIs/categoriesApi";
const useFetchCategories = () => {
  const { data, isSuccess, isError } = useGetAllCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (isSuccess && !isError) {
      console.log('data in categories',data)
      setCategories(data?.data);
      setError("");
    } else {
      setError("Error While Fetching Products");
    }
  }, [isSuccess]);
  return categories;
};

export default useFetchCategories;
