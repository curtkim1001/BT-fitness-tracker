import { Workout } from "../../models/index.js";

class workoutsSeeder {
  static async seed() {
    const workoutsData = [
        {
            userId: 2,
            name: "Morning Jog",
            duration: 30,
            subcategory: "cardio training",
            // date: "2023-04-25T08:15:00.000Z",
            notes: "",
            effortLevel: 7
        },
        {
            userId: 3,
            name: "Weightlifting Session",
            duration: 60,
            subcategory: "weight/resistance training",
            // date: "2023-04-26T15:30:00.000Z",
            notes: "Focus on upper body exercises",
            effortLevel: 9
        },
        {
            userId: 1,
            name: "Soccer Practice",
            duration: 90,
            subcategory: "sports",
            // date: "2023-04-27T17:00:00.000Z",
            effortLevel: 8
        },
        {
            userId: 2,
            name: "Yoga Class",
            duration: 75,
            subcategory: "flexibility training",
            // date: "2023-04-28T10:45:00.000Z",
            effortLevel: 5
        },
        {
            userId: 1,
            name: "Cycling Adventure",
            duration: 120,
            subcategory: "cardio training",
            // date: "2023-04-29T13:00:00.000Z",
            notes: "Explore new trails",
            effortLevel: 6
        },
        {
            userId: 3,
            name: "Strength Training",
            duration: 45,
            subcategory: "weight/resistance training",
            // date: "2023-04-30T16:30:00.000Z",
            effortLevel: 7
        },
        {
            userId: 2,
            name: "Basketball Drills",
            duration: 60,
            subcategory: "sports",
            // date: "2023-05-01T09:00:00.000Z",
            effortLevel: 8
        },
        {
            userId: 1,
            name: "Pilates Class",
            duration: 60,
            subcategory: "flexibility training",
            // date: "2023-05-02T17:30:00.000Z",
            effortLevel: 4
        },
        {
            userId: 2,
            name: "HIIT Workout",
            duration: 45,
            subcategory: "cardio training",
            // date: "2023-05-03T08:45:00.000Z",
            notes: "Intense intervals",
            effortLevel: 9
        },
        {
            userId: 3,
            name: "CrossFit Training",
            duration: 60,
            subcategory: "weight/resistance training",
            // date: "2023-05-04T14:00:00.000Z",
            effortLevel: 10
        },
        {
            userId: 1,
            name: "Tennis Match",
            duration: 90,
            subcategory: "sports",
            // date: "2023-05-05T16:00:00.000Z",
            effortLevel: 8
        },
        {
            userId: 2,
            name: "Stretching Routine",
            duration: 30,
            subcategory: "flexibility training",
            // date: "2023-05-06T09:30:00.000Z",
            effortLevel: 3
        },
        {
            userId: 3,
            name: "Swimming Laps",
            duration: 45,
            subcategory: "cardio training",
            // date: "2023-05-07T12:45:00.000Z",
            notes: "Focus on freestyle",
            effortLevel: 6
        },
        {
            userId: 1,
            name: "Full Body Workout",
            duration: 60,
            subcategory: "weight/resistance training",
            // date: "2023-05-08T15:30:00.000Z",
            effortLevel: 7
        },
        {
            userId: 2,
            name: "Skiing Trip",
            duration: 180,
            subcategory: "sports",
            // date: "2023-05-09T10:00:00.000Z",
            notes: "Visit a nearby ski resort",
            effortLevel: 8
        },
        {
            userId: 3,
            name: "Yoga Flow",
            duration: 60,
            subcategory: "flexibility training",
            // date: "2023-05-10T18:00:00.000Z",
            notes: "",
            effortLevel: 5
        },
        {
            userId: 1,
            name: "Circuit Training",
            duration: 45,
            subcategory: "cardio training",
            // date: "2023-05-11T08:45:00.000Z",
            notes: "Alternate between strength and cardio exercises",
            effortLevel: 9
        },
        {
            userId: 2,
            name: "Soccer Match",
            duration: 90,
            subcategory: "sports",
            // date: "2023-05-12T16:30:00.000Z",
            notes: "",
            effortLevel: 8
        },
        {
            userId: 1,
            name: "Interval Training",
            duration: 45,
            subcategory: "cardio training",
            // date: "2023-05-14T09:15:00.000Z",
            notes: "Alternate between high and low-intensity intervals",
            effortLevel: 7
        },
        {
            userId:2, 
            name: "Tabata Workout",
            duration: 30,
            subcategory: "cardio training",
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

export default workoutsSeeder;
