import { Exercise } from "../../models/index.js"

class ExercisesSeeder {
    static async seed() {

    const exercisesData = [
    {
        userId: 1,
        name: "Push-ups",
        description: "A classic bodyweight exercise targeting the chest, shoulders, and triceps.",
        muscleGroup: "Upper Body",
        bodyFunction: "Strength Training"
    },
    {
        userId: 1,
        name: "Squats",
        description: "A compound exercise targeting the legs and glutes.",
        muscleGroup: "Lower Body",
        bodyFunction: "Strength Training"
    },
    {
        userId: 1,
        name: "Plank",
        description: "A core-strengthening exercise that engages the abdominal muscles.",
        muscleGroup: "Core",
        bodyFunction: "Strength Training"
    },
    {
        userId: 1,
        name: "Lunges",
        description: "An exercise that targets the legs and helps improve balance.",
        muscleGroup: "Lower Body",
        bodyFunction: "Strength Training"
    },
    {
        userId: 1,
        name: "Bicep Curls",
        description: "An isolation exercise for the biceps using dumbbells or resistance bands.",
        muscleGroup: "Arms",
        bodyFunction: "Strength Training"
    },
    {
        userId: 2,
        name: "Deadlifts",
        description: "A compound exercise that targets the posterior chain, including the hamstrings and back.",
        muscleGroup: "Full Body",
        bodyFunction: "Strength Training"
    },
    {
        userId: 2,
        name: "Jumping Jacks",
        description: "A cardio exercise that engages the whole body and increases heart rate.",
        muscleGroup: "Full Body",
        bodyFunction: "Cardiovascular Training"
    },
    {
        userId: 2,
        name: "Mountain Climbers",
        description: "A high-intensity exercise that targets the core and increases cardiovascular endurance.",
        muscleGroup: "Core",
        bodyFunction: "Cardiovascular Training"
    },
    {
        userId: 2,
        name: "Burpees",
        description: "A full-body exercise combining squats, push-ups, and jumps.",
        muscleGroup: "Full Body",
        bodyFunction: "Cardiovascular Training"
    },
    {
        userId: 2,
        name: "Russian Twists",
        description: "An exercise that targets the obliques and improves core stability.",
        muscleGroup: "Core",
        bodyFunction: "Strength Training"
    },
    {
        userId: 3,
        name: "Dumbbell Shoulder Press",
        description: "A compound exercise for the shoulders using dumbbells.",
        muscleGroup: "Shoulders",
        bodyFunction: "Strength Training"
    },
    {
        userId: 3,
        name: "Walking Lunges",
        description: "A variation of lunges performed while walking forward.",
        muscleGroup: "Lower Body",
        bodyFunction: "Strength Training"
    },
    {
        userId: 3,
        name: "Tricep Dips",
        description: "An exercise that targets the triceps using a bench or chair.",
        muscleGroup: "Arms",
        bodyFunction: "Strength Training"
    },
    {
        userId: 3,
        name: "Side Plank",
        description: "A variation of the plank that targets the obliques.",
        muscleGroup: "Core",
        bodyFunction: "Strength Training"
    },
    {
        userId: 3,
        name: "Jump Squats",
        description: "A plyometric exercise that combines squats with explosive jumps.",
        muscleGroup: "Lower Body",
        bodyFunction: "Cardiovascular Training"
    }
    ]
    
    for (const singleExercise of exercisesData) {
        const currentExercise = await Exercise.query().findOne({ name: singleExercise.name})
        if (!currentExercise) {
            await Exercise.query().insert(singleExercise)
        }
    }

    }
}



export default ExercisesSeeder