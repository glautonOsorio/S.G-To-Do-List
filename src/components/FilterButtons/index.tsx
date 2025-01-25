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
    <div className="flex justify-center gap-4 text-gray-700  text-center text-xl ">
      {["All", "Completed", "Incomplete"].map((filter) => (
        <button
          key={filter.toLowerCase()}
          onClick={() =>
            handleFilterClick(
              filter.toLowerCase() as "all" | "completed" | "incomplete"
            )
          }
          className="hover:text-green-400 "
          style={{
            fontWeight:
              currentFilter === filter.toLowerCase() ? "bold" : "normal",
          }}
        >
          {" "}
          {filter}{" "}
        </button>
      ))}
    </div>
  );
};
