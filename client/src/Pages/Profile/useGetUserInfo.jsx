import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useGetMeQuery, useLazyGetMeQuery } from "../../APIs/UserApis";
import { useNavigate } from "react-router-dom";

export default function useGetUserInfo() {
  const [_, { language: lang }] = useTranslation();
  const { data, isSuccess, isError, error } = useGetMeQuery();

  const [userinfo, setUserInfo] = useState();
  useEffect(() => {
    if (isSuccess && !isError) {
    
      setUserInfo({ user: data?.user, error });
    }
  }, [isSuccess,isError]);
  return { userinfo };
}
