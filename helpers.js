export const isOverdue = (task) =>
  task.status !== "done" && new Date(task.dueDate) < new Date();

export const subtaskProgress = (subtasks = []) => ({
  done: subtasks.filter((s) => s.done).length,
  total: subtasks.length,
});

export const formatDate = (iso) => iso?.slice(0, 10) ?? "";

export const futureDateISO = (daysAhead = 7) =>
  new Date(Date.now() + daysAhead * 864e5).toISOString().slice(0, 10);

export const filterTasks = (tasks, { search, status, priority, assignee }) =>
  tasks.filter((t) => {
    if (status !== "all" && t.status !== status) return false;
    if (priority !== "all" && t.priority !== priority) return false;
    if (assignee !== "all" && t.assignee !== parseInt(assignee)) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) &&
        !t.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
