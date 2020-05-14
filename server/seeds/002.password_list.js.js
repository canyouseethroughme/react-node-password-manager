exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("passwords")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("passwords").insert([
        {
          account: "facebook",
          username: "marcellus",
          password: "mypassword",
          user_id: 1,
        },
        {
          account: "instagram",
          username: "marcellus",
          password: "mypassword",
          user_id: 1,
        },
        {
          account: "twitter",
          username: "marcellus",
          password: "mypassword",
          user_id: 1,
        },
        {
          account: "facebook",
          username: "wallace",
          password: "anotherpassword",
          user_id: 2,
        },
        {
          account: "instagram",
          username: "wallace",
          password: "anotherpassword",
          user_id: 2,
        },
        {
          account: "twitter",
          username: "wallace",
          password: "anotherpassword",
          user_id: 2,
        },
      ]);
    });
};
