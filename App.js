import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function AppRouter() {
  const { currentUser } = useAuth();
  return currentUser ? <DashboardPage /> : <LoginPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </AuthProvider>
  );
}
