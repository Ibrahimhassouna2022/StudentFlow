"use client";
import { useState } from "react";
import CourseList from "@/components/courses/CourseList";

// Courses Catalog page: allows students to search and filter courses by category
export default function Page() {
  const [filterType, setFilterType] = useState("");
  const [searchIn, setSearchIn] = useState("");

  const filterTypes = [
    { id: 2, filterType: 'FRONTEND' },
    { id: 3, filterType: 'JAVASCRIPT' },
    { id: 4, filterType: 'REACT' },
    { id: 5, filterType: 'NEXTJS' }
  ];

  return (
    <main className="py-8 flex flex-col gap-4">
      {/* Header title and description */}
      <div>
        <h1 className="font-extrabold text-3xl mb-2 ">Course Catalog</h1>
        <p className="opacity-80"> Explore modules designed to take you from web fundamentals to modern React & Next.js.</p>
      </div>

      {/* Search input and category filter buttons */}
      <div className="flex gap-13 items-center">

        <input
          type="search"
          className="w-full max-w-[400px] h-[48px] pl-10 pr-4 flex gap-7 border-5 border-slate-300 bg-white rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all outline-none text-sm text-gray-600 placeholder-gray-400"
          onChange={(e) => setSearchIn(e.target.value)}
          placeholder="Search courses..."
        />
        <div className="flex flex-col gap-3">
          <span className="text-sm text-gray-400 font-bold "> Category </span>
          <div className="flex gap-5">
            <button
              type="button"
              className={`font-bold text-sm py-2 px-3 rounded-xl ${filterType === "" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setFilterType("")}
            >
              ALL
            </button>

            {/* Dynamically rendering the rest of your filter buttons */}
            {filterTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`font-bold text-sm py-2 px-3 rounded-xl ${filterType === type.filterType ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}
                onClick={() => setFilterType(type.filterType)}
              >
                {type.filterType}
              </button>
            ))}
          </div>
        </div>
      </div> 
      {/* Render filtered courses list */}
      <CourseList searchIn={searchIn} filterType={filterType} />

    </main>
  );
}

