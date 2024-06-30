const Task = require("../models/task");

module.exports = {
  async createTask(req, res) {
    try {
      const { title, description, status } = req.body;
      const task = new Task({ title, description, status });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getTasks(req, res) {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true }
      );
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
