import { Quizz } from "../models/Quizz";
import apiClient from "../Utils/api";
import UserService from "./UserService";

class QuizzService {
  quizzes = null;

  getQuizzes() {
    return this.quizzes;
  }

  setQuizzes(quizzes) {
    this.quizzes = quizzes;
  }

  getAllQuizzes() {
    // To do: Get all quizzes from the server

    return null;
  }

  async getQuizzesByCreator(authorId) {
    try {
      const response = await apiClient.get(`/quizzes/author/${authorId}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar quizzes do autor");
    }
  }

  createQuizz(newQuizz) {
    // To do: Send the new quizz to the server
  }

  static async getQuizzesByClassId(classId) {
    if (!classId) return [];
    try {
      const response = await apiClient.get(`/quizzes/class/${classId}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar quizzes da turma");
    }
  }

  async loadUserQuizzes() {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) throw new Error("Usuário não está logado");

    try {
      // TO DO: BACK IMPLEMENTATION ON HOW TO GET QUIZZES FOR THAT CLASS
      const response = await apiClient.get("/quizzes/my-quizzes");
      this.setQuizzes(response.data);
    } catch (error) {
      throw new Error("Erro ao carregar quizzes");
    }
  }

  static async userHasAccessToQuiz(userId, quizId) {
    // To do: Check if we going to use this method
    try {
      const response = await apiClient.get(`/quizzes/${quizId}/access`, {
        params: { userId },
      });
      return response.data.hasAccess;
    } catch (error) {
      console.error("Error checking quiz access:", error);
      return false;
    }
  }
}
const quizzServiceInstance = new QuizzService();
export default quizzServiceInstance;
