exports.up = function (knex, Promise) {
  return knex.schema.createTable('btc_address_list', tbl => {
    tbl.increments('id').primary(); // primary key
    tbl.string('address').notNullable();
    tbl
      .dateTime('created_date')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('btc_address_list');
};