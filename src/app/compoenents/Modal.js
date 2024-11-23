"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Modal({ coin, onClose }) {
  const [timeFrame, setTimeFrame] = useState("24h");
  const [chartData, setChartData] = useState([]);
  const [signal, setSignal] = useState("Hold");

  // Generating chart data based on the selected timeframe
  const generateChartData = () => {
    let data = coin.sparkline_in_7d.price; // Default: 7 days data
    if (timeFrame === "24h") {
      data = coin.sparkline_in_7d.price.slice(-24); // Last 24 hours
    } else if (timeFrame === "1m") {
      data = coin.sparkline_in_7d.price.slice(-30 * 24); // Simulate 1 month (approx.)
    } else if (timeFrame === "1y") {
      data = coin.sparkline_in_7d.price.slice(-365 * 24); // Simulate 1 year (approx.)
    }
    return data.map((price, index) => ({
      x: new Date().getTime() + index * 3600 * 1000, // Adding hourly intervals
      y: price,
    }));
  };

  // Calculate signals based on price changes
  const calculateSignal = () => {
    const prices = chartData.map((point) => point.y);
    if (prices.length < 2) return "Hold";

    const priceChange =
      ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100;

    if (priceChange > 5) return "Buy";
    if (priceChange < -5) return "Sell";
    return "Hold";
  };

  // Update chart data and signal whenever timeframe changes
  useEffect(() => {
    const data = generateChartData();
    setChartData(data);
    setSignal(calculateSignal());
  }, [timeFrame]);

  const chartOptions = {
    chart: {
      type: "line",
      height: 400,
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      enabled: true,
    },
    grid: {
      borderColor: "#e0e0e0",
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] lg:w-[70%] xl:w-[60%] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 font-bold text-xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4 text-center">
          {coin.name} Chart
        </h3>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-4">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="1m">1 Month</option>
            <option value="1y">1 Year</option>
          </select>
        </div>

        {/* Chart */}
        <ApexChart
          options={chartOptions}
          series={[{ data: chartData, name: coin.name }]}
          type="line"
          height={400}
        />

        {/* Signal */}
        <p className="mt-4 text-lg font-medium text-center">
          Signal:{" "}
          <span
            className={
              signal === "Buy"
                ? "text-green-600"
                : signal === "Sell"
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {signal}
          </span>
        </p>

        {/* Additional Info for Signal */}
        <p className="text-sm text-gray-500 text-center mt-2">
          {signal === "Buy"
            ? "The price is increasing significantly. Consider buying."
            : signal === "Sell"
            ? "The price is dropping sharply. Consider selling."
            : "The market is stable. Hold your position."}
        </p>
      </div>
    </div>
  );
}
