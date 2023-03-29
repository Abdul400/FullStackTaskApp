const { boolean } = require('joi');
const mongoose = require('mongoose');
const FinishTasks = new mongoose.Schema({
  allTasksAreFinished: {
    type: Boolean,
    default: false,
  },
});

module.exports = FinishTasks;
