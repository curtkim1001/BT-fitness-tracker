/* eslint-disable no-console */
import { connection } from "../boot.js"
import ExercisesSeeder from "./seeders/ExercisesSeeder.js"
import RoutinesSeeder from "./seeders/RoutinesSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import WorkoutsSeeder from "./seeders/WorkoutsSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("seeding routines")
    await RoutinesSeeder.seed()

    console.log("Seeding exercises")
    await ExercisesSeeder.seed()

    console.log("Seeding workouts")
    await WorkoutsSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder