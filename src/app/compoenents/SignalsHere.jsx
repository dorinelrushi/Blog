"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function SignalsHere() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [signals, setSignals] = useState({});

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const coins = await response.json();

        const generatedSignals = {};
        coins.forEach((coin) => {
          generatedSignals[coin.id] = generateSignal(
            coin.price_change_percentage_24h || 0,
            coin.total_volume
          );
        });
        setSignals(generatedSignals);
        setData(coins);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCoins();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const openModal = (coin) => {
    setSelectedCoin(coin);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCoin(null);
    setShowModal(false);
  };

  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const generateSignal = (priceChange, volume) => {
    if (priceChange > 5 && volume > 1000000)
      return { type: "Buy", confidence: "90%" };
    if (priceChange > 2) return { type: "Buy", confidence: "70%" };
    if (priceChange < -5) return { type: "Sell", confidence: "90%" };
    if (priceChange < -2) return { type: "Sell", confidence: "70%" };
    return { type: "Hold", confidence: "50%" };
  };

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (data.length === 0) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Cryptocurrency Market Data
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={handleSearch}
          className="w-full bg-[#111111fd] px-4 py-2 border border-[#252525] rounded-[5px] "
        />
      </div>

      {/* Box layout for mobile */}
      <div className="block lg:hidden">
        {filteredData.map((coin, index) => {
          const signal = signals[coin.id];
          return (
            <div
              key={coin.id}
              className="bg-[#111111fd]  rounded-[15px] border border-[#2b2a2a] p-4 mb-4"
            >
              <div className="flex items-center space-x-4">
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                <div>
                  <h3 className="text-lg font-semibold">{coin.name}</h3>
                  <p className="text-sm text-gray-500">#{index + 1}</p>
                </div>
              </div>
              <p className="mt-2">
                <strong>Price:</strong> ${coin.current_price.toFixed(2)}
              </p>
              <p
                className={`mt-1 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <strong>24h Change:</strong>{" "}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="mt-1">
                <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
              </p>
              <p className="mt-1">
                <strong>Signal:</strong>{" "}
                <span
                  className={`${
                    signal?.type === "Buy"
                      ? "text-green-600"
                      : signal?.type === "Sell"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {signal?.type} ({signal?.confidence})
                </span>
              </p>
              <button
                onClick={() => openModal(coin)}
                className="mt-4 rounded-[5px] bg-[#4f7dfa] text-white px-4 py-2  w-full"
              >
                View Chart
              </button>
            </div>
          );
        })}
      </div>

      {/* Table for Desktop */}
      <div className="hidden lg:block">
        <table className="min-w-full   rounded-lg shadow-md overflow-hidden">
          <thead className="bg-[#111111fd] border-b border-b-[#272727]">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Coin</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">24h Change</th>
              <th className="px-4 py-3 text-left">Market Cap</th>
              <th className="px-4 py-3 text-left">Signal</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((coin, index) => {
              const signal = signals[coin.id];
              return (
                <tr
                  key={coin.id}
                  className="bg-[#111111fd] border-b border-b-[#272727] hover:bg-[#292b35fd]"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span>{coin.name}</span>
                  </td>
                  <td className="px-4 py-2">
                    ${coin.current_price.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`${
                        signal?.type === "Buy"
                          ? "text-green-600"
                          : signal?.type === "Sell"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {signal?.type} ({signal?.confidence})
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(coin)}
                      className="bg-[#4f7dfa] text-white px-4 py-2 rounded-[5px]"
                    >
                      View Chart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && selectedCoin && (
        <Modal
          coin={selectedCoin}
          onClose={closeModal}
          signal={signals[selectedCoin.id]}
        />
      )}
    </div>
  );
}
