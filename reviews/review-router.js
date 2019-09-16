const express = require('express');
const Reviews=require('./review-model.js');
const validateToken = require('../auth/validate.js');

const router = express.Router();

// CREATE
router.post('/',validateToken, async (req, res) => {
    const reviewData = req.body;
    try {
        const addedReview = await Reviews.add(reviewData);
        res.status(201).json(addedReview);
      } catch (err) {
        res.status(500).json({ message: 'Failed to create new review: ' + err });
      }
  });

// READ
router.get('/book/:book_id',validateToken, async (req, res) => {
    const { book_id } = req.params;
  
    try {
      const reviews = await Reviews.findByBookId(book_id);
  
      if (reviews.length) {
        res.json(reviews);
      } else {
        res.status(404).json({ message: 'Could not find reviews for given book' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get reviews: ' + err });
    }
  });

  router.get('/:id',validateToken, async (req, res) => {
    const { id } = req.params;
  
    try {
      const review = await Reviews.findById(id);
  
      if (review) {
        res.json(review);
      } else {
        res.status(404).json({ message: 'Could not find review with given id.' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get reviews: ' + err});
    }
  });
  
  // UPDATE
  router.put('/:id',validateToken, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    try {
      const review = await Reviews.findById(id);
  
      if (review) {
        const updatedReview = await Reviews.update(changes, id);
        res.json(updatedReview);
      } else {
        res.status(404).json({ message: 'Could not find review with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to update review:' + err });
    }
  });

  // DELETE
  router.delete('/:id',validateToken, async (req, res) => {
    const { id } = req.params;
  
    try {
      const review = await Reviews.findById(id);
  
      if (review) {
        const updatedReviewsByBook = await Reviews.remove(id);
        res.json(updatedReviewsByBook);
      } else {
        res.status(404).json({ message: 'Could not find review with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete review: ' + err });
    }
  });

  module.exports = router;