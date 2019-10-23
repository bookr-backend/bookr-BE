
exports.up = function(knex) {
    return (
        knex
        .schema
        .createTable('users', users => {
            users.increments('id').primary();
            users.string('username', 128).notNullable().unique();
            users.string('password', 128).notNullable();
        })
        .createTable('books',tbl => {
            tbl.increments('id').primary();
            tbl.text('title',128).notNullable();
            tbl.text('author',128).notNullable(); 
            tbl.text('publisher',128).notNullable();
            tbl.text('synopsis',256).notNullable();
            tbl.text('cover_image',128).notNullable();
            tbl.text('purchase_url',128);
            tbl.integer('added_by')
                .unsigned()
                .notNullable();
            tbl.foreign('added_by')
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('reviews',tbl => {
            tbl.increments();
            tbl.text('contents',128);
            tbl.integer('rating', 5);
            tbl.integer('book_id')
                .references('id')
                .inTable('books')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('added_by')
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
