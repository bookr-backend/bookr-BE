const express = require('express');
 const db=require('../database/dbConfig.js');
const Books = require('../books/book-model.js');
const Reviews=require('./review-model.js');

const router = express.Router();


router.get('/book/:book_id', async (req, res) => {
    const { book_id } = req.params;
  
    try {
      const reviews = await Reviews.findReviewsByBookId(book_id);
  
      if (reviews.length) {
        res.json(reviews);
      } else {
        res.status(404).json({ message: 'Could not find reviews for given book' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get reviews: '+err });
    }
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const review = await Reviews.findReviewById(id);
  
      if (review) {
        res.json(review);
      } else {
        res.status(404).json({ message: 'Could not find review with given id.' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get reviews'});
    }
  });
  



router.post('/', async (req, res) => {
   
    const reviewData = req.body;
    try {
        const review = await Reviews.addReview(reviewData);
        res.status(201).json(review);
      } catch (err) {
        res.status(500).json({ message: 'Failed to create new review: '+err });
      }
     
  });


 

  module.exports = router;