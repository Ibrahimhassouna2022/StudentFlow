'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/context/TaskContext';
import Link from 'next/link';
import Loading from '@/components/ui/loading';

export default function NewTask(){


  const { addTask, course, isLoading } = useTasks();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseName, setCourseName] = useState('');
  const [priority, setPriority] = useState('');
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const PriorityLevel = [
    { icon: '🟢', value: 'low', label: 'Low Priority' },
    { icon: '🟡', value: 'medium', label: 'Medium Priority' },
    { icon: '🔴', value: 'high', label: 'High Priority' },
  ];

  const validate = (data) => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'You should enter a title';
    if (!data.description.trim()) newErrors.description = 'You should enter a description';
    if (!data.dueDate) newErrors.dueDate = 'You should choose a date';
    return newErrors;
  };
  // تشتغل لما المستخدم يطلع من الحقل (onBlur)
  const handleBlur = (field) => {
    // t = قيمة touched القديمة، مثلاً {} أو { title: true }
    // ...t ينسخ اللي كان ملامس قبل، وبعدين [field]: true يعلّم الحقل الحالي
  setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    // بعد اللمس نفحص القيم ونحدّث رسائل الخطأ
    setErrors(validate({ title, description, dueDate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate({ title, description, dueDate });
    // خنعتير انه انتا لمسة كل الحقول 
    setTouched({ title: true, description: true, dueDate: true });
    // نتحقق انه يوجد اخطاء ف الاوبجكت لحتى نسند الاخطاء فال ايرورز 
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    addTask({
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      status: 'pending',
      courseName,
      priority: priority || 'medium',
    });

    router.push('/tasks');
  };

  const inputClass = (field) =>
    `w-full rounded-md border bg-white px-5 py-2 shadow outline-none transition-colors ${
      touched[field] && errors[field]
        ? 'border-red-500 focus:border-red-500'
        : 'border-slate-200 focus:border-blue-500'
    }`;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 w-full">
      <Link href="/tasks" className="text-blue-600 hover:underline">
        ← Back to Task List
      </Link>
      <div className="flex flex-col items-center gap-3 w-full">
        <h1 className="text-3xl font-extrabold">Add New Assignment</h1>
        <p className="text-sm">Fill in the details below to add a new task to your tracker.</p>
        <div className="bg-white border border-slate-200 shadow rounded-xl w-full max-w-[560px] mx-auto px-6 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full" noValidate>
            <div>
              <label htmlFor="title">Task Title *</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleBlur('title')}
                className={inputClass('title')}
              />
              {touched.title && errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="description">Description *</label>
              <input
                id="description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur('description')}
                className={inputClass('description')}
              />
              {touched.description && errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div>
              <label htmlFor="dueDate">Due Date *</label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                onBlur={() => handleBlur('dueDate')}
                className={inputClass('dueDate')}
              />
              {touched.dueDate && errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
              )}
            </div>

            <div className="flex w-full gap-2">
              <select
                name="CourseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white px-5 py-2 shadow outline-none transition-colors focus:border-blue-500"
              >
                <option value="">Select a course</option>
                {course.map((c) => (
                  <option key={c.id} value={c.courseName}>
                    {c.courseName}
                  </option>
                ))}
              </select>
              <select
                name="PriorityLevel"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white px-5 py-2 shadow outline-none transition-colors focus:border-blue-500"
              >
                <option value="">Select priority</option>
                {PriorityLevel.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.icon} {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="submit"
                className="text-sm cursor-pointer font-semibold bg-primary px-4 py-2 border border-slate-200 rounded-lg shadow text-white"
              >
                Save Task
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-slate-200 px-4 py-2 cursor-pointer text-sm font-semibold border border-slate-200 rounded-lg shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}