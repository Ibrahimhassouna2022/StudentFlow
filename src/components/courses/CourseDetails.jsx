"use client"
import { useParams } from "next/navigation";
import { useTasks } from '@/context/TaskContext';
import Link from "next/link";
import TaskCard from "../tasks/TaskCard";
import NotFoundView from "@/components/NotFoundView";
import Loading from "@/components/ui/loading";
export default function CourseDetails() {
  const params = useParams();
  const id = params?.id;
  const { course, tasks, isLoading } = useTasks();

  const foundCourse = course?.find(c => String(c.id) === String(id));

  if (isLoading) {
    return <Loading />;
  }

  if (!foundCourse) {
    return (
      <NotFoundView
        image="/not-found/course.svg"
        text="This course was not found in the catalog."
        href="/courses"
        linkText="Back to Courses"
      />
    );
  }

  const totalTasks = tasks.filter((t) => t.courseName === foundCourse.courseName).length;
  const completed = tasks.filter((t) => t.courseName === foundCourse.courseName && t.status === "completed").length
  const allStatTask = tasks.filter((t)=> t.courseName===foundCourse.courseName);
  const percentage = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 p-6 w-full ">
 
       <Link href="/courses" className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 font-bold rounded-lg w-fit transition-colors duration-200 text-sm">
        ← Back to Course Catalog
      </Link>

      {/* كارت الكورس الرئيسي */}
      <div className="bg-gradient-to-br from-[#3b30e5] to-[#271ebd] w-full rounded-2xl p-8 flex flex-col gap-6 text-white shadow-lg">

        {/* الصف العلوي: الأيقونة وشارة القسم (Badge) */}
        <div className="flex items-center gap-4">
          <span className="text-3xl">{foundCourse.icon || "⚡"}</span>
          <span className="rounded-full px-3 py-1 bg-white/20 text-white text-[10px] font-bold 
          tracking-widest uppercase">
            {foundCourse.category}
          </span>
        </div>

        {/* عنوان الكورس والوصف */}
        <div className="flex flex-col gap-3 ">
          <h1 className="text-3xl font-bold tracking-wide ">
            {foundCourse.courseName}
          </h1>
          <p className="text-white/80 text-base font-normal leading-relaxed max-w-xl">
            {foundCourse.description}
          </p>
        </div>

        {/* الخط الفاصل السفلي */}
        <div className="border-white/20 pt-6 mt-2 border-t w-full  " />

        {/* شبكة البيانات الإضافية (3 أعمدة متساوية) */}
        <div className="grid grid-cols-3 gap-1 max-w-sm">

          {/* المدرب */}
          <div className="flex flex-col gap-1">
            <span className="text-white/50 text-[11px] font-bold tracking-wider uppercase">INSTRUCTOR</span>
            <span className="text-white font-semibold text-base">
              {foundCourse.instructor}
            </span>
          </div>

          {/* المدة الزمنية */}
          <div className="flex flex-col gap-1">
            <span className="text-white/50 text-[11px] font-bold tracking-wider uppercase">DURATION</span>
            <span className="text-white font-semibold text-base">
              {foundCourse.duration}
            </span>
          </div>

          {/* المستوى */}
          <div className="flex flex-col gap-1">
            <span className="text-white/50 text-[11px] font-bold tracking-wider uppercase">LEVEL</span>
            <span className="text-white font-semibold text-base">
              {foundCourse.level}
            </span>
          </div>

        </div>

      </div>

      <div className="flex gap-5 mt-5 w-full">
        {/* className="     */}
        <div className="w-[500px] border border-gray-100 bg-white  py-3 px-5 rounded-2xl shadow-sm flex flex-col gap-6 ">
          <div className="flex items-center gap-3">
            <span className="text-xl">📖</span> {/* يمكنك استبدالها بأيقونة من Lucide React مثل <BookOpen /> */}
            <h3 className="text-[#071330] font-bold text-xl tracking-tight">
              Key Syllabus Topics
            </h3>
          </div>
          {/* قائمة المواضيع */}
          <ul className="flex flex-col gap-4">
            {foundCourse.topics.map((topic, index) => (
              <li key={index} className="flex items-start gap-4 text-base">

                {/* رقم العنصر الملون بالأزرق الداكن */}
                <span className="text-[#3b30e5] font-bold min-w-[20px]">
                  {index + 1}.
                </span>

                {/* نص الموضوع بلون رمادي داكن */}
                <span className="text-[#4a5568] font-normal leading-relaxed">
                  {topic}
                </span>

              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 border border-gray-100  bg-white shadaw-lg w-full rounded-2xl  py-5 px-4">

          <div className="flex justify-between items-center ">
            <h2>📝 Course Tasks & Assignments (1/{totalTasks})</h2>
            <p>{totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0}% Complete</p>

          </div>
          {/* parenet Div */}
          <div className="h-[12px] border  border-gray-133 rounded-full bg-primary-light w-full">
            {/* child Div >> let total task in course completed? foundCourse.state.completed */}
            <div className="h-full bg-primary-hover transition-all duration-300 rounded-full"
              style={{ width: `${percentage}%` }} />
          </div>
          {
            allStatTask.map((c) => <TaskCard key={c.id} task={c}  typeCourse={foundCourse.courseName}  />)
          }
        </div>
      </div>

    </div>
  );
}