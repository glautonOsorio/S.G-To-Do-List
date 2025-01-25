"use client";
import { FilterButtons } from "@/components/FilterButtons";
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { useCallback, useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      if (parsedTasks.length > 0) {
        nextId.current = Math.max(...parsedTasks.map((task) => task.id)) + 1;
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
  const clearTasks = useCallback(() => {
    setTasks([]);
    localStorage.removeItem("tasks");
    nextId.current = 1;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-pink-100 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          S.G Task List
        </h1>
        <TaskInput placeholder="Adicione uma tarefa..." onEnter={addTask} />
        <div className="mt-4 flex justify-between items-center">
          <FilterButtons currentFilter={filter} onChangeFilter={changeFilter} />
          <button
            onClick={clearTasks}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6">
          <TaskList tasks={tasks} filter={filter} toggleTask={toggleTask} />
        </div>
      </div>
    </div>
  );
}
