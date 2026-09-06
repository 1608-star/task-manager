// Week 2 - Components & Props
import TaskCard from "./TaskCard";

function TaskList({ tasks, emptyMessage }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>😕 {emptyMessage || "No tasks found."}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;