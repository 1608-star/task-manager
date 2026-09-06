import { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

// Reducer function - Week 6 Advanced Hooks
function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "COMPLETE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, status: "Completed" } : t
      );
    case "INPROGRESS":
      return state.map((t) =>
        t.id === action.payload ? { ...t, status: "In Progress" } : t
      );
    case "EDIT":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload.data } : t
      );
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Week 4 - useEffect: Load from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("taskflow-tasks");
    if (saved) {
      dispatch({ type: "LOAD", payload: JSON.parse(saved) });
    } else {
      // Default sample tasks
      const defaults = [
        {
          id: 1,
          title: "Complete React Setup",
          description: "Install Node.js and create React app using Vite",
          status: "Completed",
          priority: "High",
          createdAt: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          title: "Study Components & Props",
          description: "Learn how to create reusable React components",
          status: "In Progress",
          priority: "High",
          createdAt: new Date().toLocaleDateString(),
        },
        {
          id: 3,
          title: "Build Task Manager App",
          description: "Full stack MERN application for BCA project",
          status: "Pending",
          priority: "Medium",
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      dispatch({ type: "LOAD", payload: defaults });
    }
  }, []);

  // Week 4 - useEffect: Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook
export function useTasks() {
  return useContext(TaskContext);
}
