const finishTaskModel = require('../models/FinishTasks');
const finishTask = async (req, res) => {
  res.status(200).json({ success: true, message: 'finishTask' });
};

module.exports = finishTask;
