const { Model } = require("objection");

class Password extends Model {
  static get tableName() {
    return "passwords";
  }
}

module.exports = Password;
