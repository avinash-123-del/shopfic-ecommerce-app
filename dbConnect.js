const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://avinash01:avinash01@cluster0.vhp2nt0.mongodb.net/backend01'

//Data Schema
const dataschema = new mongoose.Schema({
    email: String,
    password: String
}, {
    timestamps: true
})

const userModel = mongoose.model('productusers', dataschema)

// Connect to MongoDB using async/await
async function connectToDatabase() {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');


    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connectToDatabase, userModel };
