import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { TaskProvider } from "../context/TaskContext";

export const metadata = {
  title: "StudentFlow — Course & Task Management Dashboard",
  description: "A clean, modern student course and task management dashboard built with Next.js, React, and Context API.",
};

// Root layout: wraps all application pages with global styles, TaskContext provider, Navbar, and Footer
export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen flex flex-col">
        {/* Global state provider for tasks and courses */}
        <TaskProvider>
          {/* Top navigation bar */}
          <Navbar />
          {/* Main page content container */}
          <main className="max-w-[1200px] w-full min-w-0 mx-auto px-4 sm:px-6 flex-1 py-6 sm:py-8">
            {children}
          </main>
          {/* Footer at the bottom */}
          <Footer />
        </TaskProvider>
      </body>
    </html>
  );
}