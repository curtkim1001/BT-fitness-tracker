const Model = require("./Model")

class Workout extends Model {
    static get tableName() {
        return "workouts"
    }

    static get relationMappings() {
        const { Routine, Exercise } = require("./index.js")
        return {
            routine: {
                relation: Model.BelongsToOneRelation,
                modelClass: Routine,
                join: {
                    from: "workouts.routineId",
                    to: "routines.id"
                }
            },
            exercise: {
                relation: Model.BelongsToOneRelation,
                modelClass: Exercise,
                join: {
                    from: "workouts.exerciseId",
                    to: "exercises.id"
                }
            }
        }
    }
}

module.exports = Workout