const Task = require('../models/Task');

async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
}

async function addTask(req, res) {
  try {
    const title = req.body.title?.trim() || '';
    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task.' });
  }
}

async function toggleTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle task.' });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task.' });
  }
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
