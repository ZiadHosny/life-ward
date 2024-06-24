import React from "react";
import NavTest from "../nav/NavTest";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <NavTest />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
