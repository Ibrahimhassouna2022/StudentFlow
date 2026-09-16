import NotFoundView from "@/components/NotFoundView";

// 404 Not Found fallback when a task ID does not exist
export default function TasksNotFound() {
  return (
    <NotFoundView
      image="/not-found/task.svg"
      text="This task was not found."
      href="/tasks"
      linkText="Back to Tasks"
    />
  );
}
