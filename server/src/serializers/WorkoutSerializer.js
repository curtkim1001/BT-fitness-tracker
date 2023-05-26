
class WorkoutSerializer {

  static formatDate = (string)=> {
    const options = { year:"numeric", month:"long", day:"numeric" }
    const formatCreatedAt = new Date(string).toLocaleString(undefined, options)
    return formatCreatedAt
  }

  static async getSummary(workouts) {
    const allowedAttributes = ["id", "userId", "name", "duration", "subcategory", "notes", "effortLevel", "createdAt", "workoutDate", "locationId"];

    const serializedWorkouts = Promise.all(workouts.map(async (workout)=> {
        const serializedSingleWorkout = {}
        for (const attribute of allowedAttributes) {
          if (attribute === "workoutDate") {
            workout[attribute] = WorkoutSerializer.formatDate(workout[attribute])
          }
          serializedSingleWorkout[attribute] = workout[attribute];
        }
        serializedSingleWorkout.sets = await workout.$relatedQuery("sets")
        const locationData = await workout.$relatedQuery("location")
        if (locationData) {
          serializedSingleWorkout.location = locationData
        }
        return serializedSingleWorkout
    }))

    return serializedWorkouts;
  }
}

export default WorkoutSerializer;
