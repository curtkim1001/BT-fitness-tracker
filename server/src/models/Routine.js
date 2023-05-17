const Model = require("./Model")

class Routine extends Model {
    static get tableName() {
        return "routines"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "userId"],
            properties: {
                name: { "type": "string" },
                description: { "type": "string" },
                duration: { "type": ["string", "integer"] },
                // date: { "type": "string", "format": "date" },
                subcategory: { "type": "string" }
            }
        }
    }
    static get relationMappings() {
        const { User, Workout, Exercise } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "routines.userId",
                    to: "users.id"
                }
            },
            workouts: {
                relation: Model.HasManyRelation,
                modelClass: Workout,
                join: {
                    from: "routines.id",
                    to: "workouts.routineId"
                }
            },
            exercises: {
                relation: Model.ManyToManyRelation,
                modelClass: Exercise,
                join: {
                    from: "routines.id",
                    through: {
                        from: "workouts.routineId",
                        to: "workouts.exerciseId"
                    },
                    to: "exercises.id"
                }
            }
        }
    }
}

module.exports = Routine