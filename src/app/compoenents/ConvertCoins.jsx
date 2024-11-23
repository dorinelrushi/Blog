"use client";
import { useEffect, useState } from "react";

export default function CryptoFiatConverter() {
  const [data, setData] = useState([]);
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [fiatCurrency, setFiatCurrency] = useState("usd");
  const [amount, setAmount] = useState("");
  const [convertedValue, setConvertedValue] = useState("");
  const [conversionRate, setConversionRate] = useState(null);
  const [conversionDirection, setConversionDirection] =
    useState("crypto-to-fiat");
  const [fiatRates, setFiatRates] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const cryptoResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false"
        );
        const fiatResponse = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );

        if (!cryptoResponse.ok || !fiatResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const cryptoJson = await cryptoResponse.json();
        const fiatJson = await fiatResponse.json();

        setData(cryptoJson);
        setFiatRates(fiatJson.rates);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchCoinData();
  }, []);

  useEffect(() => {
    if (cryptoCurrency && fiatCurrency && data.length > 0) {
      const coin = data.find((c) => c.id === cryptoCurrency);
      if (coin) {
        if (conversionDirection === "crypto-to-fiat") {
          const fiatRate = fiatRates[fiatCurrency.toUpperCase()];
          setConversionRate(coin.current_price * fiatRate);
        } else if (conversionDirection === "fiat-to-crypto") {
          const fiatRate = fiatRates[fiatCurrency.toUpperCase()];
          setConversionRate(1 / (coin.current_price * fiatRate));
        }
      }
    }
  }, [cryptoCurrency, fiatCurrency, conversionDirection, data, fiatRates]);

  const handleConversion = () => {
    if (!cryptoCurrency || !fiatCurrency || !amount) {
      setConvertedValue("Please fill all fields.");
      return;
    }

    const result = (amount * conversionRate).toFixed(
      conversionDirection === "crypto-to-fiat" ? 2 : 8
    );
    setConvertedValue(
      `${amount} ${
        conversionDirection === "crypto-to-fiat"
          ? cryptoCurrency.toUpperCase()
          : fiatCurrency.toUpperCase()
      } = ${result} ${
        conversionDirection === "crypto-to-fiat"
          ? fiatCurrency.toUpperCase()
          : cryptoCurrency.toUpperCase()
      }`
    );
  };

  const handleExchange = () => {
    setConversionDirection(
      conversionDirection === "crypto-to-fiat"
        ? "fiat-to-crypto"
        : "crypto-to-fiat"
    );
    setConvertedValue(""); // Clear the result when switching direction
  };

  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (data.length === 0 || Object.keys(fiatRates).length === 0)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="w-[90%] lg:w-full  max-w-4xl mx-auto mt-10 p-[20px] bg-[#e5e5e5] rounded-[32px] shadow-lg">
      <div className="p-6 bg-[white] rounded-[25px] border-[#dbdada] border-[1.5px]  ">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Crypto-Fiat Converter
        </h2>

        <div className="flex flex-col  md:flex-row md:gap-8 gap-6">
          {/* Cryptocurrency Selection */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {conversionDirection === "crypto-to-fiat"
                ? "Cryptocurrency"
                : "Fiat Currency"}
            </label>
            {conversionDirection === "crypto-to-fiat" ? (
              <select
                value={cryptoCurrency}
                onChange={(e) => setCryptoCurrency(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">-- Select a Coin --</option>
                {data.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={fiatCurrency}
                onChange={(e) => setFiatCurrency(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                {Object.keys(fiatRates).map((fiatCode) => (
                  <option key={fiatCode} value={fiatCode.toLowerCase()}>
                    {fiatCode} ({fiatRates[fiatCode]})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Swap Button */}
          <div className="w-full flex justify-center items-center">
            <button
              onClick={handleExchange}
              className="w-[50px] h-[50px] text-[white] bg-[#161616] hover:bg-gray-300 rounded-[50px] shadow-md transition"
            >
              ↔
            </button>
          </div>

          {/* Fiat Selection */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {conversionDirection === "crypto-to-fiat"
                ? "Fiat Currency"
                : "Cryptocurrency"}
            </label>
            {conversionDirection === "crypto-to-fiat" ? (
              <select
                value={fiatCurrency}
                onChange={(e) => setFiatCurrency(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                {Object.keys(fiatRates).map((fiatCode) => (
                  <option key={fiatCode} value={fiatCode.toLowerCase()}>
                    {fiatCode} ({fiatRates[fiatCode]})
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={cryptoCurrency}
                onChange={(e) => setCryptoCurrency(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">-- Select a Coin --</option>
                {data.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConversion}
          className="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Convert
        </button>

        {/* Conversion Result */}
        {convertedValue && (
          <p className="text-center text-xl font-semibold text-gray-800 mt-8">
            {convertedValue}
          </p>
        )}
      </div>
    </div>
  );
}
