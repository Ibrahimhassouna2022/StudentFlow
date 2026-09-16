"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { mockTasks } from "../data/mockTasks";
import { mockCourses } from "../data/mockCourses";

// 1. إنشاء الـ Context وبدء الحالة بمصفوفات فارغة افتراضياً لمنع خطأ الـ filter null
const TaskContext = createContext();
 
// 2. الـ Provider
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [course, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل المهام والكورسات عند أول تشغيل بالمتصفح فقط
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedCourses = localStorage.getItem("courses");

    if (savedTasks && savedCourses) {
      setTasks(JSON.parse(savedTasks));
      setCourses(JSON.parse(savedCourses));
    } else {
      // أول مرة: نحمل البيانات التجريبية الصحيحة
      setTasks(mockTasks);
      setCourses(mockCourses);
      localStorage.setItem("tasks", JSON.stringify(mockTasks));
      localStorage.setItem("courses", JSON.stringify(mockCourses));
    }

    setIsLoading(false);
  }, []);

  // حفظ التغييرات للمهام في localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // إضافة مهمة جديدة
  function addTask(task) {
    const newTask = { ...task, id: `task-${Date.now()}` };
    setTasks((prev) => [newTask, ...prev]);
  }

  // حذف مهمة
  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // تغيير حالة مهمة (مكتملة / معلقة)
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
          : t
      )
    );
  }

  // حساب المهام القادمة خلال 7 أيام
  function getUpcomingTasks() {
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const in7Days = new Date();
    in7Days.setDate(today.getDate() + 7);
    in7Days.setHours(23, 59, 59, 999);

    return tasks.filter((t) => {
      const due = new Date(t.dueDate);
      return t.status !== "completed" && due >= today && due <= in7Days;
    });
  }

  // إحصائيات للداشبورد - يتم حسابها بأمان بعد الـ Mount لمنع أخطاء الـ Hydration
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed" ).length,
    pending: tasks.filter((t) => t.status === "pending").length,
    overdue: tasks.filter(
      (t) => t.status !== "completed" && new Date(t.dueDate) < new Date()
    ).length,
  };

  return (
    <TaskContext.Provider
      value={{ tasks, course, stats, isLoading, addTask, deleteTask, toggleTask, getUpcomingTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// 3. الـ Hook المخصص
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
