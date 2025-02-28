import { TaskProps } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchTasks ()  {
  const res = await fetch("/api/task");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

async function addTask (title: string) {
    const res = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
  };

  async function updateTaskStatus (id: string){
  const res = await fetch(`/api/changeStatus/${id}`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
};

async function editTask ({ id, title }: { id: string; title: string })  {
  const res = await fetch(`/api/changeTask/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to update task title");
  return res.json();
};

async function deleteTask  (id: string) {
  const res = await fetch(`/api/task/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
};

export function useTasks() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery<TaskProps[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const editTaskMutation = useMutation({
    mutationFn: editTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasks,
    isLoading,
    error,
    addTaskMutation,
    updateStatusMutation,
    editTaskMutation,
    deleteTaskMutation,
  };
}
