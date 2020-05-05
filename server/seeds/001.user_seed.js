exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("passwords")
    .del()
    .then(() => {
      return knex("users").del();
    })
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "admin",
          first_name: "andrei",
          last_name: "stefan",
          password:
            "$2b$10$f6x2AFyhLUend3iOOC.jxejZHEPI1A4Qz0g9N0Ixcs5iZFZA/ZGHu",
        },
        {
          username: "poweruser",
          first_name: "alin",
          last_name: "george",
          password:
            "$2b$10$f6x2AFyhLUend3iOOC.jxejZHEPI1A4Qz0g9N0Ixcs5iZFZA/ZGHu",
        },
      ]);
    });
};
