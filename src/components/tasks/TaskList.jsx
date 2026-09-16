"use client";

import { useTasks } from "@/context/TaskContext";
import TaskCard from "./TaskCard";

export default function TaskList({ searchIn, filterType, selectedPriority, selectCourse }) {
  const { tasks } = useTasks();

  const filteredTasks = tasks.filter((t) => {
    const matchCourse = 
    !selectCourse || t.courseName.toLowerCase()===selectCourse.toLowerCase()
     ;
    const matchesSearch =
      !searchIn ||
      t.title?.toLowerCase().includes(searchIn.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchIn.toLowerCase());

    const matchesStatus =
      !filterType || t.status?.toLowerCase() === filterType.toLowerCase();

    const matchesSelect =
      !selectedPriority ||
      t.priority?.toLowerCase() === selectedPriority.toLowerCase();

    return matchesSearch && matchesStatus && matchesSelect && matchCourse;
  });

  return (
    <div className="mt-2 flex w-full min-w-0 flex-col gap-3">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((t) => <TaskCard  key={t.id} task={t} />)
      ) : (
        <p className="text-gray-400 text-sm italic">No matching tasks found...</p>
      )}
    </div>
  );
}
