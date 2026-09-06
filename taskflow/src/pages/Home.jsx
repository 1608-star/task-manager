// Week 3 - useState
// Week 4 - useEffect
// Week 6 - useMemo for filtering
import { useState, useEffect, useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";

function Home() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Week 4 - useEffect: Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Week 6 - useMemo: Filter tasks efficiently
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter = filter === "All" || task.status === filter;
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">📋 All Tasks</h1>
          <p className="page-subtitle">🕐 {time}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-card stat-pending">
          <h3>{pendingTasks}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card stat-progress">
          <h3>{inProgressTasks}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card stat-done">
          <h3>{completedTasks}</h3>
          <p>Completed</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          {["All", "Pending", "In Progress", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "filter-active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        emptyMessage="No Tasks match your filter. Add a new task!"
      />
    </div>
  );
}

export default Home;
