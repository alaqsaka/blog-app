import React from "react";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a
            className="mr-5 cursor-pointer font-medium hover:text-purple-600"
            href="/"
          >
            Home
          </a>

          <a className="mr-5 cursor-pointer font-medium hover:text-purple-600">
            <span className="ml-3 text-md font-extrabold">Blogging</span>
          </a>

          <a className="mr-5 cursor-pointer font-medium hover:text-purple-600">
            User
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
