
import CourseDetails from "@/components/courses/CourseDetails";

// Course details page: reads dynamic [id] from route and renders full course curriculum
export default function Page() {
  return (
    <div className="p-4">
     <CourseDetails/>
    </div>
  );
}
