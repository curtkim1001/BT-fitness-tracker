import { Routine } from "../../models/index.js";

class RoutinesSeeder {
  static async seed() {
    const routinesData = [
        {
            userId: 1,
            name: "Morning Stretch",
            description: "A quick stretching routine to start your day.",
            duration: 15,
            subcategory: "Flexibility"
        },
        {
            userId: 1,
            name: "Full Body Workout",
            description: "A complete workout targeting all major muscle groups.",
            duration: 60,
            subcategory: "Strength Training"
        },
        {
            userId: 1,
            name: "Cardio Blast",
            description: "High-intensity cardio exercises to get your heart pumping.",
            duration: 30,
            subcategory: "Cardiovascular Training"
        },
        {
            userId: 1,
            name: "Core Challenge",
            description: "An intense core workout to strengthen your abs and obliques.",
            duration: 45,
            subcategory: "Core Training"
        },
        {
            userId: 1,
            name: "Leg Day",
            description: "A leg-focused workout to build strength and endurance.",
            duration: 45,
            subcategory: "Leg Training"
        },
        {
            userId: 2,
            name: "Upper Body Burn",
            description: "Target your chest, back, arms, and shoulders with this upper body workout.",
            duration: 60,
            subcategory: "Upper Body Training"
        },
        {
            userId: 2,
            name: "Yoga Flow",
            description: "A calming yoga routine to improve flexibility and promote relaxation.",
            duration: 30,
            subcategory: "Yoga"
        },
        {
            userId: 2,
            name: "HIIT Circuit",
            description: "A high-intensity interval training circuit for maximum calorie burn.",
            duration: 30,
            subcategory: "HIIT"
        },
        {
            userId: 2,
            name: "Endurance Run",
            description: "A long-distance run to build endurance and stamina.",
            duration: 90,
            subcategory: "Endurance Training"
        },
        {
            userId: 2,
            name: "Active Recovery",
            description: "Gentle exercises to promote muscle recovery and reduce soreness.",
            duration: 20,
            subcategory: "Recovery"
        },
        {
            userId: 3,
            name: "Pilates Sculpt",
            description: "A pilates routine to tone and sculpt your muscles.",
            duration: 45,
            subcategory: "Pilates"
        },
        {
            userId: 3,
            name: "Tabata HIIT",
            description: "A high-intensity interval training workout using the Tabata protocol.",
            duration: 20,
            subcategory: "HIIT"
        },
        {
            userId: 3,
            name: "Functional Fitness",
            description: "Exercises that mimic real-life movements to improve overall fitness.",
            duration: 60,
            subcategory: "Functional Training"
        },
        {
            userId: 3,
            name: "Stretch and Relax",
            description: "A gentle stretching routine to release tension and promote relaxation.",
            duration: 30,
            subcategory: "Flexibility"
        },
        {
            userId: 3,
            name: "Agility Training",
            description: "Exercises to improve agility, speed, and coordination.",
            duration: 45,
            subcategory: "Sports Conditioning"
        }
    ]

    for (const singleRoutine of routinesData) {
      const currentRoutine = await Routine.query().findOne({ name: singleRoutine.name });
      if (!currentRoutine) {
        await Routine.query().insert(singleRoutine);
      }
    }
  }
}

export default RoutinesSeeder;
