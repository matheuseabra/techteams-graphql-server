const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String
    },
    completed: false
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', TaskSchema);
