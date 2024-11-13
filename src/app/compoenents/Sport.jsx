"use client";
import React, { useEffect, useState } from "react";

const CryptoNews = () => {
  const [newsData, setNewsData] = useState([]);
  const url = "https://cryptocurrency-news2.p.rapidapi.com/v1/cryptodaily";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_BITCOIN_API_URL, // Replace with your actual API key
      "x-rapidapi-host": "cryptocurrency-news2.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Sort data by date in descending order (latest first)
        const sortedData = result.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setNewsData(sortedData || []); // Default to empty array if result.data is undefined
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8 bg-gradient-to-b from-gray-100 to-gray-200">
      {newsData.map((news, index) => (
        <div
          key={index}
          className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-500"
        >
          <div className="overflow-hidden rounded-t-lg">
            <img
              src={news.thumbnail}
              alt={news.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-500 transition-colors duration-300">
              {news.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {news.description}
            </p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-500 font-semibold hover:underline transition-colors duration-300"
            >
              Read more →
            </a>
            <p className="text-gray-400 text-xs mt-4">
              Published on: {new Date(news.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoNews;
