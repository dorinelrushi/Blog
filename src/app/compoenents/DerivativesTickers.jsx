"use client";

import { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function DerivativesTickers() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [volumeData, setVolumeData] = useState([]);
  const [dailyChange, setDailyChange] = useState([]);
  const [liquidity, setLiquidity] = useState([]);

  // Funksioni për të gjeneruar të dhëna të qëndrueshme për volumin me variacion të vogël
  const generateRandomVolumeData = (baseVolume) => {
    const randomData = Array.from(
      { length: 10 },
      () => baseVolume * (0.98 + Math.random() * 0.04) // variacion minimal për ndryshime të vogla
    );
    return randomData;
  };

  // Funksion për të gjeneruar ndryshim ditor në përqindje
  const generateRandomDailyChange = () => {
    return (Math.random() * 10 - 5).toFixed(2); // Ndryshim nga -5% deri në +5%
  };

  // Funksion për të gjeneruar një indeks të thjeshtë të likuiditetit
  const generateRandomLiquidity = () => {
    return Math.floor(Math.random() * 100); // Indeks likuiditeti nga 0 në 100
  };

  // Funksioni për të marrë të dhëna nga API
  const fetchTrendingData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/derivatives/exchanges?x_cg_demo_api_key=CG-RXhcM4pqRLmh8Uu9Hy7rFY1j"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      setData(json);

      // Gjenero të dhëna fillestare për grafikët e volumit
      const initialVolumeData = json.map((item) =>
        generateRandomVolumeData(item.trade_volume_24h_btc)
      );
      setVolumeData(initialVolumeData);

      // Gjenero të dhëna për ndryshimin ditor dhe likuiditetin
      const initialDailyChange = json.map(() => generateRandomDailyChange());
      const initialLiquidity = json.map(() => generateRandomLiquidity());
      setDailyChange(initialDailyChange);
      setLiquidity(initialLiquidity);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  // Funksioni për të përcaktuar ngjyrën e trendit bazuar në një mesatare lëvizëse
  const getTrendColor = (volumeArray) => {
    const avgStart =
      volumeArray.slice(0, volumeArray.length / 2).reduce((a, b) => a + b, 0) /
      (volumeArray.length / 2);
    const avgEnd =
      volumeArray.slice(volumeArray.length / 2).reduce((a, b) => a + b, 0) /
      (volumeArray.length / 2);

    return avgEnd > avgStart ? "#0a84ff" : "#ff3b30"; // Apple-styled blue for growth, red for decline
  };

  useEffect(() => {
    fetchTrendingData(); // Ngarko të dhënat fillestare

    const intervalId = setInterval(fetchTrendingData, 30000); // Rifresko të dhënat çdo 30 sekonda

    return () => clearInterval(intervalId);
  }, []);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-16">
      {/* Seksioni Informues */}
      <div className=" p-[25px] lg:p-20 rounded-[20px]   mb-8   text-gray-800">
        <h2 className=" text-[20px] lg:text-3xl font-semibold mb-4 text-center">
          Why This Data Matters
        </h2>
        <p className="text-[15px] lg:text-lg leading-relaxed text-center  m-auto mb-6">
          Gain insights into the performance of leading cryptocurrency
          derivatives exchanges. By monitoring key indicators such as{" "}
          <span className="font-medium">Open Interest</span>,
          <span className="font-medium"> 24h Trade Volume</span>, and{" "}
          <span className="font-medium">Daily Change</span>, you can make
          informed decisions and stay ahead in the market.
        </p>
        <div className="flex  justify-center space-x-8">
          <div className="text-center">
            <p className="font-bold text-2xl">Open Interest</p>
            <p className="text-sm text-gray-500">Measures market engagement</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl">24h Volume</p>
            <p className="text-sm text-gray-500">Indicates trading activity</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl">Daily Change</p>
            <p className="text-sm text-gray-500">Tracks market trends</p>
          </div>
        </div>
      </div>

      {/* Tabela e të dhënave */}

      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow">
        <thead className="border-b">
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
            <th className="px-6 py-4 font-medium text-left text-gray-500 hidden lg:table-cell">
              Daily Change (%)
            </th>
            <th className="px-6 py-4 font-medium text-left text-gray-500 hidden lg:table-cell">
              Liquidity Index
            </th>
            <th className="px-6 py-4 font-medium text-left text-gray-500 hidden lg:table-cell">
              Established Year
            </th>
            <th className="px-6 py-4 font-medium text-left text-gray-500 hidden lg:table-cell">
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
              <td className="px-[10px] py-[5px] object-cover">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[35px] h-[35px] rounded-[50px]"
                />
              </td>
              <td className="px-6 py-4 font-medium text-gray-800">
                {item.name}
              </td>
              <td className="px-6 py-4">
                {item.open_interest_btc.toLocaleString()} BTC
              </td>
              <td
                className={`px-6 py-4 font-semibold ${
                  item.trade_volume_24h_btc > 0
                    ? "text-[#0a84ff]"
                    : "text-[#ff3b30]"
                }`}
              >
                {item.trade_volume_24h_btc.toLocaleString()} BTC
              </td>
              <td
                className={`px-6 py-4 hidden lg:table-cell text-center ${
                  dailyChange[index] >= 0 ? "text-[#0a84ff]" : "text-[#ff3b30]"
                }`}
              >
                {dailyChange[index]}%
              </td>
              <td
                className={`px-6 py-4 hidden lg:table-cell text-center ${
                  liquidity[index] > 50 ? "text-[#0a84ff]" : "text-[#ff3b30]"
                }`}
              >
                {liquidity[index]}
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                {item.year_established || "N/A"}
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                {item.country || "N/A"}
              </td>
              <td className="px-6 py-4">
                <Sparklines
                  data={
                    volumeData[index] ||
                    generateRandomVolumeData(item.trade_volume_24h_btc)
                  }
                  width={80}
                  height={25}
                  margin={5}
                >
                  <SparklinesLine
                    color={getTrendColor(
                      volumeData[index] ||
                        generateRandomVolumeData(item.trade_volume_24h_btc)
                    )}
                    style={{ strokeWidth: 1.5 }}
                  />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
