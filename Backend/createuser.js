const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User.js'); // Adjust the path based on your project structure

async function createUser() {
  try {
    await mongoose.connect('                                      ', {

// await mongoose.connect('mongodb+srv://<username>:<password>@<clustername>.cb6zr.mongodb.net/<folderinside cluster (if any)>', {


      // put your mongo connecting string to creeate user otherwise there is neither delete nor edit button will work 
    




      serverSelectionTimeoutMS: 5000, // Set timeout to 5 seconds
    });


// if you run this the password and user will become 1234 an 1234
// change accordingly
    const hashedPassword = await bcrypt.hash('1234', 10);

    const newUser = new User({
      username: '1234',
      password: hashedPassword,
    });

    await newUser.save();
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.connection.close();
  }
}

createUser();
