// Week 3 - useState for form
// Week 5 - useNavigate from React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function AddTask() {
  const { dispatch } = useTasks();
  const navigate = useNavigate();

  // Week 3 - useState for form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (formData.title.trim() === "") {
      setError("⚠️ Task Title is required!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim() || "No description provided",
      priority: formData.priority,
      status: formData.status,
      createdAt: new Date().toLocaleDateString(),
    };

    dispatch({ type: "ADD", payload: newTask });
    setSuccess(true);
    setError("");

    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
    });

    // Redirect to home after 1.5 seconds
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">➕ Add New Task</h1>
        <p className="page-subtitle">Fill in the details below to create a new task</p>
      </div>

      <div className="form-container">
        {success && (
          <div className="alert alert-success">
            ✅ Task added successfully! Redirecting...
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description..."
              className="form-input form-textarea"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-input"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Initial Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">▶️ In Progress</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              ➕ Add Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
