"use client";

import { useEffect, useState } from "react";

export default function TrendingPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/asset_platforms?x_cg_demo_api_key=CG-RXhcM4pqRLmh8Uu9Hy7rFY1j"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching trending data:", error);
        setError(error.message);
      }
    };

    fetchTrendingData();
  }, []);

  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-8">
      {/* Seksioni Informues */}
      <div className=" p-6 rounded-lg mb-8 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Why This Data Matters
        </h2>
        <p className="text-md text-center mb-4">
          Understanding asset platforms is essential for anyone navigating the
          cryptocurrency ecosystem. Information on chain identifiers and native
          coin IDs helps to clarify the specific network each asset belongs to,
          improving transparency and aiding in investment decisions.
        </p>
      </div>

      {/* Titulli Kryesor */}

      {/* Tabela e të dhënave për ekranet e mëdha */}
      <div className="hidden lg:block">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-medium text-left">
                Name
              </th>
              <th className="px-4 py-3 text-gray-700 font-medium text-left">
                Chain Identifier
              </th>
              <th className="px-4 py-3 text-gray-700 font-medium text-left">
                Native Coin ID
              </th>
              <th className="px-4 py-3 text-gray-700 font-medium text-left">
                Image
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {data.map((platform, index) => (
              <tr
                key={platform.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 font-semibold">{platform.name}</td>
                <td className="px-4 py-2">
                  {platform.chain_identifier ?? "N/A"}
                </td>
                <td className="px-4 py-2">
                  {platform.native_coin_id ?? "N/A"}
                </td>
                <td className="px-4 py-2">
                  {platform.image?.thumb ? (
                    <img
                      src={platform.image.small}
                      alt={platform.name}
                      className="w-10 h-10 shadow rounded-full"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabela e të dhënave për ekranet e vogla */}
      <div className="lg:hidden">
        {data.map((platform, index) => (
          <div
            key={platform.id}
            className={`border rounded-lg p-4 mb-4 shadow-md ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{platform.name}</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Chain Identifier:</span>{" "}
              {platform.chain_identifier ?? "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Native Coin ID:</span>{" "}
              {platform.native_coin_id ?? "N/A"}
            </p>
            <div className="mt-2">
              {platform.image?.thumb ? (
                <img
                  src={platform.image.small}
                  alt={platform.name}
                  className="w-12 h-12 shadow rounded-full"
                />
              ) : (
                <p className="text-gray-500">No Image</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
