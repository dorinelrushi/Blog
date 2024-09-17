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
          <Image src="/monster.png" width={190} height={100} />
        </Link>
        <div className="flex items-center text-[16px] gap-[35px]">
          {menuItems.map((item) =>
            item.show ? (
              <Link key={item.label} href={item.path}>
                {item.label}
              </Link>
            ) : null
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default Header;
