exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("addresses")
    .del()
    .then(() => {
      return knex("users").del();
    })
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          first_name: "",
          password:
            "$2b$10$f6x2AFyhLUend3iOOC.jxejZHEPI1A4Qz0g9N0Ixcs5iZFZA/ZGHu"
        },
        {
          username: "poweruser",
          password:
            "$2b$10$f6x2AFyhLUend3iOOC.jxejZHEPI1A4Qz0g9N0Ixcs5iZFZA/ZGHu"
        }
      ]);
    })
    .then(userId => {
      return knex("addresses").insert([
        { user_id: userId[0], address_1: "something street 123" }
      ]);
    });
};
