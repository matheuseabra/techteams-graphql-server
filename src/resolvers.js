const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");
const bcrypt = require('bcryptjs');

module.exports = {
  Query: {
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
        console.log(ctx.req.params);
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
  },

  Mutation: {
    register: async (_, { username, password, email }) => {
      try {
        let user = await User.findOne({ email }).lean();
        if (user) {
          throw new Error(`User with email ${ email } is already registered`);
        }
        const _password = await bcrypt.hash(password, 10);     
        const newUser = await User.create({ username, password: _password, email }).save();
        const token = jwt.sign({ userId: user._id }, 'secretKey1324');

        return {
          newUser,
          token
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (_, { username, password }) => {
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
        const token = jwt.sign({ userId: user._id }, 'secretKey1324');

        return {
          user,
          token
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    createProject: async (_, { title, description }) => {
      try {
        const newProject = await Project.create({ title, description });
        await newProject.save();
        return newProject;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateProject: async (_, { id, title, description }) => {
      try {
        const project = await Project.findOneAndUpdate(id, {  title, description });
        await project.save();
        return project;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteProject: async (_, { id }) => {
      try {
        await Project.findByIdAndDelete(id);
      } catch (err) {
        throw new Error(err);
      }
    },
    createTask: async (_, { title, completed }) => {
      try {

        const newTask = await Task.create({ title, completed });
        await newTask.save();
        return newTask;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteTask: async(_, { id }) => {
      try {
        await Task.findByIdAndDelete(id);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
