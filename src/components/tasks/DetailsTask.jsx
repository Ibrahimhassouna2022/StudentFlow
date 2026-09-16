"use client";

import { useParams } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import Link from "next/link";
import NotFoundView from "@/components/NotFoundView";
import Loading from "@/components/ui/loading";
export default function DetailsTask() {

    const { taskId } = useParams();
    const { tasks, isLoading } = useTasks();
    const task = tasks.find((t) => t.id === taskId);

    if (isLoading) {
        return <Loading />;
    }

    if (!task) {
        return (
            <NotFoundView
                image="/not-found/task.svg"
                text="This task was not found."
                href="/tasks"
                linkText="Back to Tasks"
            />
        );
    }
    // 5. عرض تفاصيل المهمة
    return (

        <div className="flex flex-col gap-4 mt-3  max-w-[600px] mx-auto">

            <div>
                <Link href="/tasks" className="text-blue-600 hover:underline">
                    ← Back to Tasks
                </Link>
            </div>
            <div className="px-5 py-8 flex flex-col gap-3 bg-white border border-slate-200 shadow rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <span className={`text-[11px] font-bold  px-2.5 py-1 rounded-full 
                        ${task.priority === "high"? "bg-rose-100 text-rose-600"
                                : task.priority === "low"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-amber-100 text-amber-600"
                            }`}>
                            {task.priority ? `${task.priority.toUpperCase()} PRIORITY` : "NO PRIORITY"}
                        </span>
                        <span className={`text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full ${task.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-600"
                            }`}>
                            {task.status?.toUpperCase()}
                        </span>
                    </div>
                    <span className="text-xs text-slate-400">ID: {task.id}</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                    <p>📅 Due Date: {task.dueDate}</p>
                    <p>📌 Status: {task.status}</p>
                </div>
            </div>
        </div>
    );
}