/* eslint-disable no-console */
import { connection } from "../boot.js"
import userSeeder from "./seeders/userSeeder.js"
import workoutsSeeder from "./seeders/WorkoutsSeeder.js"
import exercisesSeeder from "./seeders/exercisesSeeder.js"
import setsSeeder from "./seeders/SetsSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users...")
    await userSeeder.seed()

    console.log("seeding workouts")
    await workoutsSeeder.seed()

    console.log("Seeding exercises")
    await exercisesSeeder.seed()

    console.log("Seeding sets")
    await setsSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder