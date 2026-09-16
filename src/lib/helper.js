export default async function apiFetch(endPoint, options = {}) { 
  const res = await fetch(endPoint, options); 
  
  if (!res.ok) { 
    throw new Error(`HTTP error! Status: ${res.status}`); 
  } 
  
  return await res.json(); 
}
/**
 * const tasks = await apiFetch("/tasks"); 
 * 
 * // Data sending request (pass object as second parameter)
 * const newTask = await apiFetch("/tasks", {
 *   method: "POST",
 *   body: JSON.stringify({ title: "Learn JavaScript" })
 * });
 */