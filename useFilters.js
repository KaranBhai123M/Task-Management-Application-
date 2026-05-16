import { useState, useMemo } from "react";
import { filterTasks } from "../utils/helpers";

export function useFilters(tasks) {
  const [search,   setSearch]   = useState("");
  const [status,   setStatus]   = useState("all");
  const [priority, setPriority] = useState("all");
  const [assignee, setAssignee] = useState("all");

  const filtered = useMemo(
    () => filterTasks(tasks, { search, status, priority, assignee }),
    [tasks, search, status, priority, assignee]
  );

  const clearFilters = () => {
    setSearch(""); setStatus("all"); setPriority("all"); setAssignee("all");
  };

  return {
    filtered,
    filters: { search, status, priority, assignee },
    setSearch, setStatus, setPriority, setAssignee, clearFilters,
  };
}
