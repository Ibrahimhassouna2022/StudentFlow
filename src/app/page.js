import Link from "next/link";
import StatsGrid from "../components/dashboard/StatsGrid";
import Upcoming from "@/components/dashboard/Upcoming"
import CourseList from "@/components/dashboard/CourseList";

// Home page: main dashboard showing welcome banner, quick statistics, upcoming deadlines, and courses
export default function Home() {

  return (
    <main className="flex  w-full flex-col items-center justify-between  sm:items-start">
 
       {/* Hero welcome banner with quick actions */}
       <div className="bg-[linear-gradient(135deg,#312e81,#4338ca_50%,#4f46e5)] w-full rounded-xl flex flex-col p-6 sm:p-10 md:p-12 gap-2 text-white">
        <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Welcome back to StudentFlow 🚀
        </h1>
        <p className="mb-6 text-[#e0e7ff] text-sm sm:text-base font-semibold max-w-[600px] leading-relaxed">
          Track your course progression, organize your assignments, and discover
          curated frontend learning resources all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="bg-primary rounded-xl cursor-pointer py-[10.5px] px-[20px] text-center">
            <Link className="text-white block" href="tasks/new">
              + Create New Task
            </Link>
          </div>
          <div className="bg-primary-light rounded-xl cursor-pointer py-[10.5px] px-[20px] text-center">
            <Link className="text-black block" href="courses/">
              Explore Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Task statistics overview cards */}
      <div className="w-full">
        <StatsGrid />
      </div>

      {/* Upcoming tasks due within the next 7 days */}
      <Upcoming/>

      {/* Featured courses list */}
      <CourseList/>
     </main>
  );
}
