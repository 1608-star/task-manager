// Week 2 - Components & Props
import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
  const { dispatch } = useTasks();

  const statusColor = {
    Pending: "#f39c12",
    "In Progress": "#3498db",
    Completed: "#2ecc71",
  };

  const priorityColor = {
    High: "#e74c3c",
    Medium: "#f39c12",
    Low: "#2ecc71",
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColor[task.priority] || "#999" }}
        >
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-card-footer">
        <span
          className="status-badge"
          style={{ backgroundColor: statusColor[task.status] || "#999" }}
        >
          {task.status}
        </span>
        <span className="task-date">📅 {task.createdAt}</span>
      </div>

      <div className="task-actions">
        {task.status !== "Completed" && (
          <>
            {task.status !== "In Progress" && (
              <button
                className="btn btn-progress"
                onClick={() =>
                  dispatch({ type: "INPROGRESS", payload: task._id })
                }
              >
                ▶️ Start
              </button>
            )}
            <button
              className="btn btn-complete"
              onClick={() => dispatch({ type: "COMPLETE", payload: task._id })}
            >
              ✅ Complete
            </button>
          </>
        )}
        <button
          className="btn btn-delete"
          onClick={() => dispatch({ type: "DELETE", payload: task._id })}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;