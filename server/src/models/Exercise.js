const { Model } = require("objection")

class Exercise extends Model {
    static get tableName() {
        return "exercises"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [ "name", "userId" ],
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
                }
            }
        }
    }
    static get relationMappings(){
        const { User, Workout, Routine } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "exercises.userId",
                    to: "users.id"
                }
            },
            routines: {
                relation: Model.ManyToManyRelation,
                modelClass: Routine,
                join: {
                    from: "exercises.id",
                    through: {
                        from: "workouts.exerciseId",
                        to: "workouts.routineId"
                    },
                    to: "routines.id"
                }
            },
            workouts: {
                relation: Model.HasManyRelation,
                modelClass: Workout,
                join: {
                    from: "exercises.id",
                    to: "workouts.exerciseId"
                }
            },
        }
    }
}

module.exports = Exercise