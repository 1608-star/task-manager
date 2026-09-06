// Week 5 - React Router page
// Week 6 - useMemo
import { useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";

function Completed() {
  const { tasks, dispatch } = useTasks();

  // Week 6 - useMemo
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === "Completed"),
    [tasks]
  );

  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete all completed tasks?")) {
      completedTasks.forEach((task) => {
        dispatch({ type: "DELETE", payload: task._id });
      });
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">🏆 Completed Tasks</h1>
          <p className="page-subtitle">
            You have completed {completedTasks.length} task(s). Great work!
          </p>
        </div>
        {completedTasks.length > 0 && (
          <button className="btn btn-delete" onClick={clearAll}>
            🗑️ Clear All
          </button>
        )}
      </div>

      <TaskList
        tasks={completedTasks}
        emptyMessage="No completed tasks yet. Start completing tasks!"
      />
    </div>
  );
}

export default Completed;