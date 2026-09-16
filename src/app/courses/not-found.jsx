import NotFoundView from "@/components/NotFoundView";
import { notFound } from "next/navigation";

// 404 Not Found fallback when a course ID does not match any catalog course
export default function CoursesNotFound() {
  return (
    <NotFoundView
      image="/not-found/course.svg"
      text="This course was not found in the catalog."
      href="/courses"
      linkText="Back to Courses"
    />
  );
}
