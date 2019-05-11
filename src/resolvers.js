const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'çladsfjadçsjfl';
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

module.exports = {
  Query: {
    users: async (root, args, context, info) => {
      try {
        const users = await User.find().sort('-createdAt');
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    user: async (root, { id }, context, info) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    projects: async (root, args, context, info) => {
      try {
        const projects = await Project.find().sort('-createdAt');
        return projects;
      } catch (err) {
        throw new Error(err);
      }
    },
    project: async (root, { id }, context, info) => {
      try {
        const project = await Project.findById(id);
        return project;
      } catch (err) {
        throw new Error(err);
      }
    },
    tasks: async (root, args, context, info) => {
      try {
        let tasks = await Task.find().sort('-createdAt');
        return tasks;
      } catch (err) {
        throw new Error(err);
      }
    },
    pendingTasks: async (root, args, context, info) => {
      try {
        let pendingTasks = await Task.find({ completed: false }).sort('-createdAt');
        return pendingTasks;  
      } catch (err) {
        throw new Error(err);
      }
    },
    task: (root, { id }, context, info) => {
      try {
        const task = Task.findById(id);
        return task;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    register: async (root, { username, password, email }, context, info) => {
      try {
        let user = await User.findOne({ email });
        if (user) {
          throw new Error(`User with email ${email} is already registered`);
        }
        const newUser = await User.create({ username, password, email });
        await newUser.save();
        return newUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (root, { username, password }, context, info) => {
      try {
        const user = await User.findOne({ username }).lean();
        if (!user) {
          throw new Error(`${username} is not registered`);
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        user.password = undefined;
        const token = jwt.sign({ userId: user._id }, SECRET_KEY);

        return {
          user,
          token
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    createProject: async (root, { title, description }, context, info) => {
      try {
        const newProject = await Project.create({ title, description });
        await newProject.save();
        return newProject;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateProject: async (root, args, context, info) => {
      try {
        const project = await Project.updateOne(
          { _id: args.id },
          {
            title: title,
            description: description
          },
          { new: false }
        );
        return project;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteProject: async (root, { id }, context, info) => {
      try {
        await Project.findByIdAndDelete(id);
      } catch (err) {
        throw new Error(err);
      }
    },
    createTask: async (root, { title, completed }, context, info) => {
      try {
        const newTask = await Task.create({ title, completed });
        await newTask.save();
        console.log(newTask);
        return newTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateTask: async (root, args, context, info) => {
      try {
        const task = await Task.updateOne(
          { _id: args.id },
          { title: args.title, completed: args.completed },
          { new: false }
        );
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteTask: async (root, { id }, context, info) => {
      try {
        await Task.findByIdAndDelete(id);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
