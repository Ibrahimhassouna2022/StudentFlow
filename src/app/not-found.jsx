import NotFoundView from "@/components/NotFoundView";

// 404 Not Found page: displayed when a visited URL route does not exist
export default function NotFound() {
  return (
    <NotFoundView
      image="/not-found/page.svg"
      text="This page does not exist or was moved."
      href="/"
      linkText="Back to Dashboard"
    />
  );
}
