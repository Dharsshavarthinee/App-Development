import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const layoutStyle = {
    paddingTop: '80px' 
  };

  return (
    <>
      <Header />
      <div style={layoutStyle}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
