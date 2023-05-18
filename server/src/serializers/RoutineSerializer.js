
class RoutineSerializer {
  static async getSummary(routines) {
    const allowedAttributes = ["id", "name", "description", "duration", "subcategory", "createdAt"];

    const serializedRoutines = Promise.all(routines.map(async (routine)=> {
        const serializedSingleRoutine = {}
        for (const attribute of allowedAttributes) {
            serializedSingleRoutine[attribute] = routine[attribute];
        }
        return serializedSingleRoutine
    }))

    return serializedRoutines;
  }
}

export default RoutineSerializer;
