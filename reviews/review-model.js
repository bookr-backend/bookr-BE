const db=require('../database/dbConfig.js');

module.exports={
    // find,
    
     findReviewById,
    findReviewsByBookId,
    //  add,
    // remove,
    // update,
     addReview
}





//GET BY Review ID
function findReviewById(id){
    return db('reviews').
    where({id})
}


// GET Reviews BY Book_ID

function findReviewsByBookId(book_id){
    return db('books')
    .join('reviews','books.id','reviews.book_id')
    .select('reviews.id','books.id as book_id','books.title','reviews.contents','reviews.user_id')
    .where({book_id})
    .orderBy('reviews.id');
  
   }

   async function addReview(review){
    const [id] = await db('reviews').insert(review);
    return findReviewsByBookId(review.book_id); 
 }