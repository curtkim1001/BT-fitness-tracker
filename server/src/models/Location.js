const Model = require("./Model")

class Location extends Model {
    static get tableName() {
        return "locations"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "address"],
            properties: {
                name: { type: "string" },
                address: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { Workout } = require("./index.js")
        return {
            workouts: {
                relation: Model.HasManyRelation,
                modelClass: Workout,
                join: {
                    from: "locations.id",
                    to: "workouts.locationId"
                }
            }
        }
    }
}

module.exports = Location