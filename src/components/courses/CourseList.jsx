"use client";

import { useTasks } from "@/context/TaskContext";
import CourseCard from "./CourseCard";
import Loading from "@/components/ui/loading";

export default function CourseList({ searchIn, filterType }) {
  const { course, isLoading } = useTasks();

  if (isLoading) {
    return <Loading />;
  }

  const filteredCourse = course.filter((t) => {
    
    const matchesSearch =
      !searchIn ||
      t.courseName.toLowerCase().includes(searchIn.toLowerCase()) ||
      t.description.toLowerCase().includes(searchIn.toLowerCase());

    const matchesCategory =
      !filterType ||
      (t.category && t.category.toLowerCase() === filterType.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2  mt-4">
      {filteredCourse.length > 0 ? (
        filteredCourse.map((c) => <CourseCard key={c.id} course={c} />)
      ) : (
        <p className="text-gray-400 text-sm italic">No matching courses found...</p>
      )}
    </div>
  );
}
