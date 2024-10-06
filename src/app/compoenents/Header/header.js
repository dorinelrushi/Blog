"use client";
import React, { useState, useRef, useEffect } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";

function Header() {
  const { isSignedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop dropdown state
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // Mobile dropdown state
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileDropdown = () =>
    setIsMobileDropdownOpen(!isMobileDropdownOpen);

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
  }, [dropdownRef]);

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
    <div className="bg-[#ffffff] py-[15px] shadow-lg shadow-[#faf9f9]">
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
          <input type="checkbox" id="menu-toggle" className="hidden peer" />
          <label htmlFor="menu-toggle" className="cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>

          {/* Mobile Menu Items */}
          <div className="absolute left-0 right-0 top-[60px] bg-white shadow-md hidden peer-checked:block">
            <ul className="flex flex-col items-center py-4 list-none">
              {menuItems.map((item) =>
                item.show ? (
                  <li key={item.label} className="py-2 relative">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={toggleMobileDropdown}
                          className="focus:outline-none flex items-center gap-1"
                        >
                          {item.label} <FaAngleDown />
                        </button>
                        {isMobileDropdownOpen && (
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
        </div>
      </div>
    </div>
  );
}

export default Header;
