const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  handleToDoAddController,
  handleGetTitleController,
  handleUpdateTodosController,
  handleDeleteTodosController,
} = require("../controllers/todoController");
const router = express.Router();

// Add todo
router.post("/", auth, handleToDoAddController);

// Get todos
router.get("/", auth, handleGetTitleController);

// Update todo
router.put("/update/:id", auth, handleUpdateTodosController);

// Delete todo
router.delete("/delete/:id", auth, handleDeleteTodosController);

module.exports = router;
