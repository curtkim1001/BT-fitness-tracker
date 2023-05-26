const Model = require("./Model")

class Workout extends Model {
    static get tableName() {
        return "workouts"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "userId", "workoutDate"],
            properties: {
                name: { type: "string" },
                duration: { type: ["string", "integer"] },
                workoutDate: { 
                    "type": "string",
                    "pattern": "^(\\d{4})-(\\d{2})-(\\d{2})$",
                    // "errorMessage": "Please enter a valid date in the format 'YYYY-MM-DD'."
                },
                subcategory: { type: "string" },
                notes: { type : "string" },
                effortLevel: { type : ["string", "integer"]},
                userId: { type: ["integer","string"] }
            }
        }
    }

    static get relationMappings() {
        const { User, Set, Exercise, Location } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "workouts.userId",
                    to: "users.id"
                }
            },
            sets: {
                relation: Model.HasManyRelation,
                modelClass: Set,
                join: {
                    from: "workouts.id",
                    to: "sets.workoutId"
                }
            },
            exercises: {
                relation: Model.ManyToManyRelation,
                modelClass: Exercise,
                join: {
                    from: "workouts.id",
                    through: {
                        from: "sets.workoutId",
                        to: "sets.exerciseId"
                    },
                    to: "exercises.id"
                }
            },
            location: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: "workouts.locationId",
                    to: "locations.id"
                }
            }
        }
    }
}

module.exports = Workout