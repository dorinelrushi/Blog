"use client";
import Image from "next/image";
import React, { useState } from "react";

function SectionWorks() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

  return (
    <div>
      <div className="w-[90%] lg:w-[56%] m-auto">
        <h2 className="text-[30px] lg:text-[70px] font-extrabold mt-[25px] text-center">
          How It Will Work
        </h2>
        {/* section one */}
        <div className="flex flex-col sm:flex-col lg:flex-row mt-[100px] justify-between gap-[50px]">
          <div>
            <p className="md:text-[16px] lg:text-[18px] max-w-[690px]">
              <span className="font-bold">Selection Process:</span> All
              participants will be selected based on their CVs or portfolios,
              which they submit. Those chosen will be added to the platform by
              me, with a price I deem appropriate for investing in their
              promotion and making their ranking and visibility as effective as
              possible.
            </p>
          </div>
          <div>
            <Image
              src="/cv.svg"
              width={600}
              height={1000}
              alt="dorinel"
              className="object object-cover"
            />
          </div>
        </div>
        {/* section two */}
        <div className="flex flex-col-reverse sm:flex-col lg:flex-row mt-[100px] justify-between gap-[50px]">
          <div>
            <Image
              src="/blogs.svg"
              width={600}
              height={1000}
              alt="dorinel"
              className="object object-cover"
            />
          </div>
          <div>
            <p className="md:text-[16px] lg:text-[18px] max-w-[690px]">
              <span className="font-bold">Weekly Promotion:</span> Each week,
              the top individual on the list will be promoted through a
              dedicated blog post on this website. We will then share their
              profile with a network of companies that are seeking talent,
              leveraging our collaborations with various organizations that
              offer positions aligned with your skills, ensuring you secure a
              job once you meet all the requirements.
            </p>
          </div>
        </div>
        {/* section three */}
        <div className="flex flex-col sm:flex-col lg:flex-row mt-[100px] justify-between gap-[50px]">
          <div>
            <p className="md:text-[16px] lg:text-[18px] max-w-[690px]">
              <span className="font-bold">Broader Exposure:</span> Since not
              everyone can be ranked first on the list, especially within a
              short time frame, I will also advertise five additional people
              from the list on social media platforms, including Instagram,
              LinkedIn, YouTube, and others, to help balance the exposure.
            </p>
          </div>
          <div>
            <Image
              src="/share.svg"
              width={600}
              height={1000}
              alt="dorinel"
              className="object object-cover"
            />
          </div>
        </div>

        {/* Extra content with show more functionality */}
        <div className="mt-[100px]">
          <h2
            className="text-[#2380FA] text-[26px] lg:text-[60px] max-w-[700px] font-semibold leading-[38px]
           lg:leading-[73px]"
          >
            Ensuring Fair Competition and Equal Access on the Platform
          </h2>
          <div className="showMore">
            <div
              className={`transition-all duration-500 overflow-hidden ${
                showMore ? "max-h-[1000px]" : "max-h-[200px]"
              }`}
            >
              <p className="md:text-[16px] lg:text-[18px] mt-[45px] mb-[30px]">
                <span className="font-bold">
                  {" "}
                  1. Maintaining a Balanced and Competitive Ecosystem Preventing
                  Monopoly:{" "}
                </span>
                Allowing users to set their own promotion prices could lead to
                some users setting excessively high prices or leveraging large
                investments from their networks. This would create an uneven
                playing field where those with more financial resources dominate
                the platform, leaving others at a disadvantage. Setting a fixed
                minimum price prevents this imbalance, ensuring everyone has a
                fair shot at promotion and visibility. <br />
                <br />
                Example: If a user sets a promotion price at $50 and receives
                significant backing, they could stay at the top for an extended
                period. This would make it nearly impossible for users with
                fewer resources to compete, undermining the platform's fairness
                and accessibility.
              </p>
              {showMore && (
                <div>
                  <p className="md:text-[16px] lg:text-[18px] mt-[45px] mb-[30px]">
                    <span className="font-bold">
                      2. Ensuring Equal Access and Opportunity Equal Opportunity
                      for Promotion:
                    </span>{" "}
                    By setting a low minimum investment (such as $5), the
                    platform ensures that every user, regardless of budget, has
                    the opportunity to gain visibility and promotion. This
                    encourages participation and engagement, allowing even those
                    with smaller budgets to be equally competitive and stand out
                    based on their skills and achievements, not just their
                    financial investment. <br />
                    <br /> Example: A user with a smaller budget can still
                    invest $5 to increase their visibility. With everyone
                    working within the same minimum investment, the competition
                    becomes about talent and quality rather than financial
                    capability, making the platform more inclusive.
                  </p>
                  <p className="md:text-[16px] lg:text-[18px] mt-[45px] mb-[30px]">
                    <span className="font-bold">
                      {" "}
                      3. Encouraging Healthy and Fair Competition Promoting a
                      Fair Environment:{" "}
                    </span>
                    A fixed minimum investment like $5 fosters a healthy
                    competition where all users start on an equal footing. This
                    encourages users to focus on showcasing their talents and
                    portfolios to move up the rankings rather than relying
                    solely on financial investment. It also motivates
                    participation without creating pressure for higher spending.
                    <br />
                    <br />
                    Example: When everyone is working within the same
                    parameters, users will prioritize improving their portfolios
                    and CVs to stand out. The focus remains on their abilities
                    and accomplishments rather than the amount of money they can
                    spend, creating a space where talent takes precedence over
                    resources.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={toggleShowMore}
              className="text-[#2380FA] font-bold mt-4"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionWorks;
