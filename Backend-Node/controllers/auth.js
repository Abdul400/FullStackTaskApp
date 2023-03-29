const { StatusCodes } = require('http-status-codes');
const { badRequestError, unauthorizedError } = require('../errors');
const User = require('../models/Users');

//signup controller
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new badRequestError(
      'please provide valid username, email, and password'
    );
  }
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res
      .status(StatusCodes.OK)
      .json({ user: user.username, token: token, success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new badRequestError('please provide a valid email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new unauthorizedError('User with this email not found');
  }
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new unauthorizedError('invalid credentials, try again');
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ success: true, token: token, user: user.username });
};

module.exports = { login, signUp };
