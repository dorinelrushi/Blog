import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

function WebDev() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] m-auto mt-[50px] lg:mt-[120px] gap-[80px]">
        <div className="">
          <div>
            <h2 className="text-[25px] mb-[19px] font-medium ">
              Web Design and Development
            </h2>
            <p className="text-[18px] max-w-[850px] lg:max-w-[530px] ">
              At DevPromote, we create customized and optimized websites
              designed to meet your unique needs and goals. Our focus is on
              crafting visually appealing, responsive designs that provide an
              exceptional user experience across all devices. By combining clean
              coding practices with performance optimization and SEO-friendly
              structures, we ensure your website is fast, functional, and
              impactful. Let us help you build a site that elevates your brand
              and drives success.
            </p>
          </div>
          <div>
            <Link
              href="/Contact"
              className="flex rounded-[10px]  mt-[35px] w-[190px] text-center justify-center h-[50px] text-[white] bg-[#141414]  items-center  gap-[10px] hover:underline text-[20px]"
            >
              Learn More <HiArrowLongRight />
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/webdevelopment.png"
            width={900}
            height={100}
            alt="100"
            className="rounded-[21px]"
          />
        </div>
      </div>
    </div>
  );
}

export default WebDev;
