const express = require('express');
const db=require('../database/dbConfig.js');
const Books = require('./book-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get books' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findById(id);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Could not find book with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get books' });
  }
});


  
router.post('/', async (req, res) => {
  const bookData = req.body;

  try {
    const book = await Books.add(bookData);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new book' });
  }
});

router.post('/:id/reviews', async (req, res) => {
  const reviewData = req.body;
  const { id } = req.params; 

  try {
    const book = await Books.findById(id);

    if (book) {
      const review = await Books.addReview(reviewData, id);
      res.status(201).json(review);
    } else {
      res.status(404).json({ message: 'Could not find book with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new review' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const book = await Books.findById(id);

    if (book) {
      const updatedBook = await Books.update(changes, id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Could not find book with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update book' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await  Books.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find book with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
});

module.exports = router;