const { Model } = require("objection");

class Token extends Model {
  static get tableName() {
    return "tokens";
  }
}

module.exports = Token;
