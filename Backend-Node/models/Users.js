const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'please provide username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'please provide a proper email'],
      unique: true,
      match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      type: String,
      required: [true, 'please provide a valid password'],
      minlength: 8,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

//hash the password to be saved in db
User.pre('save', async function (next) {
  try {
    const password = this.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    this.password = hash;
    next();
  } catch (error) {
    console.log('hellooooo....');
    console.log(error);
  }
});

//generate a json Web token
User.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, username: this.username },
    process.env.SECRET_KEY,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return token;
};

//comparison of passwords
User.methods.comparePasswords = async function (clientPassword) {
  const isMatch = await bcrypt.compare(clientPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', User);
