"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Dashboard", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Tasks", href: "/tasks" },
  { name: "Resources", href: "/resources" },
];

function MenuIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-wrapper">
      {/* الحاوية الرئيسية للهيدر - التخطيط والريسبونسف مباشرة في JSX */}
      <div className="max-w-[1200px] w-full mx-auto px-6 h-[70px] flex items-center justify-between">
        <Logo />

        {/* روابط الديسكتوب: تختفي في الموبايل وتظهر فقط على الشاشات المتوسطة والكبيرة */}
        <nav>
          <ul className="hidden md:flex items-center gap-7 list-none">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* قسم الأزرار في أقصى اليمين */}
        <div className="flex items-center gap-3">
          <Link href="/tasks/new" className="btn-primary hidden sm:inline-flex">
            + New Task
          </Link>

          {/* زر البرغر: يظهر فقط في الموبايل ويختفي في الديسكتوب */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 hover:bg-slate-100 transition-colors md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* قائمة الموبايل المنسدلة: تظهر فقط عندما open === true وتختفي في الديسكتوب */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/tasks/new"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 text-center"
          >
            + New Task
          </Link>
        </div>
      )}
    </header>
  );
}