const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true , 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [function() { return !this.googleId; }, 'Password is required'],
    minlength: 6,
    select: false
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  role: {
    type: String,
    enum: ['teacher', 'admin'],
    default: 'teacher'
  },
  // Bumped on logout (and available for a future "log out everywhere" /
  // password-change flow) so a previously issued JWT can be invalidated
  // before its natural expiry — see middleware/auth.js `protect`.
  tokenVersion: {
    type: Number,
    default: 0
  },
  savedTutors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
     return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);