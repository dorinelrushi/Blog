import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

function Projects() {
  return (
    <div className="mba mt-[120px] mb-[80px] ">
      <h2 className="text-[38px] lg:text-[50px] font-semibold] text-center mt-[150px]">
        Our Projects
      </h2>

      <p className="m-auto text-[17px] lg:text-[20px] text-center max-w-[320px] lg:max-w-[860px] mt-[30px]">
        Welcome to our project showcase! Here, you'll find a collection of our
        recent work
      </p>

      <div className="flex mt-[50px] flex-col md:flex-row w-[90%] md:w-[80%] lg:w-[50%] m-auto gap-[30px]">
        <div className="social10 w-full md:w-[100%] h-[550px] rounded-[25px]">
          <div>
            <h2 className="text-[30px] font-bold">Behance Portfolio</h2>
            <p className="max-w-[320px] m-auto">
              You can see my portfolio for every clients I worked
            </p>
          </div>
          <div>
            <Link href="https://www.behance.net/dorinelrushi">
              <div className="blurI flex min-w-full">
                <h2 className="text-[15px] ml-[20px] text-[#c5c5c5]">
                  Visit the portfolio
                </h2>
                <div className="icon rounded-[50px] p-[8px] text-[20px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="social11 h-[550px] w-full md:w-[100%] rounded-[25px]">
          <div>
            <h2 className="text-[30px] font-bold">Dribble Portfolio</h2>
            <p className="max-w-[320px] m-auto">
              You can see My portfolio for every clients I worked
            </p>
          </div>
          <div>
            <Link href="https://dribbble.com/dorinelrushi123">
              <div className="blurI flex min-w-full">
                <h2 className="text-[15px] ml-[20px] text-[#c5c5c5]">
                  Visit the portfolio
                </h2>
                <div className="icon rounded-[50px] p-[8px] text-[20px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* third */}
      <div className="social12 w-[90%] md:w-[80%] lg:w-[50%] mt-[30px] m-auto h-[600px] rounded-[25px]">
        <div>
          <h2 className="text-[30px] font-bold">LinkedIn</h2>
          <p className="max-w-[320px] m-auto">
            Discover my professional journey and client success stories on
            LinkedIn
          </p>
        </div>
        <div>
          <div className="text-center">
            <Link href="https://www.linkedin.com/in/dorinel-rushi-470a9b229/">
              <div className="blurI flex min-w-full">
                <h2 className="text-[15px] ml-[20px] text-[#c5c5c5]">
                  Contact Us
                </h2>
                <div className="icon rounded-[50px] p-[8px] text-[20px]">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* */}
    </div>
  );
}

export default Projects;
