exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("username").unique();
      table.string("password");
      table.string("first_name");
      table.string("last_name");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("addresses", table => {
      table.increments("id");
      table.string("address_1");
      table.string("address_2");
      table.string("postal_code");
      table.string("city");
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table.foreign("user_id").references("users.id");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("addresses").dropTableIfExists("users");
};
