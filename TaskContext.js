import React, { createContext, useContext, useReducer, useCallback } from "react";
import { INITIAL_TASKS } from "../utils/constants";

const TaskContext = createContext(null);

function taskReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.task, ...state];
    case "UPDATE":
      return state.map((t) => (t.id === action.task.id ? action.task : t));
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    case "STATUS":
      return state.map((t) => (t.id === action.id ? { ...t, status: action.status } : t));
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, INITIAL_TASKS);

  const createTask = useCallback((task, userId) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdBy: userId,
      createdAt: new Date().toISOString().slice(0, 10),
      comments: task.comments || [],
      subtasks: task.subtasks || [],
    };
    dispatch({ type: "CREATE", task: newTask });
    return newTask;
  }, []);

  const updateTask = useCallback((task) => {
    dispatch({ type: "UPDATE", task });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE", id });
  }, []);

  const changeStatus = useCallback((id, status) => {
    dispatch({ type: "STATUS", id, status });
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, changeStatus }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
