
import { Link, useLocation } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function Navbar() {
  const location = useLocation();
  const { tasks } = useTasks();
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">✅</span>
        <span className="brand-name">TaskFlow</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            🏠 Home
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className={location.pathname === "/add" ? "active" : ""}
          >
            ➕ Add Task
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={location.pathname === "/completed" ? "active" : ""}
          >
            🏆 Completed
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
          >
            ℹ️ About
          </Link>
        </li>
      </ul>
      <div className="navbar-badge">
        <span className="badge">{pendingCount} Pending</span>
      </div>
    </nav>
  );
}

export default Navbar;
