"use client"
import { useTasks } from "@/context/TaskContext";
import CourseCard from "@/components/courses/CourseCard"
import Loading from "@/components/ui/loading"
 export default function CourseList() {
    const { course, isLoading } = useTasks();
    return (
        <>
           <div>
                <h1 className="font-extrabold text-3xl mb-2 mt-10">Enrolled Courses</h1>
                <p className="opacity-80"> Explore modules designed to take you from web fundamentals to modern React & Next.js.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-10">
                        <Loading />
                    </div>
                ) : (
                    //  Show courses when loading is completed
                    course.map((c) => (
                        <CourseCard key={c.id} course={c} />
                    ))
                )}
            </div>

        </>
    );
}