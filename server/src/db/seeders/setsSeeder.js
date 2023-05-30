import { Set } from "../../models/index.js"

class SetsSeeder {
    static async seed() {
        const setsData = [
            {
                workoutId: 1,
                exerciseId: 21,
                miles: 10,
                calories: 1150
            },
            {
                workoutId: 1,
                exerciseId: 22,
                miles: 3,
                workoutSets: 5,
                calories: 300
            },
            {
                workoutId: 3,
                exerciseId: 23,
                miles: 2,
                repetitions: 3,
                calories: 250
            },
            {
                workoutId: 3,
                exerciseId: 24,
                miles: 1,
                calories: 130
            },
            {
                workoutId: 5,
                exerciseId: 25,
                miles: 6.5,
                calories: 680
            },
            {
                workoutId: 5,
                exerciseId: 26,
                miles: 20,
                calories: 1126
            },
            {
                workoutId: 7,
                exerciseId: 27,
                repetitions: 2,
                calories: 150
            },
            {
                workoutId: 7,
                exerciseId: 28,
                repetitions: 3,
                calories: 200
            },
            {
                workoutId: 11,
                exerciseId: 29,
                calories: 350
            },
            {
                workoutId: 11,
                exerciseId: 30,
                repetitions: 4,
                calories: 400
            },
            {
                workoutId: 13,
                exerciseId: 31,
                repetitions:3,
                miles: 1,
                calories: 250
            },
            {
                workoutId: 13,
                exerciseId: 32,
                repetitions: 2,
                miles: 3,
                calories: 720
            },
            {
                workoutId: 15,
                exerciseId: 33,
                miles: 2.5,
                calories: 250
            },
            {
                workoutId: 15,
                exerciseId: 34,
                repetitions: 2,
                calories: 160
            },
            {
                workoutId: 18,
                exerciseId: 35,
                calories: 70,
            },
            {
                workoutId: 18,
                exerciseId: 36,
                calories: 280
            },
            {
                workoutId: 9,
                exerciseId: 37,
                repetitions: 30,
                workoutSets: 3,
                calories: 30
            },
            {
                workoutId: 9,
                exerciseId: 38,
                repetitions: 10,
                workoutSets: 3,
                calories: 120
            },
            {
                workoutId: 9,
                exerciseId: 39,
                repetitions: 15,
                workoutSets: 3,
                calories: 75
            },
            {
                workoutId: 20,
                exerciseId: 40,
                repetitions: 12,
                workoutSets: 5,
                calories: 65
            },
            {
                workoutId: 20,
                exerciseId: 41,
                repetitions: 10,
                workoutSets: 5,
                calories: 45
            },
            {
                workoutId: 20,
                exerciseId: 42,
                repetitions: 10,
                workoutSets: 5,
                calories: 50
            },
            {
                workoutId: 2,
                exerciseId: 1,
                weight: 60,
                repetitions: 10,
                workoutSets: 4
            },
            {
                workoutId: 2,
                exerciseId: 2,
                weight: 135,
                repetitions: 8,
                workoutSets: 4
            },
            {
                workoutId: 2,
                exerciseId: 5,
                weight: 25,
                repetitions: 12,
                workoutSets: 4
            },
            {
                workoutId: 2,
                exerciseId: 8,
                weight: 185,
                repetitions: 10,
                workoutSets: 4
            },
            {
                workoutId: 2,
                exerciseId: 15,
                weight: 45,
                repetitions: 8,
                workoutSets: 4
            },
            {
                workoutId: 6,
                exerciseId: 2,
                weight: 180,
                repetitions: 8,
                workoutSets: 3,
                calories: 92
            },
            {
                workoutId: 6,
                exerciseId: 6,
                weight: 95,
                repetitions: 10,
                workoutSets: 3,
                calories: 48
            },
            {
                workoutId: 6,
                exerciseId: 8,
                weight: 205,
                repetitions: 6,
                workoutSets: 3,
                calories: 73
            },
            {
                workoutId: 6,
                exerciseId: 10,
                weight: 275,
                repetitions: 5,
                workoutSets: 3,
                calories: 75
            },
            {
                workoutId: 6,
                exerciseId: 14,
                repetitions: 20,
                workoutSets: 5,
                calories: 8
            },
            {
                workoutId: 10,
                exerciseId: 1,
                weight: 50,
                repetitions: 12,
                workoutSets: 3,
                calories: 34
            },
            {
                workoutId: 10,
                exerciseId: 3,
                workoutSets: 3,
                calories: 10
            },
            {
                workoutId: 10,
                exerciseId: 7,
                repetitions: 8,
                workoutSets: 3,
                calories: 14
            },
            {
                workoutId: 10,
                exerciseId: 11,
                repetitions: 12,
                workoutSets: 4,
                calories: 24
            },
            {
                workoutId: 10,
                exerciseId: 13,
                weight: 150,
                repetitions: 8,
                workoutSets: 3,
                calories: 38
            },
            {
                workoutId: 10,
                exerciseId: 20,
                repetitions: 15,
                workoutSets: 5,
                calories: 6
            },
            {
                workoutId: 14,
                exerciseId: 1,
                weight: 70,
                repetitions: 8,
                workoutSets: 3,
                calories: 34
            },
            {
                workoutId: 14,
                exerciseId: 2,
                weight: 255,
                repetitions: 4,
                workoutSets: 3,
                calories: 72
            },
            {
                workoutId: 14,
                exerciseId: 4,
                repetitions: 7,
                workoutSets: 5,
                calories: 9
            },
            {
                workoutId: 14,
                exerciseId: 5,
                weight: 35,
                repetitions: 10,
                workoutSets: 3,
                calories: 14
            },
            {
                workoutId: 14,
                exerciseId: 10,
                weight: 205,
                repetitions: 8,
                workoutSets: 3,
                calories: 75
            },
            {
                workoutId: 17,
                exerciseId: 4,
                repetitions: 10,
                workoutSets: 5,
                calories: 12
            },
            {
                workoutId: 17,
                exerciseId: 6,
                weight: 75,
                repetitions: 8,
                workoutSets: 3,
                calories: 36
            },
            {
                workoutId: 17,
                exerciseId: 7,
                repetitions: 10,
                workoutSets: 3,
                calories: 14
            },
            {
                workoutId: 17,
                exerciseId: 9,
                repetitions: 20,
                workoutSets: 3,
                calories: 8
            },
            {
                workoutId: 17,
                exerciseId: 12,
                weight: 320,
                repetitions: 12,
                workoutSets: 5,
                calories: 48
            },
            {
                workoutId: 17,
                exerciseId: 19,
                weight: 120,
                repetitions: 10,
                workoutSets: 3,
                calories: 20
            },
            {
                workoutId: 19,
                exerciseId: 16,
                repetitions: 12,
                workoutSets: 3,
                calories: 20
            },
            {
                workoutId: 19,
                exerciseId: 17,
                weight: 80,
                repetitions: 8,
                workoutSets: 3,
                calories: 20
            },
            {
                workoutId: 19,
                exerciseId: 18,
                repetitions: 25,
                workoutSets: 4,
                calories: 10
            },
        ]
        for (const singleSet of setsData) {
            const currentSet = await Set.query().findOne({ workoutId: singleSet.workoutId, exerciseId: singleSet.exerciseId })
            if (!currentSet) {
                await Set.query().insert(singleSet)
            }
        }
    }
}

export default SetsSeeder