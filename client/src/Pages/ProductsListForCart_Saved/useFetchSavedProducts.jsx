import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import { setSaved } from "../../APIs/savedSlice";
export default function useFetchSavedProducts() {
  const [_, { language: lang }] = useTranslation();
  const [getAllSaved, { data, error: savedError, isSuccess }] =
    useLazyGetAllSavedProductsQuery();
  const [savedProducts, setSavedProducts] = useState([]);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  function getSaved() {
    if (localStorage.getItem("token")) {
      getAllSaved().then(({ data, error }) => {
        if (!error) {
          setSavedProducts(data?.products);
          setError("");
          dispatch(setSaved(data.products.length));
        } else {
          setError(
            lang === "en" ? error?.data?.error_en : error?.data?.error_ar
          );
          setSavedProducts([]);
        }
      });
    }
  }
  return { savedProducts, error, getSaved };
}
