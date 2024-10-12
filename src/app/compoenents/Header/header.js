"use client";
import React, { useState, useRef, useEffect } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for hamburger and close

function Header() {
  const { isSignedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop dropdown state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const [isMobileAboutDropdownOpen, setIsMobileAboutDropdownOpen] =
    useState(false); // Mobile About dropdown state
  const dropdownRef = useRef(null);

  // Toggle desktop dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Toggle mobile menu and reset the About dropdown when menu is closed
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsMobileAboutDropdownOpen(false); // Close dropdown when menu closes
    }
  };

  // Toggle mobile About dropdown
  const toggleMobileAboutDropdown = () =>
    setIsMobileAboutDropdownOpen(!isMobileAboutDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close desktop dropdown on outside click
        setIsMobileAboutDropdownOpen(false); // Close mobile About dropdown on outside click
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "About",
      show: true,
      dropdown: [
        {
          label: "Our Mission",
          path: "/OurMission",
          show: true,
        },
      ],
    },
    {
      label: "Talent Board",
      path: "/Words",
      show: true,
    },
    {
      label: "How it Works",
      path: "/HowWorks",
      show: true,
    },
    {
      label: "Share",
      path: "/Share",
      show: true,
    },
    {
      label: "My Blog",
      path: "/Blog",
      show: isSignedIn,
    },
    {
      label: "Add Blog",
      path: "/AddBlog",
      show: isSignedIn,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !isSignedIn,
    },
  ];

  return (
    <div className="bg-[#ffffff] py-[23px]   relative z-[9999]">
      <div className="flex w-[80%] justify-between items-center m-auto">
        <Link href="/">
          <Image src="/dev.svg" width={200} height={100} alt="Logo" />
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
              <FiX className="w-6 h-6" /> // Close (X) icon when menu is open
            ) : (
              <FiMenu className="w-6 h-6" /> // Hamburger icon when menu is closed
            )}
          </button>

          {/* Mobile Menu Items */}
          {isMobileMenuOpen && (
            <div className="absolute left-0 right-0 top-[60px] bg-white shadow-md">
              <ul className="flex flex-col items-center py-4 list-none">
                {menuItems.map((item) =>
                  item.show ? (
                    <li key={item.label} className="py-2 relative">
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={toggleMobileAboutDropdown}
                            className="focus:outline-none flex items-center gap-1"
                          >
                            {item.label} <FaAngleDown />
                          </button>
                          {isMobileAboutDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-[150px] bg-white shadow-lg rounded-lg z-10">
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
