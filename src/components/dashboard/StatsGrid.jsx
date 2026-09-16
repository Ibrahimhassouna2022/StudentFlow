"use client";

import { useTasks } from "@/context/TaskContext";
import Loading from "@/components/ui/loading";

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="3" width="10" height="4" rx="1.2" stroke="#94a3b8" strokeWidth="1.7" />
      <rect x="5" y="5" width="14" height="16" rx="2.2" stroke="#94a3b8" strokeWidth="1.7" />
      <path d="M9 12h6M9 16h4" stroke="#94a3b8" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#22c55e" />
      <path d="M8 12.5l2.6 2.6L16.5 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 4h12M6 20h12" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 4c0 4 4 6 5 8 1-2 5-4 5-8M7 20c0-4 4-6 5-8 1 2 5 4 5 8" stroke="#f59e0b" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.8L3.2 19.2h17.6L12 3.8z" fill="#facc15" stroke="#1e293b" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 9v5.2" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.6" r="1" fill="#1e293b" />
    </svg>
  );
}

export default function StatsGrid() {
  const { stats, isLoading } = useTasks();

  if (isLoading) {
    return <Loading />;
  }

  const completionRate = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const cards = [
    {
      label: "TOTAL TASKS",
      value: stats.total,
      hint: "All assigned tasks",
      accent: "border-l-indigo-400",
      icon: <ClipboardIcon />,
    },
    {
      label: "COMPLETED",
      value: stats.completed,
      hint: `${completionRate}% completion rate`,
      accent: "border-l-emerald-400",
      icon: <CheckIcon />,
    },
    {
      label: "PENDING",
      value: stats.pending,
      hint: "Tasks in progress",
      accent: "border-l-amber-400",
      icon: <HourglassIcon />,
    },
    {
      label: "OVERDUE",
      value: stats.overdue,
      hint: "Needs attention",
      accent: "border-l-rose-400",
      icon: <WarningIcon />,
    },
  ];

  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`flex min-h-[132px] w-full flex-col justify-between rounded-2xl border border-slate-100 border-l-[6px] bg-white px-5 py-5 shadow-sm ${card.accent}`}
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[11px] font-bold tracking-[0.14em] text-slate-500">
              {card.label}
            </h2>
            <span className="shrink-0">{card.icon}</span>
          </div>
          <div>
            <p className="text-[32px] font-extrabold leading-none text-slate-900">
              {card.value}
            </p>
            <p className="mt-2 text-[13px] text-slate-400">{card.hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
