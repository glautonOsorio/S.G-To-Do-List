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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-pink-100 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          S.G Task List
        </h1>
        <TaskInput placeholder="Adicione uma tarefa..." onEnter={addTask} />
        <div className="mt-4">
          <FilterButtons currentFilter={filter} onChangeFilter={changeFilter} />
        </div>
        <div className="mt-6">
          <TaskList tasks={tasks} filter={filter} toggleTask={toggleTask} />
        </div>
      </div>
    </div>
  );
}
