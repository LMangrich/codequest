import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserServiceInstance from "../../../../Services/UserService";
import { ClassService } from "../../../../Services/ClassService";
import useToast from "../../../../hooks/toast";
import apiClient from "../../../../Utils/api";
import ArrowBackAndTitle from "../../../Common/Title";

const QuizzSelection = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const user = await UserServiceInstance.getCurrentUser();
      const classes = await ClassService.getClassesByUserId(user.id);
      if (!classes) {
        showToast("Nenhuma turma encontrada", "warning");
        return;
      }
      setClasses(classes);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      showToast("Erro ao buscar turmas", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizzes = async (classId) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/quizzes/${classId}`);
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.error("Erro ao buscar quizzes:", error);
      showToast("Erro ao buscar quizzes", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (event, newValue) => {
    setSelectedClass(newValue);
    if (newValue) {
      fetchQuizzes(newValue.id);
    }
  };

  const handleQuizChange = (event, newValue) => {
    setSelectedQuiz(newValue);
  };

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            navigate(`/quizz/${selectedQuiz.id}`);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      showToast("Selecione um quiz para iniciar", "warning");
    }
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" padding={3}>
      <ArrowBackAndTitle title={"Selecione um Quiz"} />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              options={classes}
              getOptionLabel={(option) => option.name}
              value={selectedClass}
              onChange={handleClassChange}
              onOpen={fetchClasses}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione a Turma"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" disabled={!selectedClass}>
            <Autocomplete
              options={quizzes}
              getOptionLabel={(option) => option.title}
              value={selectedQuiz}
              onChange={handleQuizChange}
              onOpen={() => selectedClass && fetchQuizzes(selectedClass.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione o Quiz"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleStartQuiz}
            disabled={!selectedQuiz}
            sx={{ marginTop: 2 }}
          >
            {countdown > 0 ? `Iniciando em ${countdown}...` : "Iniciar Quiz"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default QuizzSelection;
