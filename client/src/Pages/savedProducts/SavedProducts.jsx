import { Stack } from "@mui/material";
import React from "react";
import { useGetAllSavedProductsQuery } from "../../APIs/SavedProductApi";
import CustomError from "../../components/Error/Error";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";

function SavedProducts() {
  const [_, { language }] = useTranslation();

  const [saved, setSaved] = useState();

  const {data,isSuccess,error:errorSaved,isError:isErrorSaved,isLoading:loadingSaved}=useGetAllSavedProductsQuery()
  return <div>
   
  </div>
}

export default SavedProducts;
