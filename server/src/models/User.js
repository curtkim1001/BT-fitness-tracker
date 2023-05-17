/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "firstName", "lastName"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        admin: { type: ["boolean", "string"] },
        imageUrl: { type: "string" }
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static get relationMappings() {
    const { Routine, Exercise } = require("./index.js")
    
    return {
      routines: {
        relation: Model.HasManyRelation,
        modelClass: Routine,
        join: {
          from: "users.id", 
          to: "routines.userId"
        }
      },
      exercises: {
        relation: Model.HasManyRelation,
        modelClass: Exercise,
        join: {
          from: "users.id",
          to: "exercises.userId"
        }
      }
    }
  }
}

module.exports = User;
