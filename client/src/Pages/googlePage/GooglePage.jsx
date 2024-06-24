import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "@mui/joy";
import { useLazyGetMeQuery } from "../../APIs/UserApis";
import { baseUrl } from "../../components/service";
import { setCurrentUser } from "../../APIs/userSlice";

const GooglePage = () => {
  const [getMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useLocation().pathname.concat(useLocation().search);
  useEffect(() => {
    fetch(`${baseUrl}/${name}`)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res?.data?.token);
        dispatch(setCurrentUser(res?.data?.user));
        getMe();
        setTimeout(() => {
          window.location.href = "/";
        }, 300);
      })
      .catch(() => {
        return <div className="loader"></div>;
      });
  }, [name]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <h1>A7A Sarri</h1>
      <div className="loader"></div>
    </Box>
  );
};

export default GooglePage;
