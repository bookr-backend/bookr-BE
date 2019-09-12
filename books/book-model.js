const db=require('../database/dbConfig.js');
 
 module.exports={
    add,
    find,
    findById,
    update,
    remove    
}

// CREATE
async function add(book){
    const [id] = await db('books').returning('id').insert(book);
    return findById(id);
}

// READ
// GET
function find(){
    return db('books');
}

//GET BY ID
function findById(id){
    return db('books')
    .where({id})
    .first();
}

// UPDATE
async function update(changes,id){
    await db('books').where({ id }).update(changes);
    return findById(id);
} 

// DELETE
async function remove(id){
    await db('books').where({ id }).del();
    return find();
}
