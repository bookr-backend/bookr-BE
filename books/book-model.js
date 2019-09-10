const db=require('../database/dbConfig.js');
 
 module.exports={
    find,
    findById,
    add,
    remove,
    update,
    
}
// GET
function find(){
    return db('books');
}

//GET BY ID
function findById(id){
    return db('books').
    where({id})
}


// POST
async function add(book){
    const [id] = await db('books').insert(book);
    return findById(id);
}
// DELETE
function remove(id){
    return  db('books').where({ id }).del();
}



//PUT
async function update(changes,id){
    return await db('books').where({ id }).update(changes);
} 
