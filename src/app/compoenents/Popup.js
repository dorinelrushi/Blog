"use client";
// components/Popup.js
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaBitcoin, FaDollarSign } from "react-icons/fa";
import { TbCurrencyXrp } from "react-icons/tb";
import { SiSolana } from "react-icons/si";

export default function Popup({ onClose }) {
  const popupRef = useRef();

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3838385d] z-[88888] p-4">
      <div
        ref={popupRef}
        className="relative bg-[#1d1e33] border-[3px] border-[#464ee4] rounded-[20px] p-[30px] w-[95%] lg:w-[40%] text-white shadow-lg transform transition-all duration-500 ease-in-out"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <IoClose size={25} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Support the Blog with Crypto
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Click on an address to copy and support us with a crypto donation.
        </p>

        <div className="space-y-3 text-center">
          <div className="flex flex-col items-center space-y-2 rounded-[10px] border-[1px] border-[#313a57] bg-[#202238] p-[22px]">
            <div className="flex items-center space-x-2">
              <FaBitcoin className="text-yellow-500 text-[25px]" />
              <p className="font-semibold text-white">BTC</p>
            </div>
            <p
              onClick={() =>
                handleCopy("bc1q0y8p9d9g5awyf3mwe3mvg4ej2sx3gwsjtvv8er")
              }
              className="cursor-pointer text-blue-400 hover:underline break-all"
            >
              bc1q0y8p9d9g5awyf3mwe3mvg4ej2sx3gwsjtvv8er
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-[10px] border-[1px] border-[#313a57] bg-[#202238] p-[22px]">
            <div className="flex items-center space-x-2">
              <SiSolana className="text-indigo-500 text-[25px]" />
              <p className="font-semibold text-white">SOL</p>
            </div>
            <p
              onClick={() =>
                handleCopy("3fwzPhtCtxzTuVkGCtBTkMZq1kgDUzXrK2ddemKqfr7j")
              }
              className="cursor-pointer text-blue-400 hover:underline break-all"
            >
              3fwzPhtCtxzTuVkGCtBTkMZq1kgDUzXrK2ddemKqfr7j
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-[10px] border-[1px] border-[#313a57] bg-[#202238] p-[22px]">
            <div className="flex items-center space-x-2">
              <TbCurrencyXrp className="text-white text-[25px]" />
              <p className="font-semibold text-white">XRP</p>
            </div>
            <p
              onClick={() => handleCopy("rnwwWUtSgF6DKnVa9KA7mN3izx4TPkMjE6")}
              className="cursor-pointer text-blue-400 hover:underline break-all"
            >
              rnwwWUtSgF6DKnVa9KA7mN3izx4TPkMjE6
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 rounded-[10px] border-[1px] border-[#313a57] bg-[#202238] p-[22px]">
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-green-500 text-[25px]" />
              <p className="font-semibold text-white">USDT</p>
            </div>
            <p
              onClick={() => handleCopy("TTgA6VQSvzqSHLFZ4WBJYjgB2FVV8LZG46")}
              className="cursor-pointer text-blue-400 hover:underline break-all"
            >
              TTgA6VQSvzqSHLFZ4WBJYjgB2FVV8LZG46
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
