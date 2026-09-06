import { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext();
const API_URL = "http://localhost:5000/api/tasks";

// Reducer function - Week 6 Advanced Hooks
// Note: MongoDB documents use `_id`, not `id`
function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((t) => t._id !== action.payload);
    case "COMPLETE":
      return state.map((t) =>
        t._id === action.payload ? { ...t, status: "Completed" } : t
      );
    case "INPROGRESS":
      return state.map((t) =>
        t._id === action.payload ? { ...t, status: "In Progress" } : t
      );
    case "EDIT":
      return state.map((t) =>
        t._id === action.payload.id ? { ...t, ...action.payload.data } : t
      );
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [tasks, rawDispatch] = useReducer(taskReducer, []);

  // Load tasks from the backend/database on first mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          rawDispatch({ type: "LOAD", payload: json.data });
        } else {
          console.error("Failed to load tasks:", json.message);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Wrapped dispatch: performs the matching API call, then updates local
  // state from the server's response so components can keep calling
  // dispatch({ type, payload }) exactly as before.
  async function dispatch(action) {
    switch (action.type) {
      case "ADD": {
        try {
          const { title, description, status, priority } = action.payload;
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, status, priority }),
          });
          const json = await res.json();
          if (json.success) {
            rawDispatch({ type: "ADD", payload: json.data });
          } else {
            console.error("Failed to add task:", json.message);
          }
        } catch (err) {
          console.error("Error adding task:", err);
        }
        break;
      }

      case "DELETE": {
        try {
          const res = await fetch(`${API_URL}/${action.payload}`, {
            method: "DELETE",
          });
          const json = await res.json();
          if (json.success) {
            rawDispatch({ type: "DELETE", payload: action.payload });
          } else {
            console.error("Failed to delete task:", json.message);
          }
        } catch (err) {
          console.error("Error deleting task:", err);
        }
        break;
      }

      case "COMPLETE":
      case "INPROGRESS": {
        const status = action.type === "COMPLETE" ? "Completed" : "In Progress";
        try {
          const res = await fetch(`${API_URL}/${action.payload}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          const json = await res.json();
          if (json.success) {
            rawDispatch({ type: action.type, payload: action.payload });
          } else {
            console.error("Failed to update task:", json.message);
          }
        } catch (err) {
          console.error("Error updating task:", err);
        }
        break;
      }

      case "EDIT": {
        try {
          const { id, data } = action.payload;
          const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const json = await res.json();
          if (json.success) {
            rawDispatch({ type: "EDIT", payload: { id, data: json.data } });
          } else {
            console.error("Failed to edit task:", json.message);
          }
        } catch (err) {
          console.error("Error editing task:", err);
        }
        break;
      }

      default:
        rawDispatch(action);
    }
  }

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