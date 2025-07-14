import { supabase } from "./supabase";

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tareas")
    .select()
    .order("fecha_vencimiento", { ascending: true });

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  } else {
    return data;
  }
};

export type Tasks = Awaited<ReturnType<typeof fetchTasks>>;
export type Task = Tasks[number];