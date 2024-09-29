import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function Header() {
  const user = await currentUser();

  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Talent Board",
      path: "/Words",
      show: true,
    },
    {
      label: "My Blog",
      path: "/Blog",
      show: user,
    },
    {
      label: "Add Blog",
      path: "/AddBlog",
      show: user,
    },

    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
  ];

  return (
    <div className="bg-[#ffffff] py-[15px] shadow-lg shadow-[#faf9f9]">
      <div className="flex w-[80%] justify-between items-center m-auto">
        <Link href="/">
          <Image src="/monster.png" width={190} height={100} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center text-[16px] gap-[35px]">
          {menuItems.map((item) =>
            item.show ? (
              <Link key={item.label} href={item.path}>
                {item.label}
              </Link>
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
                  <li key={item.label} className="py-2">
                    <Link href={item.path}>{item.label}</Link>
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
