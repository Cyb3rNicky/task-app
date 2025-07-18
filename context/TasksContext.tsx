import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { fetchTasks, Tasks } from "../lib/api";
import { useUserInfo } from "../lib/userContext";

type NuevaTarea = {
  titulo: string;
  descripcion: string;
  fecha_vencimiento: string;
};

interface TasksContextType {
  tasks: Tasks;
  addTask: (task: NuevaTarea) => Promise<void>;
  refreshTasks: () => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, updatedData: NuevaTarea) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Tasks>([]);
  const { session } = useUserInfo();

  const refreshTasks = async () => {
    if (!session?.user?.id) {
      console.warn("No session, cannot fetch tasks");
      return;
    }

    const { data, error } = await supabase
      .from("tareas")
      .select("*")
      .eq("user_id", session.user.id)
      .order("fecha_vencimiento", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
  };

  const addTask = async (task: NuevaTarea) => {
    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }
    const taskWithUserId = {
      ...task,
      user_id: session.user.id,
    };
    const { data, error } = await supabase
      .from("tareas")
      .insert([taskWithUserId])
      .select();

    if (error) {
      console.error("Error adding task:", error);
    } else {
      setTasks((prev) => [data[0], ...prev]);
    }
  };

  const updateTask = async (taskId: string, updatedData: NuevaTarea) => {
    const { error } = await supabase
      .from("tareas")
      .update(updatedData)
      .eq("id", taskId);

    if (error) {
      console.error("Error updating task:", error.message);
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...updatedData } : task
        )
      );
    }
  };

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase.from("tareas").delete().eq("id", taskId);
    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      refreshTasks();
    }
  }, [session]);

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, refreshTasks, deleteTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
}
