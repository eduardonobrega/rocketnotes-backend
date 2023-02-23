exports.up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();

    table
      .integer('note_id')
      .references('id')
      .inTable('notes')
      .notNullable()
      .onDelete('CASCADE');

    table.integer('user_id').references('id').inTable('users').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('tags');
