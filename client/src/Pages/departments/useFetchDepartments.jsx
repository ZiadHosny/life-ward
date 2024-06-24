/* 

{{baseUrl}}/product/getAll/?attributes.key_en[eq]=size&attributes.values.en[in]=1000px&price[gte]=5&price[lte]=105
*/
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyGetAllProductsQuery } from "../../APIs/ProductApis";
const useFetchDepartments = (id) => {
  const [getAllProducts, { isLoading }] = useLazyGetAllProductsQuery();
  const [_, { language: lang }] = useTranslation();
  const [products, setProducts] = useState([]);
  const [productsError, setError] = useState("");

  useEffect(() => {
    getAllProducts(id).then(({ error, data }) => {
      if (error) {
        setError(error?.data[`error_${lang}`]);
        setProducts([]);
      } else {
        setProducts(data?.data);
        setError("");
      }
    });
  }, [id]);
  return { products, error: productsError, isLoading };
};

export default useFetchDepartments;
