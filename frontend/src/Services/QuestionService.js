import apiClient from "../Utils/api";

export class QuestionService {
  static async createQuestion(request) {
    const response = await apiClient.post("/questions", {
      enunciado: request.questionText,
      nivel_dificuldade: request.difficulty,
      profId: request.profId,
      alternativas: request.options.map((opt) => ({
        texto: opt.text,
        correta: opt.isCorrect,
      })),
    });
    return response.data;
  }

  static async getQuestions() {
    const response = await apiClient.get("/questions");
    return response.data;
  }

  static async getQuestionsByAuthorId(profId) {
    const response = await apiClient.get(`/questions/author/${profId}`);
    return response.data;
  }
}
