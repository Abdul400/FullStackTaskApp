const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getSingleTask,
  createTask,
  deleteTask,
  updateTask,
  hideAllDoneTodos,
  filterTasks,
} = require('../controllers/task');

router.route('/').get(getAllTasks).post(createTask).patch(hideAllDoneTodos);
router.route('/search').get(filterTasks);
router.route('/:id').get(getSingleTask).delete(deleteTask).patch(updateTask);

module.exports = router;
