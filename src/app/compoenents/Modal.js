"use client";

import { useEffect, useRef, useState } from "react";

export default function Modal({ coin, onClose, signal }) {
  const chartRef = useRef(null);
  const [theme, setTheme] = useState("light"); // Default theme is light

  useEffect(() => {
    // Embed TradingView widget
    if (chartRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js"; // TradingView library
      script.async = true;
      script.onload = () => {
        new TradingView.widget({
          container_id: "tradingview_chart",
          autosize: true,
          symbol: `BINANCE:${coin.symbol.toUpperCase()}USDT`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: theme, // Dynamic theme
          style: "1",
          locale: "en",
          toolbar_bg: theme === "light" ? "#f1f3f6" : "#2e2e2e", // Toolbar background matches theme
          enable_publishing: false,
          allow_symbol_change: true,
          details: true,
          studies: ["Moving Average@tv-basicstudies", "RSI@tv-basicstudies"],
        });
      };
      chartRef.current.innerHTML = ""; // Clear existing chart to apply new theme
      chartRef.current.appendChild(script);
    }
  }, [coin.symbol, theme]); // Re-run effect when theme changes

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[95%] lg:w-[70%] xl:w-[60%] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4 text-center">
          {coin.name} Trading Chart
        </h3>

        {/* Theme Toggle */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 mx-2 border rounded-lg ${
              theme === "light" ? "bg-[white] text-[black]" : "bg-gray-200"
            }`}
          >
            Light Theme
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 mx-2 border rounded-lg ${
              theme === "dark" ? "bg-[#141414] text-white" : "bg-gray-200"
            }`}
          >
            Dark Theme
          </button>
        </div>

        {/* TradingView Chart */}
        <div
          id="tradingview_chart"
          ref={chartRef}
          className="w-full h-[400px]"
        ></div>

        {/* Signal Display */}
        <div className="mt-4 text-center">
          <p className="text-lg font-bold">
            Signal:{" "}
            <span
              className={
                signal.type === "Buy"
                  ? "text-green-600"
                  : signal.type === "Sell"
                  ? "text-red-600"
                  : "text-yellow-600"
              }
            >
              {signal.type}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {signal.type === "Buy"
              ? "The price is increasing significantly. Consider buying."
              : signal.type === "Sell"
              ? "The price is dropping sharply. Consider selling."
              : "The market is stable. Hold your position."}
          </p>
        </div>
      </div>
    </div>
  );
}
