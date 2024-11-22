"use client";
import { useEffect, useState } from "react";

export default function Allcoins() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": "CG-RXhcM4pqRLmh8Uu9Hy7rFY1j",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setError(error.message);
      }
    };

    fetchCoinData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = data.filter((coin) =>
      coin.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (data.length === 0)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Cryptocurrency Market Data
      </h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Table for Large Screens */}
      <div className="hidden lg:block">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                #
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Coin
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Price
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                24h
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                24h Volume
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Circulating Supply
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Total Supply
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((coin, index) => (
              <tr
                key={coin.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-semibold">{coin.name}</span>
                </td>
                <td className="px-4 py-2">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-2 font-medium ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="px-4 py-2">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {coin.circulating_supply.toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {coin.total_supply?.toLocaleString() ?? "N/A"}
                </td>
                <td className="px-4 py-2">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredData.map((coin, index) => (
          <div
            key={coin.id}
            className="border rounded-lg p-4 bg-white shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="font-semibold text-lg">{coin.name}</h3>
            </div>
            <p className="mt-2 text-sm">
              <span className="font-medium">Price:</span> $
              {coin.current_price.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <span className="font-medium">24h Change:</span>{" "}
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className="text-sm">
              <span className="font-medium">24h Volume:</span> $
              {coin.total_volume.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Circulating Supply:</span>{" "}
              {coin.circulating_supply.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Total Supply:</span>{" "}
              {coin.total_supply?.toLocaleString() ?? "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Market Cap:</span> $
              {coin.market_cap.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
