import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

function Offers() {
  return (
    <div>
      <div className="w-[90%] lg:w-[80%] m-auto ">
        <div>
          <h2 className="text-[34px] lg:text-[50px] mt-[60px] lg:mt-[-60px]">
            What We Offer
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-[30px] mt-[40px] lg:mt-[100px]">
          <div className="flex-1 bg-[#ffffff] border-[1px] border-[#e0dfdf] shadow-2xl shadow-[#ececec] p-[30px] rounded-[15px]">
            <h2 className="text-[25px] mb-[19px] font-medium ">
              Cryptocurrency Articles
            </h2>
            <p className="text-[18px] ">
              Learn the latest trends and secrets for success in the
              cryptocurrency market.
            </p>
            <div className="bg1Code w-[100%] h-[240px]   mt-[50px] rounded-[8px] mb-[50px] transition-all hover:rotate-2"></div>
            <Link
              href="/BlogPosts"
              className="flex items-center gap-[10px] hover:underline text-[20px]"
            >
              Learn More <HiArrowLongRight />
            </Link>
          </div>
          <div className="flex-1 bg-[#ffffff] border-[1px] border-[#e0dfdf] shadow-2xl shadow-[#ececec] p-[30px] rounded-[15px]">
            <h2 className="text-[25px] mb-[19px] font-medium">
              Next.js Tutorials
            </h2>
            <p className="text-[18px]">
              Valuable resources for developers looking to master Next.js
            </p>
            <div className="bg2Code  w-[100%] h-[240px]  mt-[50px] rounded-[8px] mb-[50px] transition-all hover:rotate-2"></div>
            <Link
              href="/BlogPosts"
              className="flex items-center gap-[10px] hover:underline text-[20px]"
            >
              Learn More <HiArrowLongRight />
            </Link>
          </div>
          <div className="flex-1 bg-[#ffffff] border-[1px] border-[#e0dfdf] shadow-2xl shadow-[#ececec] p-[30px] rounded-[15px]">
            <h2 className="text-[25px] mb-[19px] font-medium">Free API</h2>
            <p className="text-[18px]">
              Develop projects with our user-friendly and completely free API!
            </p>
            <div className="bg3Code w-[100%] h-[240px] rounded-[8px]  mt-[50px]  mb-[50px] transition-all hover:rotate-2"></div>
            <Link
              href="/BlogPosts"
              className="flex items-center gap-[10px] hover:underline text-[20px]"
            >
              Learn More <HiArrowLongRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
