import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import "../style/style.css";
const TaskCard = ({ task, onStatusChange,onDelete}) => {
  const [status, setStatus] = useState(task.status || "To Do");
 
  const formattedDueDate = formatDistanceToNow(new Date(task.deadline), {
    addSuffix: true,
  });
  const handleDeleteClick = () => {
    onDelete(task._id); // Call the onDelete function with the task ID
  }
  const handleStatusChange = async (e) => {
    setStatus(e.target.value);
    const newStatus = e.target.value;
    onStatusChange(task._id, newStatus);
  };

  return (
    <div><div className="custom-card grid-item">
    <p className="title">Task Title: {task.taskName || "N/A"}</p>
    <p className="description">
      Description: {task.description.slice(0, 100) + "...." || "N/A"}
    </p>
    <p>Deadline: {formattedDueDate || "N/A"}</p>
    <p>Deadline time: {task.deadlineTime} </p>
    <p>Priority: {task.priority || "N/A"}</p>
    <p>Status</p>
    <div className="form-group select-container">
      <select id="status" value={status} onChange={handleStatusChange}>
        <option value="To Do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Halted">Halted</option>
        <option value="Complete">Complete</option>
      </select>
    </div>
    <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
   
  </div></div>
  );
};
TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.instanceOf(Date).isRequired,
    deadlineTime: PropTypes.string,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
};

export default TaskCard;
