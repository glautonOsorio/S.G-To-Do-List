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
      <input ref={ref} placeholder={placeholder} onKeyDown={handleKeyDown} />
    );
  }
);

TaskInput.displayName = 'TaskInput';

