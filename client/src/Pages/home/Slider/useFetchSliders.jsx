import ClassNameGenerator from "@mui/utils/ClassNameGenerator";
import React, { useEffect, useState } from "react";
import { useGetAllSlidersQuery } from "../../../APIs/SectionApis";
const useFetchSliders = () => {
  const { data, isSuccess, isError } = useGetAllSlidersQuery();
  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (isSuccess && !isError) {
      setSliders(data?.sections);
      setError("");
    } else {
      setError("Error While Fetching Sliders");
    }
  }, [isSuccess]);
  return { sliders, error };
};

export default useFetchSliders;
