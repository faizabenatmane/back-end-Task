const mongoose = require('mongoose');
const express=require('express');
const app=express();
port =8080;
const Book = require('./bookmodel');

//Connect to the database using Mongoose
mongoose.connect('mongodb://localhost/demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


  app.use(express.json());

  // Get all books
  app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.render('index', { books });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get a specific book by ID
  app.get('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
//   // Create a new book
  app.post('/books', async (req, res) => {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationYear: req.body.publicationYear
    });
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
//   // Update a book by ID
  app.put('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.publicationYear = req.body.publicationYear;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
//   // Delete a book by ID
  app.delete('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      await book.remove();
      res.json({ message: 'Book deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//Set up EJS as the view engine for the application.
  app.set('view engine', 'ejs');
  
  
//Set up the server to listen on a port
app.listen(port,()=>{
    console.log('this server is listening at port http://localhost:',port);
});
