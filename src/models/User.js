const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
      select: false
    },
    email: {
      type: String,
      lowercase: true,
      require: true
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: String,
      select: false
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
