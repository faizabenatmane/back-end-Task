const mongoose= require('mongoose');

//Define the book Schema for the book collection
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    }
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;