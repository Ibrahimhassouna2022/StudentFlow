"use client";

import Link from "next/link";

export default function NotFoundView({ image, text, href, linkText }) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4">
      {image ? (
        <img
          src={image}
          alt=""
          className="w-52 h-52 object-contain mb-6"
        />
      ) : null}
      <p className="text-sm font-bold tracking-widest uppercase text-indigo-600 mb-2">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 max-w-md">
        {text}
      </h1>
      <Link href={href} className="btn-primary mt-4">
        {linkText}
      </Link>
    </section>
  );
}
