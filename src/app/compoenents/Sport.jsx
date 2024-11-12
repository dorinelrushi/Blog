"use client";

import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa"; // Importing icon for 'new' label

export default function BitcoinNews() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const url =
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey=f01ebef32b6047a29ac24dce2682d42a";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();

        const filteredArticles = result.articles.filter(
          (article) =>
            article.title !== "[Removed]" &&
            article.author !== "[Removed]" &&
            article.source.name !== "[Removed]" &&
            article.description !== "[Removed]"
        );

        const sortedArticles = filteredArticles.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        setArticles(sortedArticles);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNews();
  }, []);

  const isNew = (date) => {
    const publishedDate = new Date(date);
    const now = new Date();
    const timeDifference = now - publishedDate;
    return timeDifference < 24 * 60 * 60 * 1000;
  };

  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;
  if (!articles.length) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-8">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-200">
        Bitcoin News
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
          >
            {article.urlToImage && (
              <div className="overflow-hidden">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform transform hover:scale-110"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 line-clamp-2">
                  {article.title}
                </h2>
                {isNew(article.publishedAt) && (
                  <span className="text-xs text-white bg-red-500 rounded-full px-2 py-1 flex items-center">
                    <FaClock className="inline mr-1" /> New
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {article.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By {article.author ?? "Unknown Author"} | Source:{" "}
                {article.source.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
