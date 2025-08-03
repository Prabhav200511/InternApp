const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Define the Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['intern', 'admin'],
    default: 'intern'
  }
}, { timestamps: true }); // It's good practice to add timestamps


// 2. Add middleware BEFORE creating the model
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// 3. Add custom methods BEFORE creating the model
userSchema.methods.comparePassword = async function (candidatePassword) {
  // 'this.password' refers to the password of the specific user document
  return await bcrypt.compare(candidatePassword, this.password);
};


// 4. Create and export the model AFTER all methods and middleware are added
module.exports = mongoose.model('User', userSchema);