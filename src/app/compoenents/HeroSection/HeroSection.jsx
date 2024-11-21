import Image from "next/image";
import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <div className="mt-[15px] mb-[80px]">
      <div className="w-[96%] lg:w-[80%] m-auto bg-[#141414] rounded-[31px]  pb-[5px] lg:pb-[25px]">
        <div className="light"></div>
        <div className="p-[30px] lg:p-[0]">
          <h1 className="text-[white] text-center m-auto text-[30px] lg:text-[50px] leading-[46px] lg:leading-[65px] max-w-[980px]">
            Explore the Future of{" "}
            <span className="font-bold">Web Development</span> and{" "}
            <span className="font-bold">Crypto</span> with Our Free API Tools!
          </h1>
          <p className="text-[white] text-center text-[20px] lg:text-[22px] m-[20px]">
            Learn, build, and create with our resources for Next.js
          </p>
          <div className="flex flex-wrap justify-center items-center gap-[30px] text-[18px] lg:text-[22px] mt-[80px] pb-[25px] ">
            <Link
              href={"/TestApi"}
              className="bg-[white] px-[20px] py-[10px]  text-[#141414] rounded-[8px] hover:bg-[#e2e2e2]"
            >
              Explore the API
            </Link>
            <Link href={"/BlogPosts"} className="text-[white] text-d underline">
              Read News
            </Link>
          </div>
        </div>
        <div>
          <div className="bgCol hidden lg:block w-[96%] m-auto   rounded-[25px] mt-[90px]">
            <div className="flex flex-wrap justify-center lg:justify-between m-auto items-center gap-[25px] p-[30px]">
              <img
                src="/GOOGLE.svg"
                alt="google"
                style={{ width: "190px", height: "auto" }}
              />
              <img
                src="/COIN.svg"
                style={{ width: "200px", height: "auto" }}
                alt="Coin"
              />
              <img
                src="/BINANCE.svg"
                style={{ width: "190px", height: "auto" }}
                alt="vercel"
              />
              <img
                src="/vercel.svg"
                style={{ width: "180px", height: "auto" }}
                alt="vercel"
              />
              <img
                src="/BY.svg"
                style={{ width: "180px", height: "auto" }}
                alt="vercel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
