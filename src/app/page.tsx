"use client";

import { FilterButtons } from "@/components/FilterButtons";
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { useCallback, useRef, useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const nextId = useRef(1);

  const addTask = useCallback((text: string) => {
    setTasks((prev) => [
      ...prev,
      { id: nextId.current++, text, completed: false },
    ]);
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const changeFilter = useCallback(
    (newFilter: "all" | "completed" | "incomplete") => {
      setFilter(newFilter);
    },
    []
  );

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <TaskInput placeholder="Adicione uma tarefa..." onEnter={addTask} />
      <FilterButtons currentFilter={filter} onChangeFilter={changeFilter} />
      <TaskList tasks={tasks} filter={filter} toggleTask={toggleTask} />
    </div>
  );
}
