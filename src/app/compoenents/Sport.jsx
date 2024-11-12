"use client";

import { useEffect, useState } from "react";

export default function TeamStatistics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStatistics = async () => {
      const url =
        "https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=2020&team=33";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "379f1dafc0msh650b0a7c9487d32p1a8000jsn061e79cc091d",
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTeamStatistics();
  }, []);

  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;
  if (!data) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-8">
      <h1 className="text-[25px] font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
        Team Statistics
      </h1>

      {/* Shfaqja e statistikave kryesore të ekipit */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Biggest Wins and Losses</h2>
        <p className="text-sm text-gray-700">
          <strong>Biggest Win:</strong> {data.biggest?.wins?.home ?? "N/A"} at
          home, {data.biggest?.wins?.away ?? "N/A"} away
        </p>
        <p className="text-sm text-gray-700">
          <strong>Biggest Loss:</strong> {data.biggest?.loses?.home ?? "N/A"} at
          home, {data.biggest?.loses?.away ?? "N/A"} away
        </p>

        <h2 className="text-lg font-bold mt-6 mb-4">Goals</h2>
        <p className="text-sm text-gray-700">
          <strong>Goals Scored:</strong> {data.goals?.for?.total ?? "N/A"}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Goals Against:</strong> {data.goals?.against?.total ?? "N/A"}
        </p>

        <h2 className="text-lg font-bold mt-6 mb-4">
          Streaks and Clean Sheets
        </h2>
        <p className="text-sm text-gray-700">
          <strong>Win Streak:</strong> {data.streak?.wins ?? "N/A"}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Clean Sheets:</strong> {data.clean_sheet?.total ?? "N/A"}
        </p>

        <h2 className="text-lg font-bold mt-6 mb-4">Cards</h2>
        <p className="text-sm text-gray-700">
          <strong>Total Yellow Cards:</strong> {data.cards?.yellow ?? "N/A"}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Total Red Cards:</strong> {data.cards?.red ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
