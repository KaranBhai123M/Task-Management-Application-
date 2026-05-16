import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import { useToast } from "../hooks/useToast";
import { useFilters } from "../hooks/useFilters";
import Navbar from "../components/Navbar";
import StatsBar from "../components/StatsBar";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import Badge from "../components/Badge";
import Toast from "../components/Toast";
import { STATUS_LABEL, STATUS_COLOR, STATUS_BG, STATUSES, PRIORITY_COLOR, PRIORITY_BG } from "../utils/constants";
import { futureDateISO, isOverdue } from "../utils/helpers";

export default function DashboardPage() {
  const { currentUser, allUsers } = useAuth();
  const { tasks, createTask, updateTask, deleteTask, changeStatus } = useTasks();
  const { toast, notify } = useToast();
  const { filtered, filters, setSearch, setStatus, setPriority, clearFilters } = useFilters(tasks);

  const [view, setView]           = useState("kanban");
  const [kanbanCol, setKanbanCol] = useState("todo");
  const [modal, setModal]         = useState(null);

  const newTaskTemplate = {
    title: "", description: "", status: "todo", priority: "medium",
    category: "Frontend", assignee: currentUser?.id || 1,
    dueDate: futureDateISO(7), comments: [], subtasks: [],
  };

  const handleSave = (form) => {
    if (form.id) { updateTask(form);           notify("Task updated!"); }
    else          { createTask(form, currentUser.id); notify("Task created!"); }
    setModal(null);
  };

  const handleDelete = (id) => { deleteTask(id); notify("Task deleted.", "danger"); };

  const colTasks = filtered.filter((t) => t.status === kanbanCol);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f0" }}>
      <Navbar onNewTask={() => setModal({ ...newTaskTemplate })} view={view} setView={setView} />

      <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
        <StatsBar tasks={tasks} currentUser={currentUser} />
        <FilterBar filters={filters} setSearch={setSearch} setStatus={setStatus} setPriority={setPriority} clearFilters={clearFilters} />

        {/* Kanban View */}
        {view === "kanban" && (
          <>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}>
              {STATUSES.map((s) => (
                <button key={s} onClick={() => setKanbanCol(s)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid #e2e2dd", background: kanbanCol === s ? "#1a1a18" : "#fff", color: kanbanCol === s ? "#fff" : "#888780", fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {STATUS_LABEL[s]} ({filtered.filter((t) => t.status === s).length})
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#444441" }}>{STATUS_LABEL[kanbanCol]}</span>
              <Badge text={`${colTasks.length} task${colTasks.length !== 1 ? "s" : ""}`} color={STATUS_COLOR[kanbanCol]} bg={STATUS_BG[kanbanCol]} />
            </div>
            {colTasks.map((t) => <TaskCard key={t.id} task={t} onOpen={() => setModal({ ...t })} />)}
            {!colTasks.length && <div style={{ textAlign: "center", padding: "36px 0", color: "#b4b2a9", fontSize: 14 }}>No tasks in this column</div>}
          </>
        )}

        {/* List View */}
        {view === "list" && (
          <>
            <div style={{ fontSize: 12, color: "#888780", marginBottom: 8 }}>{filtered.length} task{filtered.length !== 1 ? "s" : ""}</div>
            {filtered.map((t) => {
              const overdue = isOverdue(t);
              return (
                <div key={t.id} onClick={() => setModal({ ...t })} style={{ background: "#fff", border: "1px solid #e2e2dd", borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a18", marginBottom: 3 }}>{t.title}</div>
                      <div style={{ fontSize: 11, color: "#888780", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description}</div>
                    </div>
                    <Badge text={t.priority} color={PRIORITY_COLOR[t.priority]} bg={PRIORITY_BG[t.priority]} />
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8 }}>
                    <Badge text={STATUS_LABEL[t.status]} color={STATUS_COLOR[t.status]} bg={STATUS_BG[t.status]} />
                    <Badge text={t.category} color="#888780" bg="#f5f4f0" />
                    <Badge text={t.dueDate} color={overdue ? "#A32D2D" : "#888780"} bg={overdue ? "#FCEBEB" : "#f5f4f0"} />
                  </div>
                </div>
              );
            })}
            {!filtered.length && <div style={{ textAlign: "center", padding: "36px 0", color: "#b4b2a9", fontSize: 14 }}>No tasks found</div>}
          </>
        )}
      </div>

      {modal && (
        <TaskModal
          task={modal}
          users={allUsers}
          currentUser={currentUser}
          onClose={() => setModal(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
      <Toast toast={toast} />
    </div>
  );
}
