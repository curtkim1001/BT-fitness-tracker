
class WorkoutSerializer {
  static async getSummary(workouts) {
    const allowedAttributes = ["id", "userId", "name", "duration", "subcategory", "notes", "effortLevel", "createdAt"];

    const serializedWorkouts = Promise.all(workouts.map(async (workout)=> {
        const serializedSingleWorkout = {}
        for (const attribute of allowedAttributes) {
          serializedSingleWorkout[attribute] = workout[attribute];
        }
        return serializedSingleWorkout
    }))

    return serializedWorkouts;
  }
}

export default WorkoutSerializer;
