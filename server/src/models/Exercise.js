const { Model } = require("objection")

class Exercise extends Model {
    static get tableName() {
        return "exercises"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [ "name" ],
            properties: {
                name: {
                    type: "string"
                },
                description: {
                    type: "string"
                },
                muscleGroup: {
                    type: "string"
                },
                bodyFunction: {
                    type: "string"
                },
                instructions: {
                    type: "string"
                },
                videoUrl: {
                    type: "string"
                },
                equipment: {
                    type: "string"
                },
                notes: {
                    type: "string"
                }
            }
        }
    }
    static get relationMappings(){
        const { Set, Workout } = require("./index.js")
        return {
            workouts: {
                relation: Model.ManyToManyRelation,
                modelClass: Workout,
                join: {
                    from: "exercises.id",
                    through: {
                        from: "sets.exerciseId",
                        to: "sets.workoutId"
                    },
                    to: "workouts.id"
                }
            },
            sets: {
                relation: Model.HasManyRelation,
                modelClass: Set,
                join: {
                    from: "exercises.id",
                    to: "sets.exerciseId"
                }
            },
        }
    }
}

module.exports = Exercise