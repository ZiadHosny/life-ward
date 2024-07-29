import { useEffect, useState } from "react";
import { useGetAllCitiesQuery } from "../api/city.api";

export const useFetchAllCities = () => {
  const { data, isLoading, error } =
    useGetAllCitiesQuery("?limit=100");
  const [cities, setCities] = useState({ data: [], error: "" });

  useEffect(() => {
    if (data) {
      setCities({
        data: data.data,
        error: "",
      });
    } else {
      setCities({
        data: [],
        error: "",
      });
    }
  }, [data, error]);
  return { cities, isLoading };
};
