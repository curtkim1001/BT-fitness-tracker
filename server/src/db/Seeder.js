/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/userSeeder"
import WorkoutsSeeder from "./seeders/WorkoutsSeeder.js"
import ExercisesSeeder from "./seeders/exercisesSeeder.js"
import SetsSeeder from "./seeders/SetsSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("seeding workouts")
    await WorkoutsSeeder.seed()

    console.log("Seeding exercises")
    await ExercisesSeeder.seed()

    console.log("Seeding sets")
    await SetsSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder

