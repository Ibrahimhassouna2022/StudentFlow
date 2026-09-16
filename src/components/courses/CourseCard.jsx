"use client";

import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm
     flex flex-col gap-3">
      <div className="flex justify-between items-center w-full">
        <span> {course.icon}</span>
        <span>{course.category}</span>
      </div>
      <h3 className="font-bold text-lg">{course.title || course.courseName}</h3>
      <p

        className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer block my-1"
      >
        {course.description}
      </p>
      <div>
        <div className="flex gap-2 ">
          <span className="font-bold text-sm  rounded-lg flex-shrink-0">📊{course.level}</span>
          <span className="font-bold text-sm  rounded-lg flex-shrink-0">⏱️{course.duration}</span>
          <span className="font-bold text-sm  rounded-lg flex-shrink-0">👤{course.instructor}</span>
        </div>
        <Link
          href={`/courses/${course.id}`}
          className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer block my-1"
        >
          <button className="p-2 mt-5 w-full bg-purple-400 rounded-lg border border-white-328">View Course & Tasks →</button>
        </Link>
      </div>
    </div>
  );
}
