"use client";

import { useTasks } from "@/context/TaskContext";
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function TaskCard({ task, typeCourse = "public" }) {

 const isOverdue = (t) => (task.status === "completed" ? false : new Date(task.dueDate) < new Date());

  const { tasks, deleteTask, course, toggleTask } = useTasks();
  const { id } = useParams();
  const router = useRouter();
  const courseFind = course.find((c) => c.id === id);

  return (
    <div >

      {
        typeCourse === task.courseName ?

          (<div key={task.id} className="flex w-full min-w-0 flex-col gap-3 rounded-xl border-2 border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <input type="checkbox" className="mt-1 shrink-0 sm:mt-0" checked={task.status === "completed"}  onChange={() => toggleTask(task.id)} />
              <Link className="min-w-0 flex-1 break-words" href={`/tasks/${task.id}`}>{task.title}</Link>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="min-w-0 break-words text-sm text-slate-300">{task.title}</p>
              <div className="flex shrink-0 gap-2">
                <span className="hover:bg-primary-light rounded-lg p-2 text-sm cursor-pointer" onClick={() => router.push(`/tasks/${task.id}`)}>Details</span>
                <span className="hover:bg-red-500/15 rounded-lg p-2 text-sm cursor-pointer" onClick={() => deleteTask(task.id)}>🗑️</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-primary-light rounded-lg p-2 text-sm">{task.priority}</span>
              <span className="bg-primary-light rounded-lg p-2 text-sm">{task.courseName}</span>
              <span className={`rounded-lg p-2 text-sm ${isOverdue(task) ? 'text-red-700' : 'bg-transparent text-gray-700'} rounded-lg p-2 text-sm`}>📅 {task.dueDate} </span>
            </div>
          </div>) : (<div key={task.id} className={`flex w-full min-w-0 flex-col gap-3 rounded-xl border-2 border-gray-100 p-4 shadow-sm sm:p-6
  ${task.status === 'completed' ? 'bg-primary-light border' : 'bg-white'}`}>
            <div className="flex min-w-0 items-start gap-3 sm:items-center">
              <input type="checkbox" className="mt-1 shrink-0 sm:mt-0" checked={task.status === "completed"}  onChange={() => toggleTask(task.id)} />
              <Link className={`min-w-0 flex-1 break-words ${task.status=="completed"? ' line-through decoration-red-500':null} `} href={`/tasks/${task.id}`}>
              {task.title}
               </Link>
              
            </div>

            <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="min-w-0 break-words text-sm text-slate-300"> {task.title}</p>
              <div className="flex shrink-0 gap-2">
                <span className="hover:bg-primary-light rounded-lg p-2 text-sm cursor-pointer" onClick={() => router.push(`/tasks/${task.id}`)}>Details</span>
                <span className="hover:bg-red-500/15 rounded-lg p-2 text-sm cursor-pointer" onClick={() => deleteTask(task.id)}>🗑️</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-primary-light rounded-lg p-2 text-sm">{task.priority}</span>
              <span className="bg-primary-light rounded-lg p-2 text-sm">{task.courseName}</span>
              <span className={`rounded-lg p-2 text-sm ${isOverdue(task) ? 'text-red-700' : 'bg-transparent text-gray-700'} rounded-lg p-2 text-sm`}>📅 {task.dueDate} </span>
              <span className="bg-primary-light rounded-lg p-2 text-sm">{task.status} </span>
   </div>
          </div>
          )}
    </div>
  );
}
