import { Workout } from "../../models/index.js";

class WorkoutsSeeder {
  static async seed() {
    const workoutsData = [
        {
            userId: 2,
            name: "Morning Jog",
            duration: 30,
            subcategory: "cardio training",
            workoutDate: "2023-04-25",
            notes: "",
            effortLevel: 7
        },
        {
            userId: 3,
            name: "Weightlifting Session",
            duration: 60,
            subcategory: "weight/resistance training",
            workoutDate: "2023-04-26",
            notes: "Focus on upper body exercises",
            effortLevel: 9
        },
        {
            userId: 1,
            name: "Soccer Practice",
            duration: 90,
            subcategory: "sports",
            workoutDate: "2023-04-27",
            effortLevel: 8
        },
        {
            userId: 2,
            name: "Yoga Class",
            duration: 75,
            subcategory: "flexibility training",
            workoutDate: "2023-04-28",
            effortLevel: 5
        },
        {
            userId: 1,
            name: "Cycling Adventure",
            duration: 120,
            subcategory: "cardio training",
            workoutDate: "2023-04-29",
            notes: "Explore new trails",
            effortLevel: 6
        },
        {
            userId: 3,
            name: "Strength Training",
            duration: 45,
            subcategory: "weight/resistance training",
            workoutDate: "2023-04-30",
            effortLevel: 7
        },
        {
            userId: 2,
            name: "Basketball Drills",
            duration: 60,
            subcategory: "sports",
            workoutDate: "2023-05-01",
            effortLevel: 8
        },
        {
            userId: 1,
            name: "Pilates Class",
            duration: 60,
            subcategory: "flexibility training",
            workoutDate: "2023-05-02",
            effortLevel: 4
        },
        {
            userId: 2,
            name: "HIIT Workout",
            duration: 45,
            subcategory: "cardio training",
            workoutDate: "2023-05-03",
            notes: "Intense intervals",
            effortLevel: 9
        },
        {
            userId: 3,
            name: "CrossFit Training",
            duration: 60,
            subcategory: "weight/resistance training",
            workoutDate: "2023-05-04",
            effortLevel: 10
        },
        {
            userId: 1,
            name: "Tennis Match",
            duration: 90,
            subcategory: "sports",
            workoutDate: "2023-05-05",
            effortLevel: 8
        },
        {
            userId: 2,
            name: "Stretching Routine",
            duration: 30,
            subcategory: "flexibility training",
            workoutDate: "2023-05-06",
            effortLevel: 3
        },
        {
            userId: 3,
            name: "Swimming Laps",
            duration: 45,
            subcategory: "cardio training",
            workoutDate: "2023-05-07",
            notes: "Focus on freestyle",
            effortLevel: 6
        },
        {
            userId: 1,
            name: "Full Body Workout",
            duration: 60,
            subcategory: "weight/resistance training",
            workoutDate: "2023-05-08",
            effortLevel: 7
        },
        {
            userId: 2,
            name: "Skiing Trip",
            duration: 180,
            subcategory: "sports",
            workoutDate: "2023-05-09",
            notes: "Visit a nearby ski resort",
            effortLevel: 8
        },
        {
            userId: 3,
            name: "Yoga Flow",
            duration: 60,
            subcategory: "flexibility training",
            workoutDate: "2023-05-10",
            notes: "",
            effortLevel: 5
        },
        {
            userId: 1,
            name: "Circuit Training",
            duration: 45,
            subcategory: "cardio training",
            workoutDate: "2023-05-11",
            notes: "Alternate between strength and cardio exercises",
            effortLevel: 9
        },
        {
            userId: 2,
            name: "Soccer Match",
            duration: 90,
            subcategory: "sports",
            workoutDate: "2023-05-12",
            notes: "",
            effortLevel: 8
        },
        {
            userId: 1,
            name: "Interval Training",
            duration: 45,
            subcategory: "cardio training",
            workoutDate: "2023-05-14",
            notes: "Alternate between high and low-intensity intervals",
            effortLevel: 7
        },
        {
            userId:2, 
            name: "Tabata Workout",
            duration: 30,
            subcategory: "cardio training",
            workoutDate: "2023-05-15",
            notes: "A high-intensity interval training workout using the Tabata protocol, which includes short bursts of high-intensity exercises and rest periods.",
            effortLevel: 8
        }
    ]

    for (const singleWorkout of workoutsData) {
      const currentWorkout = await Workout.query().findOne({ name: singleWorkout.name });
      if (!currentWorkout) {
        await Workout.query().insert(singleWorkout);
      }
    }
  }
}

export default WorkoutsSeeder;
