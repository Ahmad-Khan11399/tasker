import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/taskDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a mongoose model and schema for tasks
const taskSchema = new mongoose.Schema({
  taskName: String,
  description: String,
  deadline: Date,
  deadlineTime: String,
  priority: String,
  status: {
    type: String,
    enum: ["To Do", "Doing", "Halted", "Complete"],
    default: "To Do",
  },
  timestamps: { createdAt: Date, updatedAt: Date },
});

const Task = mongoose.model("Task", taskSchema);

// Export the Task model
export { Task };

// Create API routes for tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = new Task(taskData);
    console.log(newTask);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// ... Add more CRUD routes for tasks ...
app.delete("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find and delete the task by _id
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send(); // Successful deletion, no content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
