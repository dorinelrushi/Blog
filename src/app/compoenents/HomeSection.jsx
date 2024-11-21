import Image from "next/image";
import React from "react";

function HomeSection() {
  return (
    <div className="w-[96%] lg:w-[80%] m-auto">
      <div className="mb-[40px] lg:mb-[100px] text-center">
        <h2 className="text-[38px] lg:text-[50px] font-semibold]">About Us</h2>
        <p className="m-auto text-[17px] lg:text-[20px] text-center max-w-[320px] lg:max-w-[860px] mt-[30px]">
          DevPromote is a platform that combines the power of Next.js, a passion
          for cryptocurrencies, and tailored web design solutions to help
          creators achieve their goals.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row  justify-between ">
        <div className="Left bg-[#141414] rounded-tl-[41px] rounded-tr-[41px] text-[white]  flex-1">
          <div className="p-[50px]">
            <h2 className="text-[30px] lg:text-[50px] mb-[30px]">Our Vision</h2>
            <p className="max-w-[600px] text-[17px] lg:text-[20px]">
              We aim to be the go-to platform for developers and businesses
              looking to stay ahead of trends in web development,
              cryptocurrencies, and{" "}
              <span className="font-bold">API integration</span>. By bridging
              the gap between education, tools, and practical application, we
              inspire innovation and growth.
            </p>
          </div>
        </div>
        <div className="Right flex-1">
          <div className="p-[50px]">
            <h2 className="text-[30px] lg:text-[50px] mb-[30px]">
              Career Growth
            </h2>
            <p className="max-w-[600px] text-[17px] lg:text-[20px] ">
              We strive to empower individuals by{" "}
              <span className="font-bold">connecting</span> their skills with
              the right opportunities, offering them a platform to showcase
              their talent, enhance their portfolios, and achieve their
              professional goals. Through guidance and exposure, we help unlock
              their full potential.
            </p>
          </div>
        </div>
      </div>

      <div className="flex  flex-col lg:flex-row justify-between items-start ">
        <div className="Left w-[100%] bg-[#141414] rounded-bl-[41px] text-[white] flex-1 relative">
          <div className="p-[50px]">
            <h2 className="text-[30px] lg:text-[50px] lg:mt-[-50px] mb-[30px]">
              Our Values
            </h2>
            <p className="max-w-[600px] text-[17px] lg:text-[20px]">
              <span className="font-bold">Innovation:</span> Continuously
              exploring new ideas to keep our content and services at the
              forefront of technology.
              <br />
              <br />
              <span className="font-bold">Quality:</span> Providing high-quality
              resources, services, and support that exceed expectations.
              <br />
              <br />
              <span className="font-bold">Community:</span> Building a network
              of like-minded creators, developers, and businesses to share
              knowledge and grow together.
            </p>
          </div>
          <img
            src="/Triangle2.svg"
            style={{ width: "50px", height: "auto" }}
            alt="dev"
            className="absolute right-[0px] lg:right-0 bottom-[-54px] "
          />
        </div>
        <div className="RightSection1 w-[99.9%]  lg:w-[100%] mt-[0px] lg:mt-[30px]  rounded-bl-[41px] rounded-tr-[41px] rounded-br-[41px] bg-[#141414] text-[white]  flex-1 relative">
          <img
            src="/Triangle1.svg"
            style={{ width: "50px", height: "auto" }}
            alt="dev"
            className="absolute top-[-54px] "
          />
          <div className="p-[60px]">
            <h2 className="mb-[35px] text-[30px] lg:text-[50px]">
              Why Choose Us?
            </h2>
            <p className="max-w-[600px] text-[17px] lg:text-[20px]">
              <span className="font-bold">Developer-Centric:</span> We
              understand the needs of developers because we are developers. Our
              resources are tailored to your technical challenges. <br />
              <br /> <span className="font-bold">
                Comprehensive Solutions:
              </span>{" "}
              From educational resources to practical tools and services, we
              provide everything you need in one place.
              <br />
              <br /> <span className="font-bold">Global Reach:</span> Serving
              creators and businesses worldwide, we’re committed to making
              digital growth accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
