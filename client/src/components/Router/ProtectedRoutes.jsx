import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({ condition }) =>{

  useEffect(()=>{
      console.log('condition: ',condition)
  },[condition])

  return  condition ? <Outlet /> : <Navigate to="/" />;
}
  
export default ProtectedRoutes;
