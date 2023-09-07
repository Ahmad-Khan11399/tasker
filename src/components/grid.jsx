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
      // Make your DELETE request to the server and remove the task from tasks.
      // Then, update tasks using setTasks.
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error);
      // Handle the error (e.g., show an error message).
    }
  };
  const handleStatusChange = async (taskId, newStatus) => {
    if (newStatus === "Complete") {
      // Set the deadline to the current date and time when the task is complete
      const newDeadline = new Date();
      setDeadline(newDeadline);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status: "complete", deadline: newDeadline }
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

  return (
    <div className="task-board">
      {showForm ? (
        <TaskForm
          onCancel={handleCancelForm}
          editMode={true}
          initialTaskData={taskDataToEdit}
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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskBoard;
