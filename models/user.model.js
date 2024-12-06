const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const { roles } = require('../utils/constants');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: roles.student // หรือค่า default ที่ต้องการ
  },
  name: {
    type: String
  },
  studentID: {
    type: String
  },
  plan: {
    type: String
  },
  other: {
    type: String
  },
  MA105: {
    type: String
  },
  EN101: {
    type: String
  },  
  PH109: {
    type: String
  }
});



UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createHttpError.InternalServerError(error.message);
  }
};

UserSchema.methods.isValidPassword = async function (password) {
  try {
    const isValid = await bcrypt.compare(password, this.password);
    console.log('Password validation:', isValid ? 'success' : 'failed');
    return isValid;
  } catch (error) {
    console.error('Password validation error:', error);
    throw createHttpError.InternalServerError(error.message);
  }
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
