import Task from "../models/task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Tasks with Search, Filter & Sort
export const getTasks = async (req, res) => {
    try {
      const { search, status, priority, sort } = req.query;
  
      let query = {
        user: req.user._id,
      };
  
      // Search
      if (search) {
        query.title = {
          $regex: search,
          $options: "i",
        };
      }
  
      // Filter Status
      if (status) {
        query.status = status;
      }
  
      // Filter Priority
      if (priority) {
        query.priority = priority;
      }
  
      let sortOption = { createdAt: -1 };
  
      if (sort === "oldest") {
        sortOption = { createdAt: 1 };
      }
  
      if (sort === "priority") {
        sortOption = { priority: 1 };
      }
  
      const tasks = await Task.find(query).sort(sortOption);
  
      res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Task
export const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      if (task.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Not Authorized",
        });
      }
  
      res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
// Dashboard Data
export const dashboardData = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id });
  
      const totalTasks = tasks.length;
  
      const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
      ).length;
  
      const completedTasks = tasks.filter(
        (task) => task.status === "completed"
      ).length;
  
      const inProgressTasks = tasks.filter(
        (task) => task.status === "in progress"
      ).length;
  
      res.status(200).json({
        success: true,
        dashboard: {
          totalTasks,
          pendingTasks,
          completedTasks,
          inProgressTasks,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  // Task Statistics
export const taskStatistics = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user._id });
  
      const stats = {
        total: tasks.length,
        pending: 0,
        completed: 0,
        inProgress: 0,
        high: 0,
        medium: 0,
        low: 0,
      };
  
      tasks.forEach((task) => {
        // Status Count
        if (task.status === "pending") stats.pending++;
        if (task.status === "completed") stats.completed++;
        if (task.status === "in progress") stats.inProgress++;
  
        // Priority Count
        if (task.priority === "high") stats.high++;
        if (task.priority === "medium") stats.medium++;
        if (task.priority === "low") stats.low++;
      });
  
      res.status(200).json({
        success: true,
        statistics: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };