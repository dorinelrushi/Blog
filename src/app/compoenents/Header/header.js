"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth, UserButton } from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { label: "Home", path: "/", show: true },
    {
      label: "Crypto",
      dropdown: [
        { label: "Coins", path: "/Coins", show: true },
        { label: "Derivatives", path: "/Derivatives", show: true },
        { label: "Asset", path: "/Asset", show: true },
        { label: "Signals", path: "/Signals", show: true },
        { label: "Convert", path: "/Convert", show: true },
      ],
      show: true,
    },
    { label: "Blog", path: "/BlogPosts", show: true },
    { label: "API", path: "/TestApi", show: true },
    { label: "Contact", path: "/Contact", show: true },
    { label: "My Blog", path: "/Blog", show: isSignedIn },
    { label: "Login", path: "/sign-in", show: !isSignedIn },
  ];

  return (
    <div className="bg-[#ffffff] py-[23px] relative z-[9999]">
      <div className="flex w-[80%] justify-between items-center m-auto">
        <Link href="/">
          <img
            src="/dev.svg"
            style={{ width: "200px", height: "auto" }}
            alt="dev promote"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center text-[16px] gap-[35px] relative">
          {menuItems.map((item) =>
            item.show ? (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      className="focus:outline-none flex items-center gap-1"
                      onClick={toggleDropdown}
                    >
                      {item.label} <FaAngleDown />
                    </button>
                    {isDropdownOpen && (
                      <div
                        className="absolute left-0 mt-2 w-[150px] bg-white shadow-lg rounded-lg z-10"
                        ref={dropdownRef}
                      >
                        {item.dropdown.map((subItem) =>
                          subItem.show ? (
                            <Link
                              key={subItem.label}
                              href={subItem.path}
                              className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md"
                            >
                              {subItem.label}
                            </Link>
                          ) : null
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.path}>{item.label}</Link>
                )}
              </div>
            ) : null
          )}
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
          {isMobileMenuOpen && (
            <div className="absolute left-0 right-0 top-[60px] bg-white shadow-md">
              <ul className="flex flex-col items-center py-4">
                {menuItems.map((item) =>
                  item.show ? (
                    <li key={item.label} className="py-2 relative">
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={toggleDropdown}
                            className="focus:outline-none flex items-center gap-1"
                          >
                            {item.label} <FaAngleDown />
                          </button>
                          {isDropdownOpen && (
                            <div
                              className="absolute left-0 mt-2 w-[150px] bg-white shadow-lg rounded-lg z-10"
                              ref={dropdownRef}
                            >
                              {item.dropdown.map((subItem) =>
                                subItem.show ? (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.path}
                                    className="block px-4 py-2 text-black hover:bg-gray-100"
                                  >
                                    {subItem.label}
                                  </Link>
                                ) : null
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link href={item.path}>{item.label}</Link>
                      )}
                    </li>
                  ) : null
                )}
                <li className="py-2">
                  <UserButton afterSignOutUrl="/" />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
