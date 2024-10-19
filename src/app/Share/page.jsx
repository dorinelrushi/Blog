"use client"; // Add this since you're using Next.js with App Router, and form submission requires client-side handling.

import { useState } from "react";
import ReactCompareImage from "react-compare-image"; // Import React Compare Image for the before/after slider

export default function Share() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    url: "", // Portfolio link is handled by this key
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Email sent successfully!");
      } else {
        setMessage("Error sending email. Please try again.");
      }
    } catch (error) {
      setMessage("Error sending email. Please try again.");
    }
  };

  return (
    <div>
      {/* Form Section */}
      <div className="bg-[#2281FD] py-[120px] mb-[150px] relative">
        <div>
          <h2 className="text-[30px] lg:text-[60px] text-center text-white">
            Share Your{" "}
            <span className="font-bold">
              <span className="text-[#1c4185]">{"</"}</span>Portfolio
              <span className="text-[#1c4185]">{">"}</span>
            </span>
          </h2>
          <div className="absolute left-[50%] translate-x-[-50%] bottom-[-35px] shadow-lg rounded-[60px] bg-white py-[10px] px-[20px] flex justify-center gap-[10px] mt-[20px]">
            <div className="relative left-[-10px]">
              <img
                src="/devProm.svg"
                width={50}
                height={100}
                alt="Portfolio"
                className="object-fit"
              />
              <div className="w-[10px] h-[10px] bg-[#25d876] absolute right-[7px] bottom-[3px] rounded-full"></div>
            </div>
            <div className="relative left-[-10px]">
              <p className="text-black font-bold">DevPromote</p>
              <p className="text-[15px] text-gray-400">Company</p>
            </div>
          </div>
        </div>
      </div>
      {/* Form */}
      <div className="w-[90%] lg:w-[56%] m-auto mb-[100px]">
        <div>
          <h2 className="mb-[30px] text-[30px] ">Fill the Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-[30px]">
              <input
                type="text"
                className="w-[100%] bg-[#F8F8F8] border-[1px] border-[#DCDCDC] p-[15px] rounded-[8px]"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="w-[100%] bg-[#F8F8F8] border-[1px] border-[#DCDCDC] p-[15px] rounded-[8px]"
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <input
              type="email"
              className="w-[100%] mb-[30px] bg-[#F8F8F8] border-[1px] border-[#DCDCDC] p-[15px] rounded-[8px]"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="url"
              className="w-[100%] mb-[30px] bg-[#F8F8F8] border-[1px] border-[#DCDCDC] p-[15px] rounded-[8px]"
              name="url" // Updated to 'url' to match the state key
              placeholder="Portfolio Link"
              value={formData.url}
              onChange={handleChange}
              required
            />
            <br />
            <textarea
              name="description"
              className="w-[100%] resize-none mb-[30px] bg-[#F8F8F8] border-[1px] border-[#DCDCDC] p-[15px] rounded-[8px]"
              placeholder="Write about yourself"
              rows={8}
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 w-[190px] h-[50px] text-[20px]  rounded-[8px] text-white "
            >
              Send
            </button>
          </form>
          {message && <p className="mt-4 text-[#31a0eb]">{message}</p>}
        </div>
      </div>
      {/* Before/After Image Slider Section */}|
      <div className=" w-[100%]">
        <div className="w-[90%] lg:w-[56%] m-auto mb-[30px]">
          <ReactCompareImage
            leftImage="./Port2.jpg" // Use the paths to your uploaded images
            rightImage="./Port1.jpg"
            sliderPositionPercentage={0.5} // Set default position of the slider to be 50%
          />
        </div>
        <div className="w-[90%] lg:w-[56%] m-auto mb-[30px]">
          <ReactCompareImage
            leftImage="./Port3.jpg" // Use the paths to your uploaded images
            rightImage="./Port4.jpg"
            sliderPositionPercentage={0.5} // Set default position of the slider to be 50%
          />
        </div>
      </div>
      <div className=" w-[100%]">
        <div className="w-[90%] lg:w-[56%] m-auto mb-[30px]">
          <ReactCompareImage
            leftImage="./Port5.jpg" // Use the paths to your uploaded images
            rightImage="./Port6.jpg"
            sliderPositionPercentage={0.5} // Set default position of the slider to be 50%
          />
        </div>
      </div>
    </div>
  );
}
