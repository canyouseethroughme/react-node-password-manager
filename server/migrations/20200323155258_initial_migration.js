exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("username").unique();
      table.string("password").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable("passwords", (table) => {
      table.increments("id");
      table.string("account").notNullable();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
      table.timestamps(true, true);
    })
    .createTable("tokens", (table) => {
      table.string("token").notNullable().primary();
      table.integer("ttl").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tokens")
    .dropTableIfExists("passwords")
    .dropTableIfExists("users");
};
