const Task = require('../models/Tasks');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
//get all jobs
const getAllTasks = async (req, res) => {
  const { id, username } = req.user;
  const allTasks = await Task.find({ createdBy: id }).sort('createdAt');
  let areAllTodosHidden =
    allTasks.length > 0 ? allTasks[0].hideAllDoneTasks : false;
  res.status(200).json({
    success: true,
    tasks: allTasks,
    nbHits: allTasks.length,
    user: username,
    areAllTodosHidden: areAllTodosHidden,
  });
};

//get single job
const getSingleTask = async (req, res) => {
  let taskId = req.params.id;
  const { id, username } = req.user;
  const task = await Task.findOne({ _id: taskId, createdBy: id });
  if (!task) {
    throw new NotFoundError(`task with id: ${taskId} not found`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    task: task,
  });
};

//create job
const createTask = async (req, res) => {
  const { id, username } = req.user;
  req.body.createdBy = id;
  const taskData = req.body;
  const task = await Task.create(taskData);
  res.status(StatusCodes.CREATED).json({
    success: true,
    task: task,
  });
};

//delete job
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const { id, username } = req.user;
  const deletedTask = await Task.findByIdAndDelete({
    _id: taskId,
    createdBy: id,
  });
  if (!deletedTask) {
    throw new NotFoundError(`No task with id: ${taskId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: `deleted job  ${taskId}` });
};

//update job
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const update = req.body;
  const { id, username } = req.user;
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: id },
    update,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedTask) {
    throw new NotFoundError(`not job with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, updatedTask: updatedTask });
};
const hideAllDoneTodos = async (req, res) => {
  const update = req.body;
  const { id, username } = req.user;
  const hideDone = await Task.updateMany({ _createdBy: id }, update, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ success: true, task: hideDone });
};
const filterTasks = async (req, res) => {
  const searchGroup = req.query.q;
  console.log(searchGroup);
  const { id, username } = req.user;
  console.log(username);
  console.log(id);
  const filteredResults = await Task.find({
    createdBy: id,
    tags: {
      $elemMatch: { $regex: searchGroup, $options: 'i' },
    },
  }).sort('createdAt');
  res.status(StatusCodes.OK).json({
    success: true,
    tasks: filteredResults,
    nbHits: filteredResults.length,
  });
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
  hideAllDoneTodos,
  filterTasks,
};
