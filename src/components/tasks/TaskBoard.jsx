"use client";
import Link from "next/link";
import { useTasks } from "@/context/TaskContext";
import { useState } from "react";
import TaskList from "@/components/tasks/TaskList";
import Loading from "@/components/ui/loading";

const filterTypes = [
  { id: 2, filterType: "pending" },
  { id: 3, filterType: "completed" },
];

export default function TaskBoard() {
  const { tasks, course, isLoading } = useTasks();
  const [searchIn, setSearchIn] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectPriorities, setSelectPriorities] = useState("");
  const [selectCourse, setSelectCourse] = useState("");

  if (isLoading) {
    return <Loading />;
  }

  const hasActiveFilters = filterType || selectPriorities || searchIn || selectCourse;

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">Task Manager</h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Manage, filter, and track all your course assignments ({tasks.filter((t) => t.status === "completed").length} of {tasks.length} completed).
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-base font-semibold text-white sm:w-auto sm:text-lg"
        >
          Add Task
        </Link>
      </div>

      <div className="relative w-full sm:max-w-[400px]">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg select-none">
          🔍
        </span>
        <input
          type="search"
          value={searchIn}
          onChange={(e) => {
            setSearchIn(e.target.value);
          }}
          placeholder="Search tasks by keyword or description..."
          className="h-12 w-full rounded-xl border border-purple-400 bg-white pr-4 pl-10 text-sm text-gray-600 outline-none transition-all placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="mt-1 flex w-full min-w-0 flex-col gap-4 rounded-xl border-2 border-white bg-white p-4 shadow-sm sm:p-5 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="min-w-0">
          <p className="text-sm font-medium">Status</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-lg px-3 py-1.5 text-sm ${
                filterType === "" ? "bg-primary text-white" : "bg-slate-200 text-slate-700"
              }`}
              onClick={() => setFilterType("")}
            >
              All
            </button>
            {filterTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`rounded-lg px-3 py-1.5 text-sm ${
                  filterType === type.filterType
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
                onClick={() => {
                  setFilterType(type.filterType);
                }}
              >
                {type.filterType}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 w-full flex-col gap-4 sm:flex-row lg:w-auto">
          <div className="min-w-0 flex-1 lg:flex-none">
            <p className="text-sm">Priority</p>
            <div className="mt-2">
              <select
                name="priorites"
                value={selectPriorities}
                onChange={(e) => setSelectPriorities(e.target.value)}
                className="w-full max-w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 sm:min-w-[160px]"
              >
                <option value=""> All Priorities</option>
                <option value="high"> High Priority</option>
                <option value="medium"> Medium Priority</option>
                <option value="low"> Low Priority</option>
              </select>
            </div>
          </div>
          <div className="min-w-0 flex-1 lg:flex-none">
            <p className="text-sm">Course</p>
            <div className="mt-2">
              <select
                name="course"
                value={selectCourse}
                onChange={(e) => setSelectCourse(e.target.value)}
                className="w-full max-w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 sm:min-w-[160px]"
              >
                <option value=""> All Courses</option>
                {course.map((c) => (
                  <option key={c.id} value={c.courseName}>
                    {c.courseName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            className="h-fit w-full shrink-0 rounded-lg bg-primary px-3 py-1.5 text-sm text-white sm:w-auto lg:ml-auto"
            onClick={() => {
              setFilterType("");
              setSearchIn("");
              setSelectPriorities("");
              setSelectCourse("");
            }}
          >
            Reset Filters ✕
          </button>
        ) : null}
      </div>

      <TaskList
        searchIn={searchIn}
        filterType={filterType}
        selectedPriority={selectPriorities}
        selectCourse={selectCourse}
      />
    </div>
  );
}
