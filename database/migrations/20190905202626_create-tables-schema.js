
exports.up = function(knex) {
    return (
        knex
        .schema
        .createTable('users', users => {
            users.increments();
            users.string('username', 128).notNullable().unique();
            users.string('password', 128).notNullable();
        })
        .createTable('books',tbl => {
            tbl.increments();
            tbl.text('title',128).notNullable();
            tbl.text('author',128).notNullable(); 
            tbl.text('publisher',128).notNullable(); 
        })
        .createTable('reviews',tbl => {
            tbl.increments();
            tbl.text('contents',128);
            tbl.integer('book_id')
                .references('id')
                .inTable('books')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('user_id')
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');   
        })
    )
};

exports.down = function(knex) {
    return knex
            .schema
            .dropTableIfExists('reviews') 
            .dropTableIfExists('books')
            .dropTableIfExists('users');
};
