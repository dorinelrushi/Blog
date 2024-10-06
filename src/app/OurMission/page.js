import Image from "next/image";
import React from "react";

function OurMission() {
  return (
    <div>
      <div>
        <div className="bg-[#2281FD] py-[60px] lg:py-[120px]">
          <div className="w-[90%] lg:w-[56%] m-auto">
            <h2 className="text-[32px] lg:text-[75px] leading-[45px] lg:leading-[92px] text-[white] max-w-[1020px] ">
              How <span className="font-bold ">DevPromote</span> Helps You Land
              Your Dream Job
            </h2>
            <div className="flex py-[10px] w-[240px] items-center rounded-[50px] px-[10px] mt-[39px] bg-[white] gap-[15px]">
              <div>
                <Image src="/dori.png" width={50} height={100} alt="dori" />
              </div>
              <div>
                <p className="text-[18px] font-bold ">Dorinel Rushi</p>
                <p className=" text-[14px]">CEO of DevPromote</p>
              </div>
            </div>
          </div>
        </div>
        {/* */}
        <div>
          <div className="w-[90%] lg:w-[56%] m-auto mt-[100px]">
            <div>
              <p className="text-[18px]">
                In today’s competitive job market, getting noticed by top
                companies can feel overwhelming. Whether you’re a web developer,
                designer, or digital marketer, crafting the perfect portfolio is
                just the beginning. The real challenge lies in connecting with
                companies that are actively seeking your talent.
              </p>
              <p className="text-[18px] mt-[60px]">
                That’s where DevPromote steps in. Our mission is simple: to help
                you showcase your skills and connect directly with companies
                that are looking for talent like yours.
              </p>
            </div>
            <div>
              <h2 className="text-[22px] lg:text-[30px]  mt-[100px] font-bold">
                What is DevPromote?
              </h2>
              <p className="text-[18px] mt-[30px]">
                DevPromote is a platform designed to promote professionals in
                the tech, design, and marketing industries by sending their
                portfolios to top companies around the world. Whether you’re a
                freelancer or looking for full-time opportunities, DevPromote
                can help you get noticed by the right employers.
              </p>
              <p className="text-[18px] mt-[60px]">
                We collaborate with industry-leading companies across multiple
                sectors, helping you reach potential employers who are actively
                seeking top talent.
              </p>
              <Image
                className="mt-[90px]"
                src="/Algorithm.svg"
                width={1006}
                height={100}
                alt="devpromote"
              />
            </div>

            <div>
              <h2 className="text-[22px] lg:text-[30px] mt-[100px] font-bold">
                Why Use DevPromote?
              </h2>
              <p className="text-[18px] mt-[30px]">
                At DevPromote, we take pride in connecting our users with
                companies that are at the forefront of innovation. Here are a
                few of the companies you’ll have access to when using our
                platform:
              </p>
              <div className="flex flex-col lg:flex-row  gap-[25px] mt-[60px]">
                <div className="shadow-2xl shadow-[#f1f0f0] border-[1px] rounded-[20px] p-[50px] bg-[#ffffff] text-[#4a4b4a]">
                  <div>
                    <h2 className="text-[20px] mb-[28px] font-bold">
                      1. Streamlined Process{" "}
                    </h2>
                    <p className="text-[16px] max-w-[1480px]">
                      With DevPromote, you don’t have to worry about sending
                      your portfolio to countless companies. We handle that for
                      you! Our platform directly connects your profile with
                      hiring managers, saving you time and effort.
                    </p>
                  </div>
                </div>
                <div className="shadow-2xl shadow-[#f1f0f0] border-[1px] rounded-[20px] p-[50px] bg-[#ffffff] text-[#4a4b4a]">
                  <div>
                    <h2 className="text-[20px] mb-[28px] font-bold">
                      2. Customized Portfolio Matching{" "}
                    </h2>
                    <p className="text-[16px] max-w-[1480px]">
                      We take the time to understand your unique skills and
                      career aspirations. DevPromote ensures that your portfolio
                      reaches companies that align with your goals, increasing
                      your chances of landing interviews.
                    </p>
                  </div>
                </div>
              </div>
              {/* */}
              <div className="flex flex-col lg:flex-row gap-[25px] mt-[25px]">
                <div className="shadow-2xl shadow-[#f1f0f0] border-[1px] rounded-[20px] p-[50px] bg-[#ffffff] text-[#4a4b4a]">
                  <div>
                    <h2 className="text-[20px] mb-[28px] font-bold">
                      3. Build Your Professional Network{" "}
                    </h2>
                    <p className="text-[16px] max-w-[1480px]">
                      Our partnerships with companies give you an edge in
                      expanding your professional network. You’ll gain access to
                      a wide range of job opportunities, including positions
                      that may not be publicly advertised.
                    </p>
                  </div>
                </div>
                <div className="shadow-2xl shadow-[#f1f0f0] border-[1px] rounded-[20px] p-[50px] bg-[#ffffff] text-[#4a4b4a]">
                  <div>
                    <h2 className="text-[20px] mb-[28px] font-bold">
                      4. Feedback to Improve Your Portfolio{" "}
                    </h2>
                    <p className="text-[16px] max-w-[1480px]">
                      Not only do we promote your portfolio, but we also offer
                      personalized feedback to ensure that your work stands out.
                      Our team of experts provides tips on how to make your
                      portfolio more appealing to hiring managers.
                    </p>
                  </div>
                </div>
              </div>
              {/* */}
              <div className="mb-[105px]">
                <h2 className="text-[22px] lg:text-[30px] mt-[100px] mb-[68px] font-bold">
                  How DevPromote Works
                </h2>
                <p className="text-[18px] mt-[30px]">
                  <span className="font-bold"> Send the Portfolio:</span> Send
                  the portfolio and we will review and put the name of the list
                  <br />
                  <br />
                  <span className="font-bold">Portfolio Review:</span> Our
                  experts will review your portfolio and provide feedback if
                  needed.
                  <br />
                  <br /> <span className="font-bold"> Promotion: </span> We
                  promote your portfolio to top companies in your field. <br />
                  <br />
                  <span className="font-bold">Get Noticed: </span> Start
                  receiving responses from companies interested in hiring you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
