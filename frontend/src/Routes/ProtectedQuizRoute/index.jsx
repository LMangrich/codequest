import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import QuizzService from "../../Services/QuizzService";
import UserService from "../../Services/UserService";
import useToast from "../../hooks/toast";

const ProtectedQuizRoute = ({ children }) => {
  const { quizId } = useParams();
  const [hasAccess, setHasAccess] = useState(null);
  const showToast = useToast();
  const user = UserService.getCurrentUser();

  useEffect(() => {
    const checkAccess = async () => {
      if (user && quizId) {
        const access = await QuizzService.userHasAccessToQuiz(user.id, quizId);
        setHasAccess(access);
        if (!access) {
          showToast("Você não tem permissão para acessar este quiz.", "error");
        }
      } else {
        setHasAccess(false);
      }
    };

    checkAccess();
  }, [user, quizId, showToast]);

  if (hasAccess === null) {
    return <div>Carregando...</div>;
  }

  return hasAccess ? children : <Navigate to="/menu" />;
};

export default ProtectedQuizRoute;