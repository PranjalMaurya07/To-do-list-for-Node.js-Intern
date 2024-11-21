const Todo = require("../model/todolistModel");
const User = require("../model/userModel");

const handleToDoAddController = async (req, res) => {
  try {
    const { title, description, status, category } = req.body;

    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).send({ message: "Description is required" });
    }
    if (dueDate && isNaN(new Date(dueDate))) {
      return res.status(400).json({
        success: false,
        message: "Invalid due date.",
      });
    }
    const categories = [
      "Work",
      "Personal",
      "Others",
    ];
    if (category && !categories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category.",
      });
    }

    const existingTitle = await Todo.findOne({ title });
    if (existingTitle) {
      return res.status(400).send({
        success: false,
        message: "Title already exists.",
      });
    }
    const todo = await Todo.create({
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      category: category || "Others",
      user: req.user.user_id,
    });
    return res.status(201).json({
      success: true,
      message: "Todo added successfully.",
      todo,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: "Some error occurred in adding todo.",
      e,
    });
  }
};

const handleGetTitleController = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const todos = await Todo.find({ user: userId }, "title");
    res.status(200).json({
      success: true,
      total_todos: todos.length,
      todos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos.",
    });
  }
};

const handleUpdateTodosController = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { status } = req.body;

    const todo = await Todo.findOne({ _id: id, user: userId });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "To-Do not found or you don't have permission to update it.",
      });
    }

    // Update the To-Do status
    if (todo.status.toLowerCase() === "completed") {
      return res.status(400).json({
        success: false,
        message: "This task is already completed and cannot be marked again.",
        todo,
      });
    }
    todo.status = status;
    await todo.save();

    res.status(200).json({
      success: true,
      message: "To-Do updated successfully.",
      todo,
    });
  } catch (err) {
    console.error("Error updating To-Do:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update To-Do.",
    });
  }
};

const handleDeleteTodosController = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "To-Do not found or you don't have permission to delete it.",
      });
    }

    res.status(200).json({
      success: true,
      message: "To-Do deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting To-Do:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete To-Do.",
    });
  }
};

module.exports = {
  handleToDoAddController,
  handleGetTitleController,
  handleUpdateTodosController,
  handleDeleteTodosController,
};
