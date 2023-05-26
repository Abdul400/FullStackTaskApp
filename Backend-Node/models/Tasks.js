const mongoose = require('mongoose');
const Task = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please Provide Task Title'],
      minlength: 0,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Please Provide Task Description'],
      minlength: 0,
      maxlength: 1000,
    },
    isDone: {
      default: false,
      type: Boolean,
    },
    tags: {
      type: [String],
      enum: ['Work', 'Study', 'Entertainment', 'Family'],
      required: [true, 'Please Provide Task Tags'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: [true, 'Please provide user'],
    },
    hideAllDoneTasks: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', Task);
