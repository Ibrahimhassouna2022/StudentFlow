import Link from "next/link";

export default function Logo({ size = "default", isWhiteText = false }) {
  return (
    <Link href="/" className="logo-brand">
      <div className={`logo-icon ${size === "sm" ? "logo-icon-sm" : ""}`}>
        ⚡
      </div>
      <span className={isWhiteText ? "text-white" : "text-slate-900"}>
        Student
        <span className={isWhiteText ? "text-white" : "text-indigo-600"}>
          Flow
        </span>
      </span>
    </Link>
  );
}
