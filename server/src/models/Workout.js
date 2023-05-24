const Model = require("./Model")

class Workout extends Model {
    static get tableName() {
        return "workouts"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "userId"],
            properties: {
                name: { type: "string" },
                duration: { type: ["string", "integer"] },
                // date: { "type": "string", "format": "date-time" },
                subcategory: { type: "string" },
                notes: { type : "string" },
                effortLevel: { type : ["string", "integer"]},
                userId: { type: ["integer","string"] }
            }
        }
    }

    static get relationMappings() {
        const { User, Set, Exercise } = require("./index.js")
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
            }
        }
    }
}

module.exports = Workout