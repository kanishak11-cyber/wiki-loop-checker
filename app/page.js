"use client";

import { useState } from "react";
import axios from "axios";
import { FallingLines, Vortex } from "react-loader-spinner";

export default function Home() {
  const [formData, setFormData] = useState({
    url: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("/api/wikicheck", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setFormData({ url: "" });
    setResult(null);
  };

  return (
    <div className="container mx-auto border md:p-4 p-1  rounded-xl shadow-xl ">
      <form onSubmit={handleSubmit} className="my-4">
        <div className="flex flex-col gap-4 md:flex-row items-center mb-4 justify-center">
          <label className="text-gray-800 font-bold ">Wikipedia URL:</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={(e) => setFormData({ url: e.target.value })}
            placeholder="Enter Wikipedia URL"
            className="p-2 border border-gray-300 rounded w-3/4 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 text-white px-4 py-2 rounded mr-4 hover:bg-indigo-700"
          >
            {loading ? (
              <p>
                <FallingLines
                  color="#fff"
                  width="25"
                  visible={true}
                  ariaLabel="falling-circles-loading"
                />
              </p>
            ) : (
              "Check Loop"
            )}
          </button>
          <button
            onClick={handleClear}
            className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-100"
          >
            Clear
          </button>
        </div>
      </form>

      {loading && (
        <p className="items-center flex justify-center">
          <Vortex
            visible={true}
            height="180"
            width="180"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </p>
      )}

      {result && (
        <div className=" ">
          {result?.success === 1 ? (
            <div className="mb-4 text-center py-3">
              <p className="text-lg font-bold">
                Total Requests:{" "}
                <span className="text-amber-800 text-xl">
                  &nbsp;{result?.count}
                </span>
              </p>
            </div>
          ) : (
            <div className="flex items-center mb-4 text-center justify-center">
              <div className="text-red-500 font-bold mr-2">Error:</div>
              <p className="text-red-500">{result?.message}</p>
            </div>
          )}

          {result?.visitedPages && result?.visitedPages.length > 0 && (
            <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 overflow-x-scroll">
              <thead>
                <tr className="md:text-xl text bg-slate-100">
                  <th className="border border-gray-300 p-2">Sr No.</th>
                  <th className="border border-gray-300 p-2">Page</th>
                </tr>
              </thead>
              <tbody>
                {result?.visitedPages.map((link, index) => (
                  <tr key={index} className="bg-slate-50">
                    <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      )}
    </div>
  );
}
