import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./card";
import "../style/style.css";
import "../style/App.css";
import TaskForm from "./taskform";
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deadline, setDeadline] = useState("");
  useEffect(() => {
    // Fetch tasks from the backend API when the component mounts
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);
  const handleCancelForm = () => {
    setShowForm(false);
  };
  const handleDelete = async (taskId) => {
    try {
    
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error);
     
    }
  };
  const handleStatusChange = async (taskId, newStatus) => {
    if (newStatus === "Complete") {
      // Set the deadline to the current date and time when the task is complete
      setDeadline(new Date('1970-01-01T00:00:00.000Z'));
      

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status: "complete", deadline: deadline }
            : task
        )
      );
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: newStatus, deadline: deadline } // Assuming 'deadline' is the correct state variable
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      // Handle errors (e.g., show an error message)
    }
  };
  const handleUpdate = async (taskId, updatedTaskData) => {
    try {
      // Make a PUT request to your server to update the task
      const response = await axios.put(`/api/tasks/${taskId}`, updatedTaskData);

      // Assuming your server responds with the updated task data
      const updatedTask = response.data;

      // Update the local tasks state to reflect the changes
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., show an error message)
    }
  };
  return (
    <div className="task-board">
      {showForm ? (
        <TaskForm
          onCancel={handleCancelForm}
                    
        />
      ) : (
        <>
          <h1 className="big-heading app-heading">Tasks</h1>
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="custom-button add-task"
          >
            Add Task
          </button>
          
          <div
            className="card-container"
            style={{ backgroundColor: "#b5e1ff" }}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskBoard;
