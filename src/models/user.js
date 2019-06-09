const mongoose = require('mongoose');
const { hash } = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    password: String
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10);
    } catch (err) {
      next(err);
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
