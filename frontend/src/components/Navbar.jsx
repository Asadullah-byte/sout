import React from "react";

const Navbar = () => {
  return (
    <nav className="w-1/2 flex justify-between items-center  ">
      {["Home", "About", "Contact"].map((item, idx) => (
        <a
          key={idx}
          href="#"
          className="relative text-base after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-700 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 hover:text-amber-700"
        >
          {item}
        </a>
      ))}
      <div className="pl-6 border-l-2 border-amber-100">
        <button className="ml-6 px-4 py-2 border border-amber-700 rounded-full text-amber-700 hover:bg-amber-700 hover:text-white transition-all duration-300">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
