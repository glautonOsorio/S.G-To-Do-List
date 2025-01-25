import { forwardRef } from "react";

type TaskInputProps = {
  placeholder: string;
  onEnter: (value: string) => void;
};

export const TaskInput = forwardRef<HTMLInputElement, TaskInputProps>(
  ({ placeholder, onEnter }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
        onEnter(e.currentTarget.value.trim());
        e.currentTarget.value = "";
      }
    };
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="flex w-full text-gray-600 p-2 border-2 border-green-400 rounded-md text-lg bg-gray-50"
      />
    );
  }
);

TaskInput.displayName = "TaskInput";
