import { useMemo } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  filter: "all" | "completed" | "incomplete";
  toggleTask: (id: number) => void;
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  toggleTask,
}) => {
  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((task) => task.completed);
    if (filter === "incomplete") return tasks.filter((task) => !task.completed);

    return tasks;
  }, [tasks, filter]);

  return (
    <ul className="mt-6 space-y-4">
      {filteredTasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center space-x-3 overflow-hidden"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="form-checkbox h-5 w-5 text-green-400 flex-shrink-0"
          />
          <span
            className={`text-lg truncate ${
              task.completed ? "line-through  text-green-500" : "text-gray-900"
            }`}
            title={task.text}
          >
            {task.text}
          </span>
        </li>
      ))}
    </ul>
  );
};
