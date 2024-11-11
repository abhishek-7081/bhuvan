const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes= require('./routes/auth.js')



const Color = require('./models/color.js'); // Assuming you have a Color model



//middlewares
app.use(cors());
app.use(express.json());



// Card Schema
const cardSchema = new mongoose.Schema({
    title: String,
    // category: String,
    author: String,
    category: {
        type: String,
        required: true
    },

    text: String,

    // // for likes
    // likes: {
    //     type: Number,
    //     default: 0
    // },
});

const Card = mongoose.model('Card', cardSchema);


// to show cards
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
        // console.log(cards)
        // console.log("hula")
    } catch (error) {
        console.log("lula")
        res.status(500).json({ message: error.message });
    }
});



// to update cards
app.put('/api/cards/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCardData = req.body;

    try {
        // Assuming you have a method to find and update the card
        const card = await Card.findById(id); // Adjust this based on your database model
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        console.log("card found");

        // Update card fields here
        card.title = updatedCardData.title;
        card.category = updatedCardData.category;
        card.author = updatedCardData.author;
        card.text = updatedCardData.text;
       
        await card.save(); // Save the updated card

        return res.status(200).json(card); // Send back the updated card
    } catch (error) {
        console.error('Error updating card:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// Create an API route to save the card data
app.post('/api/cards', async (req, res) => {
    try {
        const {  title, category, text, author } = req.body;

        // Create a new card document
        const newCard = new Card({
            title,
            category,
            text,
            author
        });

        // Save the card to the database
        await newCard.save();

        res.status(201).json(newCard); // Respond with the newly created card
    } catch (error) {
        console.error('Error saving card:', error);
        res.status(500).json({ error: 'Failed to save card' });
    }
});




// to delete card
app.delete('/api/cards/:id', async (req, res) => {
    try {
        const cardId = req.params.id;

        // Find and delete the card by ID
        const result = await Card.findByIdAndDelete(cardId);

        if (result) {
            res.status(200).json({ message: 'Card deleted successfully' });
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ message: 'Failed to delete card' });
    }
});




app.use('/api/auth', authRoutes);


// POST route to add colors
app.post('/add-colors', async (req, res) => {
  try {
    const { colors } = req.body; // The list of colors from the form

    // Save colors to the database
    const colorDoc = new Color({ colors });
    await colorDoc.save();

    res.status(200).json({ message: 'Colors added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding colors' });
  }
});

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//port
const port = process.env.PORT;
//listen port
app.listen(port, '0.0.0.0', () => {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
            .bgCyan.white
    );
});