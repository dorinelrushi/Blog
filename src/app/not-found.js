import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className=" w-[80%] lg:w-[65%] m-auto mt-[150px] text-center ">
      <h1 className=" text-[50px] lg:text-[120px]">404</h1>
      <p className="text-[19px] lg:text-[28px]">Sorry, the page not found</p>
      <p className="mt-[10px] text-[16px] lg:text-[18px] max-w-[390px] m-auto text-[#646464] mb-[30px]">
        The link you followed probably broken or the page has been remove{" "}
      </p>
      <Link
        href="/"
        className="bg-[black] text-[white] py-[12px] rounded-[8px] hover:bg-[#141414] hover:shadow-2xl px-[25px]"
      >
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
