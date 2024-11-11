// models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Hash the password before saving
// UserSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   next();
// });

// // Compare input password with stored hash
// UserSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', UserSchema);
// module.exports = User;


const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
     password: { type: String, required: true },
   }, { timestamps: true });

   module.exports = mongoose.model('User', userSchema);
