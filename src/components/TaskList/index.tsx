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
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.text}
          </label>
        </li>
      ))}
    </ul>
  );
};
