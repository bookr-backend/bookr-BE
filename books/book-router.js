const express = require('express');
const Books = require('./book-model.js');
const validateToken = require('../auth/validate.js');

const router = express.Router();

// CREATE
router.post('/',validateToken, async (req, res) => {
  const bookData = req.body;

  try {
    const addedBook = await Books.add(bookData);
    res.status(201).json(addedBook);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new book:' + err });
  }
});

// READ
router.get('/',validateToken, async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get books:' + err });
  }
});

router.get('/:id',validateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findById(id);

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Could not find book with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get books:' + err });
  }
});

// UPDATE
router.put('/:id',validateToken, async (req, res) => {
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
    res.status(500).json({ message: 'Failed to update book:' + err });
  }
});

// DELETE
router.delete('/:id',validateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findById(id);

    if (book) {
      const updatedBookList = await Books.remove(id);
      res.json(updatedBookList);
    } else {
      res.status(404).json({ message: 'Could not find book with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book: '+err });
  }
});

module.exports = router;