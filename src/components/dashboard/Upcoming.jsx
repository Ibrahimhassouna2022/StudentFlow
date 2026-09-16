"use client";
import { useTasks } from "@/context/TaskContext"
import Link from "next/link"
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
export default function Upcoming() {
    const { tasks, deleteTask, toggleTask, getUpcomingTasks, isLoading } = useTasks();
    const upcoming = getUpcomingTasks();
const router = useRouter();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            {/* Upcoming Deadlines */}
            <div className="mt-10 w-full flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold">
                            ⏰ Upcoming Deadlines (Next 7 Days)
                        </h2>
                        <p className="text-gray-600">
                            Stay on top of your upcoming course milestones.
                        </p>
                    </div>

                    <div className="border border-blue-400 rounded-md p-2 bg-secondary shrink-0 transition-colors hover:bg-opacity-80">
                        <Link href="/tasks" className="text-blue-600 font-medium">
                            View All Tasks →
                        </Link>
                    </div>
                </div>
                {/* if completed ?? true or false */}
                {upcoming ? (
                    // What to show if the task is NOT completed, but IS upcoming
                    tasks.map((d) => {
                        return d.status === 'pending' ? (
                            <div
                                key={d.id}
                                className="w-full rounded-xl border-2 border-gray-100 bg-white p-6 shadow-sm flex flex-col"
                            >
                                <div className="flex gap-3 items-center">
                                    <input type="checkbox" onChange={() => toggleTask(d.id)} />
                                     <Link className="flex-grow max-w-[900px]" href={`/tasks/${d.id}`}>{d.title}</Link>
                                </div>
                                {/* div to 2 elements */}
                                <div className="flex justify-between items-center w-full px-5">
                                    <p className="text-slate-300 text-sm">{d.title} </p>
                                    <div className="flex gap-2">
                                        <span className="hover:bg-primary-light rounded-lg p-2 text-sm" 
                                        onClick={()=>{
                                                       router.push(`/tasks/${d.id}`);

                                        }}>Details</span>
                                        <span className="hover:bg-red-500/15 rounded-lg p-2 text-sm" onClick={() => deleteTask(d.id)}>🗑️</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <span className="bg-primary-light rounded-lg p-2 text-sm">{d.priority}</span>
                                    <span className="bg-primary-light rounded-lg p-2 text-sm">{d.courseName}</span>
                                    <span className="bg-primary-light rounded-lg p-2 text-sm">📅{d.dueDate}</span>

                                </div>

                            </div>
                        ) : null;

                    })


                ) : (
                    <div className=" p-7 bg-secandary rounded-2xl border border-gray-100 bg-white p-6 shadow-sm 
        transition-all duration-200 hover:shadow-md flex flex-col   justiy-between 
        items-start sm:items-center w-full  gap-4">
                        <span className="text-4xl">🎉</span>
                        <div className="text-center"><h3 className="text-xl font-extrabold"> No tasks due in the next 7 days!</h3>
                            <p className="text-sm  opacity-40">You are all caught up or have no
                                pending deadlines this week.</p></div>
                    </div>
                )

                }
            </div >
        </>
    );
}