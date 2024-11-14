"use client";
import React, { useState } from "react";

const ApiGuide = () => {
  const [apiUrl, setApiUrl] = useState(
    "https://www.devpromote.online/api/data"
  );
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setApiUrl(e.target.value);
  };

  const testApi = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setApiResponse(result);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data. Please check the URL and try again.");
      setApiResponse(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-5 font-sans w-full lg:w-4/5">
      <h1 className="text-xl md:text-2xl text-center text-blue-600 mb-6">
        API Guide for devpromote.online
      </h1>

      <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
        {/* Left Column - API Guide */}
        <div className="flex-1 bg-gray-800 text-gray-300 p-4 rounded-lg overflow-auto max-h-[500px] lg:max-h-[700px]">
          <h2 className="text-lg text-blue-400">API Endpoint</h2>
          <p className="text-sm">
            The API endpoint to retrieve blog posts data is:
          </p>
          <pre className="bg-gray-900 text-blue-300 p-2 rounded mt-2 overflow-auto text-xs md:text-sm">
            https://www.devpromote.online/api/data
          </pre>

          <h2 className="text-lg text-blue-400 mt-4">
            Example Code in JavaScript (Fetch)
          </h2>
          <pre className="bg-gray-900 text-orange-300 p-2 rounded mt-2 overflow-x-auto text-xs md:text-sm">
            {`
let headersList = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)"
};

let response = await fetch("https://www.devpromote.online/api/data", {
  method: "GET",
  headers: headersList
});

let data = await response.json();
console.log(data);
            `}
          </pre>

          <h2 className="text-lg text-blue-400 mt-4">
            React Component Example
          </h2>
          <pre className="bg-gray-900 text-orange-300 p-2 rounded mt-2 overflow-x-auto text-xs md:text-sm">
            {`
import React, { useEffect, useState } from 'react';

const BlogPosts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.devpromote.online/api/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Blog Posts from API</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div>
        {data.map((item) => (
          <div key={item.slug}>
            <a href={\`https://devpromote.online/items/\${items.slug}\`}  rel="noopener noreferrer">
              <h2>{item.title}</h2>
            </a>
            <p>User ID: {item.userId}</p>
            <p>Tags: {item.tags ? item.tags.join(", ") : "No tags"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
            `}
          </pre>
        </div>

        {/* Right Column - API Tester */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg text-blue-600">API Tester</h2>
          <p className="text-sm">
            Enter the API endpoint and click "Test API" to fetch data:
          </p>
          <input
            type="text"
            value={apiUrl}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded focus:outline-none text-xs md:text-sm"
          />
          <button
            onClick={testApi}
            className="w-full md:w-auto px-4 py-2 bg-[black] text-white rounded  focus:outline-none"
          >
            Test API
          </button>
          {error && (
            <p className="text-red-600 mt-4 text-xs md:text-sm">{error}</p>
          )}
          {apiResponse && (
            <div className="bg-gray-900 text-blue-300 p-4 rounded mt-4 overflow-x-auto overflow-y-auto max-h-[250px] md:max-h-[350px] lg:max-h-[450px] text-xs md:text-sm max-w-full lg:max-w-[600px]">
              <h3 className="text-blue-400 mb-2">API Response:</h3>
              <pre className="whitespace-pre-wrap break-words max-w-full">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiGuide;
