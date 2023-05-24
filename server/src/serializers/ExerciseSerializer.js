class ExerciseSerializer {
    static async getSummary(exercises) {
      const allowedAttributes = ["id", "name", "description", "muscleGroup", "bodyFunction", "instructions", "videoUrl", "equipment", "notes"];
  
      const serializedExercises = Promise.all(exercises.map(async (exercise)=> {
          const serializedSingleExercise = {}
          for (const attribute of allowedAttributes) {
            serializedSingleExercise[attribute] = exercise[attribute];
          }
          return serializedSingleExercise
      }))
  
      return serializedExercises;
    }

    static async removeIdForSearchAdd(exercise) {
      const allowedAttributes = ["name", "description", "muscleGroup", "bodyFunction", "instructions", "videoUrl", "equipment", "notes"];
      const serializedSingleExercise = {}
      for (const attribute of allowedAttributes) {
        if (exercise[attribute]) {
          serializedSingleExercise[attribute] = exercise[attribute];
        }
      }
      return serializedSingleExercise;
    }
  }
  
  export default ExerciseSerializer;
  