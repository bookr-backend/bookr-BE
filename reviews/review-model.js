const db=require('../database/dbConfig.js');

module.exports={
    add,
    findById,
    findByBookId,
    update,
    remove
}

//CREATE
async function add(review) {
    const [id] = await db('reviews').returning('id').insert(review);
    return findById(id); 
}

// READ
//GET BY Review ID
function findById(id){
    return db('reviews')
    .where({id})
    .first();
}

// GET Reviews BY Book_ID
function findByBookId(book_id){
    return db('books')
    .join('reviews','books.id','reviews.book_id')
    .select('reviews.id','books.id as book_id','books.title','reviews.contents','reviews.user_id')
    .where({book_id})
    .orderBy('reviews.id');
   }

 // UPDATE
async function update(changes,id){
    await db('reviews').where({ id }).update(changes);
    return findById(id);
} 

 // DELETE
async function remove(id){
    const [book_id] = await db('reviews').returning('book_id').where({ id }).del();
    return findByBookId(book_id);
}
