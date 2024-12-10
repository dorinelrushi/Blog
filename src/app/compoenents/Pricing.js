import Link from "next/link";
import React from "react";

export default function Pricing() {
  return (
    <div>
      <div className="w-[90%]  lg:w-[80%] m-auto">
        <div>
          <h2 className="text-[38px] lg:text-[50px] font-semibold] text-center mt-[150px]">
            Pricing
          </h2>

          <p className="m-auto text-[17px] lg:text-[20px] text-center max-w-[320px] lg:max-w-[860px] mt-[30px]">
            Find the perfect website building package for your needs. Starting
            from just $119, our plans include responsive design, SEO
            optimization, and customization for Next.js, WordPress, or Shopify.
            Choose your plan and get started today!
          </p>
        </div>
        {/**/}
        <div className="w-[90%]  m-auto lg:w-[100%] flex items-start flex-col lg:flex-row  mt-[70px]   gap-[30px]">
          <div className="p-[30px] w-[100%]  rounded-[18px] bg-[#111111fd]  flex-1  border border-[#2f3030] ">
            <h2 className="text-[28px] max-w-[250px] font-normal mb-[20px]">
              Website Building with <span className="font-bold ">NextJs</span>
            </h2>

            {/* */}
            <div>
              <ul className="list p-0  m-0 flex  flex-col text-[#ffffff] gap-[15px] mb-[19px] list-none ">
                <li>✅ Website Development </li>
                <li>✅ SEO Landing Page Development</li>
                <li>✅ Portfolio Website Development</li>
                <li>✅ Business Landing Page</li>
                <li>✅ Blog Website Development</li>
              </ul>
            </div>
            {/* */}
            <div>
              <h2 className="text-[20px] max-w-[250px] font-normal mb-[20px]">
                From <span className="text-[40px] ">$199</span>
              </h2>
            </div>
            <Link
              href={"/Contact"}
              className="bg-[#4f7dfa] py-[10px] px-[10px] rounded-[8px] hover:bg-[#5c85f7]"
            >
              Order Now
            </Link>
          </div>
          <div className="p-[30px] w-[100%]  rounded-[18px] bg-[#111111fd]  flex-1  border border-[#2f3030] ">
            <h2 className="text-[28px] max-w-[250px] font-normal mb-[20px]">
              Website Building with{" "}
              <span className="font-bold ">Wordpress</span>
            </h2>
            {/* */}
            <div>
              <ul className="list p-0  m-0 flex  flex-col text-[#ffffff] gap-[15px] mb-[19px] list-none ">
                <li>✅ Product Landing Page Development </li>
                <li>✅ Shopify Store Customization</li>
                <li>✅ Landing Page Design</li>
                <li>✅ Business Landing Page</li>
                <li>✅ Website Development</li>
                <li>✅ Portfolio Website Development</li>
              </ul>
            </div>
            {/* */}
            <div>
              <h2 className="text-[20px] max-w-[250px] font-normal mb-[20px]">
                From <span className="text-[40px]">$119</span>
              </h2>
            </div>
            <Link
              href={"/Contact"}
              className="bg-[#4f7dfa] py-[10px] px-[10px] rounded-[8px] hover:bg-[#5c85f7]"
            >
              Order Now
            </Link>
          </div>
          <div className="p-[30px] w-[100%]  rounded-[18px] bg-[#111111fd]  flex-1  border border-[#2f3030] ">
            <h2 className="text-[28px] max-w-[250px] font-normal mb-[20px]">
              Website Building with <span className="font-bold ">Shopify</span>
            </h2>
            {/* */}
            <div>
              <ul className="list p-0  m-0 flex  flex-col text-[#ffffff] gap-[15px] mb-[19px] list-none ">
                <li>✅ Product Landing Page Development </li>
                <li>✅ Shopify Store Customization</li>
                <li>✅ Sales Funnel Page</li>
              </ul>
            </div>
            {/* */}
            <div>
              <h2 className="text-[20px] max-w-[250px] font-normal mb-[20px]">
                From <span className="text-[50px]">$229</span>
              </h2>
            </div>
            <Link
              href={"/Contact"}
              className="bg-[#4f7dfa] py-[10px] px-[10px] rounded-[8px] hover:bg-[#5c85f7]"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
