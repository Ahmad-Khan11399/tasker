import { useState } from "react";
import "../style/index.css";
import "../style/App.css";
import axios from "axios";
const TaskForm = ({ onCancel }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadlineTime, setDeadlineTime] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  {
        // Create mode: Send a POST request to create a new task
        const response = await axios.post("http://localhost:5000/api/tasks", {
          taskName,
          description,
          deadline,
          priority,
          deadlineTime,
        });

        console.log("Task created:", response.data);
      }

      // Clear form fields or perform any other actions
      setTaskName("");
      setDescription("");
      setDeadline("");
      setPriority("Medium");
      setDeadlineTime("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="task-form">
      <h2 className="big-heading">Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskName">Task Name</label>
          <input
            className="task"
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            className="date"
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadlineTime">Deadline Time</label>
          <input
            type="time"
            id="deadlineTime"
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button className="custom-button" type="submit">
         Add a task
        </button>
        <button onClick={onCancel} className="custom-button">
          Back
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
