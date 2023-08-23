const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo.js');

router.get('/', async (req, res) => {
    try {
      console.log('Fetching all tasks...');
      const todos = await Todo.find();
      console.log('Fetched tasks:', todos);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    description: req.body.description,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a todo's completion status
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = req.body.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
