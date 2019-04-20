const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

module.exports = {
  users: async () => {
    try {
      const users = await User.find().sort('-createdAt');
      return users;
    } catch (err) {
      throw new Error(err);
    }
  },
  user: async (_, { id }) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
  projects: async () => {
    try {
      const projects = await Project.find().sort('-createdAt');
      return projects;
    } catch (err) {
      throw new Error(err);
    }
  },
  project: async (_, { id }) => {
    try {
      const project = await Project.findById(id);
      return project;
    } catch (err) {
      throw new Error(err);
    }
  },
  tasks: async () => {
    try {
      const tasks = await Task.find().sort('-createdAt');
      return tasks;
    } catch (err) {
      throw new Error(err);
    }
  },
  task: (_, { id }) => {
    try {
      const task = Task.findById(id);
      return task;
    } catch (err) {
      throw new Error(err);
    }
  }
};
