import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Footer from "./Components/Footer";

function App() {
  
  return (
    <>
     <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
