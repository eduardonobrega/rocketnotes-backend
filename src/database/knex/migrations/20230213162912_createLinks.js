exports.up = (knex) =>
  knex.schema.createTable('links', (table) => {
    table.increments('id').primary();
    table.text('url').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());

    table
      .integer('note_id')
      .references('id')
      .inTable('notes')
      .notNullable()
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTable('links');
