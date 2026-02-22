import React, { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const role = localStorage.getItem("role");

  const fetchTasks = useCallback(async () => {
    try {
      const res =
        role === "admin"
          ? await API.get("/tasks/all")
          : await API.get("/tasks");

      setTasks(res.data);
    } catch {
      alert("Session expired. Please sign in again.");
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createTask = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and description are required.");
      return;
    }

    await API.post("/tasks", form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const markCompleted = async (task) => {
    await API.put(`/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      status: "completed",
    });
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditForm({ title: task.title, description: task.description });
  };

  const cancelEdit = () => setEditingTaskId(null);

  const saveEdit = async (task) => {
    await API.put(`/tasks/${task.id}`, {
      title: editForm.title,
      description: editForm.description,
      status: task.status,
    });
    setEditingTaskId(null);
    fetchTasks();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const filteredTasks = tasks
  .filter((task) =>
    filter === "all" ? true : task.status === filter
  )
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-topbar">
        <div>
          <h2>Task Manager</h2>
          <span className="role-chip">{role}</span>
        </div>

        <button className="logout-btn-modern" onClick={logout}>
          Logout
        </button>
      </div>

      {role === "user" && (
        <div className="create-task-card">
          <h3>Create New Task</h3>

          <div className="create-task-row">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />

            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <button onClick={createTask} className="add-btn">
              Add
            </button>
          </div>
        </div>
      )}

      <div className="task-section">
        <h3>Your Tasks</h3>

                <div className="task-controls">
          <input
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-group">
            <button
              className={filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "pending" ? "active-filter" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>

            <button
              className={filter === "completed" ? "active-filter" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {tasks.length === 0 && (
          <div className="empty-state">No tasks available</div>
        )}

        {filteredTasks.map((task) => ( 
          <div key={task.id} className="task-card-clean">
            {editingTaskId === task.id ? (
              <>
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />

                <input
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />

                <div className="task-buttons">
                  <button className="btn-save" onClick={() => saveEdit(task)}>
                    Save
                  </button>
                  <button className="btn-cancel" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="task-header">
                  <strong>{task.title}</strong>
                  <span className={`status-pill ${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <p className="task-desc">{task.description}</p>

                {role === "admin" && (
                  <div className="task-owner">
                    Owner: {task.owner?.username}
                  </div>
                )}

                {role === "user" && (
                  <div className="task-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>

                    {task.status === "pending" && (
                      <button
                        className="btn-complete"
                        onClick={() => markCompleted(task)}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;



