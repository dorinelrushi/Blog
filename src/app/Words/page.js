"use client";
import { useState, useEffect } from "react";
import PayPalButton from "../compoenents/PayPalButton";
import { GoTriangleDown } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  addWordToDB,
  getAllWords,
  getOrdersByWord,
  deleteWordFromDB,
} from "@/actions";
import { useAuth } from "@clerk/nextjs"; // Clerk for authentication

export default function Words() {
  const [word, setWord] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]); // Store fetched words
  const [filteredWords, setFilteredWords] = useState([]); // Store filtered words
  const [searchQuery, setSearchQuery] = useState(""); // Store search query
  const [fetching, setFetching] = useState(true); // Loading state
  const [selectedWordId, setSelectedWordId] = useState(null); // Track which word is being bought
  const [showPayPalModal, setShowPayPalModal] = useState(false); // Toggle for PayPal popup
  const [buyers, setBuyers] = useState({}); // Store buyers for each word
  const [purchaseCounts, setPurchaseCounts] = useState({}); // Track purchases per word
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown for each word
  const { isLoaded, isSignedIn } = useAuth(); // Clerk authentication

  // Function to fetch words and sort them by purchase counts
  const fetchAndSortWords = async () => {
    try {
      const wordsFromServer = await getAllWords();

      // Fetch purchase counts for each word
      const updatedPurchaseCounts = {};
      for (let word of wordsFromServer) {
        const orders = await getOrdersByWord(word._id);
        updatedPurchaseCounts[word._id] = orders.length;
      }

      setPurchaseCounts(updatedPurchaseCounts);

      // Sort words by purchase counts
      const sortedWords = wordsFromServer.sort(
        (a, b) =>
          (updatedPurchaseCounts[b._id] || 0) -
          (updatedPurchaseCounts[a._id] || 0)
      );

      setWords(sortedWords);
      setFilteredWords(sortedWords); // Set filtered words initially
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setFetching(false);
    }
  };

  // Fetch words on component mount
  useEffect(() => {
    fetchAndSortWords();
  }, []);

  // Function to handle adding a word
  const handleAddWord = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addWordToDB({ word, price });
      alert("Word added successfully!");
      await fetchAndSortWords(); // Refresh words after adding
    } catch (error) {
      alert(`Error adding word: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a word
  const handleDeleteWord = async (wordId) => {
    if (!confirm("Are you sure you want to delete this word?")) return;

    try {
      const response = await deleteWordFromDB(wordId);
      if (response.success) {
        alert(response.message);
        await fetchAndSortWords(); // Refresh words after deletion
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());

    // Filter words based on name or price
    const filtered = words.filter(
      (wordItem) =>
        wordItem.word.toLowerCase().includes(e.target.value.toLowerCase()) ||
        wordItem.price.toString().includes(e.target.value)
    );
    setFilteredWords(filtered);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowPayPalModal(false);
    window.location.reload(); // Refresh the page on modal close
  };

  const handlePaymentSuccess = async (details) => {
    console.log("Payment was successful!", details);
    try {
      // Close the PayPal modal
      setShowPayPalModal(false);

      // Delay a bit to allow modal closure, then reload the page
      setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 500); // Optional delay to ensure smooth closure before refresh
    } catch (error) {
      console.error("Error updating words after payment:", error);
    }
  };

  const handleShowPayPal = (wordId) => {
    setSelectedWordId(wordId);
    setShowPayPalModal(true);
  };

  const handleFetchBuyers = async (wordId) => {
    try {
      if (activeDropdown === wordId) {
        setActiveDropdown(null); // Hide dropdown if active
      } else {
        if (!buyers[wordId]) {
          const orders = await getOrdersByWord(wordId);

          // Reverse the orders so the latest buyer appears first
          const reversedOrders = orders.reverse();

          setBuyers((prevBuyers) => ({
            ...prevBuyers,
            [wordId]: reversedOrders, // Use reversed orders
          }));
        }
        setActiveDropdown(wordId);
      }
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_CLIENT_PAYPAL, // Sandbox Client ID
        currency: "USD",
        intent: "capture",
      }}
    >
      <div className="container mx-auto p-8 bg-[#fff] shadow-2xl rounded-lg mt-[30px]">
        {isLoaded && isSignedIn && (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Create Item
            </h1>
            <form
              onSubmit={handleAddWord}
              className="bg-[#f5f5f5] p-6 rounded-lg shadow mb-10"
            >
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter Word"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-[5px] hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-600"
              >
                {loading ? "Adding..." : "Add Person"}
              </button>
            </form>
          </>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or price"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Talent Board
        </h2>
        {fetching ? (
          <p className="text-center text-gray-600">Loading words...</p>
        ) : (
          <>
            {/* Mobile View: Block Format */}
            <div className="block md:hidden">
              {filteredWords.length > 0 ? (
                filteredWords.map((wordItem, index) => (
                  <div
                    key={wordItem._id}
                    className={`mb-4 p-4 rounded-lg shadow-md ${
                      (purchaseCounts[wordItem._id] || 0) > 3
                        ? "bg-yellow-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="font-bold">#{index + 1}</p>
                    <p>
                      <strong>Talent:</strong> {wordItem.word}
                    </p>
                    <p>
                      <strong>Price:</strong> ${wordItem.price}
                    </p>
                    <p>
                      <strong>Purchases:</strong>{" "}
                      {purchaseCounts[wordItem._id] || 0}
                    </p>
                    {purchaseCounts[wordItem._id] > 3 && (
                      <span className="ml-2 inline-block text-xs text-yellow-800 bg-yellow-200 py-1 px-2 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="mt-4">
                      <button
                        className="bg-[#2281FD] text-white py-2 px-4 rounded-[5px] transition-all duration-300"
                        onClick={() => handleShowPayPal(wordItem._id)}
                      >
                        Promote
                      </button>
                    </div>
                    {/* Show Buyers button for mobile */}
                    <div className="mt-4">
                      <button
                        className="flex items-center gap-[5px] text-[#357bd6] border border-[#357bd6] bg-[#2281fd11] outline-none py-2 px-4 rounded-[5px] transition-all duration-300"
                        onClick={() => handleFetchBuyers(wordItem._id)}
                      >
                        Show Buyers <GoTriangleDown />
                      </button>
                      {activeDropdown === wordItem._id &&
                        buyers[wordItem._id] && (
                          <div className="mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <ul className="text-sm text-gray-700 max-h-40 overflow-y-auto">
                              {buyers[wordItem._id].map((buyer) => (
                                <li
                                  key={buyer._id}
                                  className="border-b last:border-none py-2"
                                >
                                  {buyer.payerName} (${buyer.amount})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                    {isSignedIn && (
                      <div className="mt-4">
                        <button
                          className="bg-red-500 flex items-center gap-[10px] text-white py-2 px-4 rounded-[5px] hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400"
                          onClick={() => handleDeleteWord(wordItem._id)}
                        >
                          Delete <RiDeleteBin6Fill />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No words found</p>
              )}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="table-auto w-full mb-8 text-md text-gray-800">
                <thead className="bg-gray-800 text-white uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">TalentS</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Purchases</th>
                    <th className="px-4 py-3 text-left">Buy</th>
                    <th className="px-4 py-3 text-left">Buyers</th>
                    {isSignedIn && (
                      <th className="px-4 py-3 text-left">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {filteredWords.length > 0 ? (
                    filteredWords.map((wordItem, index) => (
                      <tr
                        key={wordItem._id}
                        className={`border-b hover:bg-gray-100 transition ${
                          (purchaseCounts[wordItem._id] || 0) > 3
                            ? "bg-yellow-100"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-4 font-medium">{index + 1}</td>
                        <td className="px-4 py-4 font-medium">
                          {wordItem.word}
                        </td>
                        <td className="px-4 py-4">${wordItem.price}</td>
                        <td className="px-4 py-4">
                          {purchaseCounts[wordItem._id] || 0}
                          {purchaseCounts[wordItem._id] > 3 && (
                            <span className="ml-2 inline-block text-xs text-yellow-800 bg-yellow-200 py-1 px-2 rounded-full">
                              Popular
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <button
                            className="bg-[#2281FD] text-white py-2 px-4 rounded-[5px] transition-all duration-300"
                            onClick={() => handleShowPayPal(wordItem._id)}
                          >
                            Promote
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <div className="relative inline-block">
                            <button
                              className="flex items-center gap-[5px] text-[#357bd6] border border-[#2281FD] bg-[#2281fd11] outline-none py-2 px-4 rounded-[5px] transition-all duration-300"
                              onClick={() => handleFetchBuyers(wordItem._id)}
                            >
                              Show Buyers <GoTriangleDown />
                            </button>
                            {activeDropdown === wordItem._id &&
                              buyers[wordItem._id] && (
                                <div className="absolute z-10 left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
                                  <ul className="py-2 px-4 text-sm text-gray-700 max-h-40 overflow-y-auto">
                                    {buyers[wordItem._id].map((buyer) => (
                                      <li
                                        key={buyer._id}
                                        className="border-b last:border-none py-2"
                                      >
                                        {buyer.payerName} (${buyer.amount})
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </td>
                        {isSignedIn && (
                          <td className="px-4 py-4">
                            <button
                              className="bg-red-500 flex items-center gap-[10px] text-white py-2 px-4 rounded-[5px] hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400"
                              onClick={() => handleDeleteWord(wordItem._id)}
                            >
                              Delete <RiDeleteBin6Fill />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No words found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showPayPalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="text-center m-auto bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
              <h3 className="text-xl text-center m-auto mb-4">
                Complete Payment
              </h3>
              <button
                className="absolute top-2 right-2 text-red-500"
                onClick={handleCloseModal}
              >
                X
              </button>
              <div className="m-auto text-center flex justify-center items-center w-full max-w-lg">
                <PayPalButton
                  price={
                    words.find((word) => word._id === selectedWordId)?.price
                  }
                  wordId={selectedWordId}
                  onPaymentSuccess={handlePaymentSuccess} // Pass the callback to close modal and refresh
                  closeModal={handleCloseModal} // Close modal on success
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
}
