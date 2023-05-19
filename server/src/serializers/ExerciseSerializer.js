class ExerciseSerializer {
    static async getSummary(exercises) {
      const allowedAttributes = ["id", "name", "description", "muscleGroup", "bodyFunction", "createdAt"];
  
      const serializedExercises = Promise.all(exercises.map(async (exercise)=> {
          const serializedSingleExercise = {}
          for (const attribute of allowedAttributes) {
            serializedSingleExercise[attribute] = exercise[attribute];
          }
          return serializedSingleExercise
      }))
  
      return serializedExercises;
    }
  }
  
  export default ExerciseSerializer;
  