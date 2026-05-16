import React, { createContext, useContext, useState, useCallback } from "react";

const USERS = [
  { id: 1, name: "Alex Morgan",  email: "alex@taskflow.io",    password: "alex123",    avatar: "AM", role: "Admin"  },
  { id: 2, name: "Jordan Lee",   email: "jordan@taskflow.io",  password: "jordan123",  avatar: "JL", role: "Member" },
  { id: 3, name: "Sam Rivera",   email: "sam@taskflow.io",     password: "sam123",     avatar: "SR", role: "Member" },
];

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const login = useCallback((email, password) => {
    const user = USERS.find((u) => u.email === email && u.password === password);
    if (user) { setCurrentUser(user); setError(""); return true; }
    setError("Invalid email or password.");
    return false;
  }, []);

  const logout = useCallback(() => setCurrentUser(null), []);
  const switchUser = useCallback((user) => setCurrentUser(user), []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, switchUser, error, setError, allUsers: USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
