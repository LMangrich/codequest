export class ClassService {
  static async createClass(newClass) {
    console.log("Dados enviados:", newClass);

    try {
      const response = await apiClient.post(`/class/create`, {
        newClass,
      });
      console.log("Class created:", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar a turma");
    }
  }

  static async getClassesByAuthorId(authorId) {
    if (!authorId) return [];
    try {
      const response = await apiClient.get(`/classes/author/${authorId}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar turmas do autor");
    }
  }

  static async getClassesByUserId(userId) {
    if (!userId) return [];
    try {
      const response = await apiClient.get(`/classes/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar turmas do usuário");
    }
  }

  static async getClassPerformance(classId) {
    try {
      const response = await apiClient.get(`/classes/${classId}/performance`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar desempenho da turma");
    }
  }
}
