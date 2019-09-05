# bookr-BE
Build week backend project for Bookr app

Book API:
1. Add a book (POST /api/book/)
2. Get all books (GET /api/books/)
3. Get a book by id (GET /api/book/{id})
4. Delete a book by id (DELETE /api/book/{id})
5. Update a book by id (PUT /api/book/{id})

Review API:
1. Add a review (for a book) (POST /api/review/ - book id in the post body)
2. Get all reviews (for a book) (GET /api/reviews?bookid={bookid})
3. Get a review by id (review id should be globally unique) (GET /api/review/{id})
4. Delete a review by id (review id should be globally unique) (DELETE /api/review/{id})
5. Update a review by id review id should be globally unique) (PUT /api/review/{id})
