import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header
      className="w-10/12 h-20 fixed top-4 left-28 z-[999] flex justify-around items-center px-6
  bg-black/5 backdrop-blur-md rounded-xl outline outline-amber-100 shadow-lg"
    >
      <img src="/logo.png" alt="Sout Logo" className="h-12" />
      <Navbar />
    </header>
  );
};

export default Header;
