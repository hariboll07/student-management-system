import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/InstituteLogo.svg";
import searchIcon from "../assets/search-icon.svg";
import menuIcon from "../assets/menu-Icon.svg";
import closeIcon from "../assets/closeIcon.svg";

const NavBar = ({ searchTerm, setSearchTerm }) => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${
        isScrolled
          ? "bg-[#99C299]/95 shadow-lg backdrop-blur-md py-3"
          : "bg-[#99C299] py-5"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-10">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Institute Logo" className="h-12" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-black">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="group flex flex-col font-medium"
            >
              {link.name}
              <span className="h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center gap-2 ml-20 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-72 bg-transparent outline-none placeholder-gray-500"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search Students by (name or phone)"
            />
            <img src={searchIcon} alt="Search" className="h-5 cursor-pointer" />
          </div>
        </div>

        {/* Mobile Menu Button (ONLY MENU ICON) */}
        <div className="md:hidden">
          <img
            src={menuIcon}
            alt="Menu"
            onClick={() => setIsMenuOpen(true)}
            className="h-6 cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#99C299] text-black flex flex-col
        items-center justify-center gap-8 text-lg font-medium
        transition-transform duration-500 md:hidden z-50
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-5 right-5"
        >
          <img src={closeIcon} alt="Close" className="h-6" />
        </button>

        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
