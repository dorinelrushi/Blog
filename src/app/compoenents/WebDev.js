import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

function WebDev() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row w-[90%] lg:w-[80%] m-auto mt-[50px] lg:mt-[120px] gap-[80px]">
        <div className="relative">
          <div>
            <h2 className="text-[25px] mb-[19px] font-medium ">
              Cryptocurrency Articles
            </h2>
            <p className="text-[18px] ">
              Learn the latest trends and secrets for success in the
              cryptocurrency market.
            </p>
          </div>
          <div>
            <Link
              href="/Contact"
              className="flex absolute  bottom-[-52px] lg:bottom-[0px] items-end  gap-[10px] hover:underline text-[20px]"
            >
              Learn More <HiArrowLongRight />
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/webdevelopment.png"
            width={1000}
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
