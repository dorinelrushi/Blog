"use client";

import { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function DerivativesTickers() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [volumeData, setVolumeData] = useState([]);
  const [dailyChange, setDailyChange] = useState([]);
  const [liquidity, setLiquidity] = useState([]);

  const generateRandomVolumeData = (baseVolume) => {
    return Array.from(
      { length: 10 },
      () => baseVolume * (0.98 + Math.random() * 0.04)
    );
  };

  const generateRandomDailyChange = () => (Math.random() * 10 - 5).toFixed(2);
  const generateRandomLiquidity = () => Math.floor(Math.random() * 100);

  const fetchTrendingData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/derivatives/exchanges?x_cg_demo_api_key=CG-RXhcM4pqRLmh8Uu9Hy7rFY1j"
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const json = await response.json();
      setData(json);

      const initialVolumeData = json.map((item) =>
        generateRandomVolumeData(item.trade_volume_24h_btc)
      );
      setVolumeData(initialVolumeData);

      const initialDailyChange = json.map(() => generateRandomDailyChange());
      const initialLiquidity = json.map(() => generateRandomLiquidity());
      setDailyChange(initialDailyChange);
      setLiquidity(initialLiquidity);
    } catch (error) {
      setError(error.message);
    }
  };

  const getTrendColor = (volumeArray) => {
    const avgStart =
      volumeArray.slice(0, volumeArray.length / 2).reduce((a, b) => a + b, 0) /
      (volumeArray.length / 2);
    const avgEnd =
      volumeArray.slice(volumeArray.length / 2).reduce((a, b) => a + b, 0) /
      (volumeArray.length / 2);
    return avgEnd > avgStart ? "#0a84ff" : "#ff3b30";
  };

  useEffect(() => {
    fetchTrendingData();
    const intervalId = setInterval(fetchTrendingData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto mt-8">
      <div className="bg-white p-4 lg:p-8 rounded-lg  text-gray-800 mb-8">
        <h2 className="text-xl lg:text-3xl font-semibold text-center mb-4">
          Why This Data Matters
        </h2>
        <p className="text-sm lg:text-base text-center mb-6">
          Gain insights into the performance of leading cryptocurrency
          derivatives exchanges. Monitoring key indicators such as{" "}
          <span className="font-medium">Open Interest</span>,{" "}
          <span className="font-medium">24h Trade Volume</span>, and{" "}
          <span className="font-medium">Daily Change</span> can help you make
          informed decisions and stay ahead in the market.
        </p>
      </div>

      <div className="lg:hidden">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Established Year: {item.year_established || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Country: {item.country || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-bold">Open Interest</p>
                <p>{item.open_interest_btc.toLocaleString()} BTC</p>
              </div>
              <div>
                <p className="font-bold">24h Volume</p>
                <p
                  className={`${
                    item.trade_volume_24h_btc > 0
                      ? "text-[#0a84ff]"
                      : "text-[#ff3b30]"
                  }`}
                >
                  {item.trade_volume_24h_btc.toLocaleString()} BTC
                </p>
              </div>
            </div>
            <div className="mt-3">
              <Sparklines
                data={volumeData[index]}
                width={100}
                height={20}
                margin={5}
              >
                <SparklinesLine
                  color={getTrendColor(volumeData[index])}
                  style={{ strokeWidth: 1.5 }}
                />
              </Sparklines>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Logo
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Name
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Open Interest (BTC)
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Trade Volume 24h (BTC)
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Daily Change (%)
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Liquidity Index
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Established Year
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Country
              </th>
              <th className="px-6 py-4 font-medium text-left text-gray-500">
                Volume Chart
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  {item.open_interest_btc.toLocaleString()} BTC
                </td>
                <td
                  className={`px-6 py-4 ${
                    item.trade_volume_24h_btc > 0
                      ? "text-[#0a84ff]"
                      : "text-[#ff3b30]"
                  }`}
                >
                  {item.trade_volume_24h_btc.toLocaleString()} BTC
                </td>
                <td
                  className={`px-6 py-4 text-center ${
                    dailyChange[index] >= 0
                      ? "text-[#0a84ff]"
                      : "text-[#ff3b30]"
                  }`}
                >
                  {dailyChange[index]}%
                </td>
                <td
                  className={`px-6 py-4 text-center ${
                    liquidity[index] > 50 ? "text-[#0a84ff]" : "text-[#ff3b30]"
                  }`}
                >
                  {liquidity[index]}
                </td>
                <td className="px-6 py-4">{item.year_established || "N/A"}</td>
                <td className="px-6 py-4">{item.country || "N/A"}</td>
                <td className="px-6 py-4">
                  <Sparklines
                    data={volumeData[index]}
                    width={100}
                    height={20}
                    margin={5}
                  >
                    <SparklinesLine
                      color={getTrendColor(volumeData[index])}
                      style={{ strokeWidth: 1.5 }}
                    />
                  </Sparklines>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
