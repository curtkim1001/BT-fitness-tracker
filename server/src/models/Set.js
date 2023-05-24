const Model = require("./Model")

class Set extends Model {
    static get tableName() {
        return "sets"
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                repetitions: { "type": ["integer","string"] },
                weight: { "type": ["integer","string"] },
                miles: { "type": ["number","string"] },
                calories: { "type": ["number","string"] },
                score: { "type": "string" },
                workoutSets: { "type": ["integer","string"] }
            }
        }
    }

    static get relationMappings() {
        const { Workout, Exercise } = require("./index.js")
        return {
            workout: {
                relation: Model.BelongsToOneRelation,
                modelClass: Workout,
                join: {
                    from: "sets.workoutId",
                    to: "workouts.id"
                }
            },
            exercise: {
                relation: Model.BelongsToOneRelation,
                modelClass: Exercise,
                join: {
                    from: "sets.exerciseId",
                    to: "exercises.id"
                }
            }
        }
    }
}

module.exports = Set