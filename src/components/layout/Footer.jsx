import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { name: "Dashboard", href: "/" },
  { name: "All Courses", href: "/courses" },
  { name: "Task Manager", href: "/tasks" },
  { name: "Learning Resources", href: "/resources" },
];

const CAPSTONE_TECH = [
  "Next.js 15+ App Router",
  "React 19 & Context API",
  "Tailwind CSS v4",
  "LocalStorage Sync",
];

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      {/* شبكة الفوتر: عمود واحد في الموبايل، و 3 أعمدة في الشاشات الكبيرة md: */}
      <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
        {/* Section 1: Logo & About */}
        <div className="flex flex-col gap-3">
          <Logo size="sm" isWhiteText={true} />
          <p className="text-sm leading-relaxed max-w-[320px] text-slate-400">
            The all-in-one learning workspace and task tracker for modern frontend development students.
          </p>
        </div>

        {/* Section 2: Navigation Links */}
        <div>
          <h4 className="text-white text-base font-bold mb-4">Navigation</h4>
          <ul className="flex flex-col gap-2.5 text-sm list-none p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Capstone Project Tech */}
        <div>
          <h4 className="text-white text-base font-bold mb-4">Capstone Project</h4>
          <ul className="flex flex-col gap-2.5 text-sm list-none p-0">
            {CAPSTONE_TECH.map((tech) => (
              <li key={tech} className="text-slate-400">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* الشريط السفلي: عمودي في الموبايل، وأفقي sm:flex-row في الشاشات الأكبر */}
      <div className="max-w-[1200px] w-full mx-auto px-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 StudentFlow. Frontend Web Development Final Project.</p>
        <span className="footer-badge">Built for Students with ❤️</span>
      </div>
    </footer>
  );
}