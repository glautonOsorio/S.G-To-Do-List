import { useCallback } from "react";

type FilterButtonsProps = {
  currentFilter: "all" | "completed" | "incomplete";
  onChangeFilter: (filter: "all" | "completed" | "incomplete") => void;
};

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onChangeFilter,
}) => {
  const handleFilterClick = useCallback(
    (filter: "all" | "completed" | "incomplete") => {
      onChangeFilter(filter);
    },
    [onChangeFilter]
  );

  return (
    <div>
      {["all", "completed", "incomplete"].map((filter) => (
        <button
          key={filter}
          onClick={() =>
            handleFilterClick(filter as "all" | "completed" | "incomplete")
          }
          style={{ fontWeight: currentFilter === filter ? "bold" : "normal" }}
        >
          {" "}
          {filter}{" "}
        </button>
      ))}
    </div>
  );
};
