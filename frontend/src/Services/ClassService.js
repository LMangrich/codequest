export class ClassService {
  static async createClass(newClass) {
    // TODO BACK
    console.log("Creating class:", newClass);
  }

  static async getQuizzesByClassId(classId) {
    // TODO BACK - QUIZZ SERVICE
    return [];
  }

  static async getClassesByAuthorId(authorId) {
    // TODO BACK
    if (!authorId) return [];
    return [];
  }

  static async getClassesByUserId(userId) {
    // TODO BACK
    if (!userId) return [];
    return [];
  }

  static async getClassPerformance(classId) {
    return [];
  }
}
