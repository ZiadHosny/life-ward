import { useEffect, useState } from "react";
import { useLazyGetAllNeighborhoodsForSpecificCityQuery } from "../api/neighborhoods.api";
import { useTranslation } from "react-i18next";

export const useFetchNeighborhoodsByCityId = (cityId) => {
  const [_, { language }] = useTranslation();

  const [getAllSubCategoriesForSpecificCategory, { isLoading }] =
    useLazyGetAllNeighborhoodsForSpecificCityQuery("?limit=100");
  const [neighborhoods, setNeighborhoods] = useState({ data: [], error: "" });

  useEffect(() => {
    if (cityId) {
      getAllSubCategoriesForSpecificCategory({
        id: cityId,
        query: `limit=100`,
      })
        .unwrap()
        .then((res) => {
          setNeighborhoods({
            data: res.data,
            error: "",
          });
        })
        .catch((err) => {
          setNeighborhoods({
            data: [],
            error: err.data[`error_${language}`],
          });
        });
    } else {
      setNeighborhoods({
        data: [],
        error: "",
      });
    }
  }, [cityId]);
  return { neighborhoods, isLoading };
};
