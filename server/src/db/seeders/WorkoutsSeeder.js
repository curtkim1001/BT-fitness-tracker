import { Workout } from "../../models/index.js"

class WorkoutsSeeder {
    static async seed() {
        const workoutsData = [
            {exerciseId:1, routineId: 1},
            {exerciseId:2, routineId: 2},
            {exerciseId:3, routineId: 3},
            {exerciseId:4, routineId: 4},
            {exerciseId:5, routineId: 5},
            {exerciseId:6, routineId: 6},
            {exerciseId:7, routineId: 7},
            {exerciseId:8, routineId: 8},
            {exerciseId:9, routineId: 9},
            {exerciseId:10, routineId: 10},
            {exerciseId:11, routineId: 11},
            {exerciseId:12, routineId: 12},
            {exerciseId:13, routineId: 13},
            {exerciseId:14, routineId: 14},
            {exerciseId:15, routineId: 15}
        ]
        for (const singleWorkout of workoutsData) {
            const currentWorkout = await Workout.query().findOne({ routineId: singleWorkout.routineId })
            if (!currentWorkout) {
                await Workout.query().insert(singleWorkout)
            }
        }
    }
}



export default WorkoutsSeeder