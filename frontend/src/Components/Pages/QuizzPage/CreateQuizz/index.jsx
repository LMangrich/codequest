import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Switch,
  CircularProgress,
} from "@mui/material";
import { QuestionService } from "../../../../Services/QuestionService";
import { ClassService } from "../../../../Services/ClassService";
import useToast from "../../../../hooks/toast";
import ArrowBackAndTitle from "../../../Common/Title";

const CreateQuizz = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isRandom, setIsRandom] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizzName, setQuizzName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = useToast();

  useEffect(() => {
    const getClasses = async () => {
      try {
        const fetchedClasses = await ClassService.getClassesByUserId();
        setClasses(fetchedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const fetchedQuestions = await QuestionService.getQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  const handleCreateQuizz = async () => {
    if (!quizzName || !selectedClass) {
      showToast("Por favor, preencha todos os campos.", "warning");
      return;
    }
    if (isRandom && selectedQuestions.length !== 5) {
      showToast("Por favor, selecione 5 perguntas.", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implementar a lógica para criar o quizz
      console.log("Criando quizz:", {
        quizzName,
        selectedClass,
        selectedQuestions,
      });
    } catch (error) {
      console.error("Error creating quizz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        p: 1,
        width: "100%",
      }}
    >
      <ArrowBackAndTitle title="Criar Quizz" />

      <TextField
        fullWidth
        label="Nome do Quizz"
        value={quizzName}
        onChange={(e) => setQuizzName(e.target.value)}
        sx={{ mb: 2, bgcolor: "var(--light-blue-color)", borderRadius: 1 }}
      />

      <Autocomplete
        options={classes}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setSelectedClass(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecione uma turma"
            variant="outlined"
            sx={{ bgcolor: "var(--light-blue-color)", borderRadius: 1 }}
          />
        )}
        sx={{ mb: 2 }}
      />

      <Typography variant="h6" sx={{ mb: 1, color: "white" }}>
        Selecionar perguntas:
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: isRandom ? "white" : "var(--primary-color)", mr: 1 }}
        >
          Manual
        </Typography>
        <Switch checked={isRandom} onChange={() => setIsRandom(!isRandom)} />
        <Typography
          variant="body1"
          sx={{ color: !isRandom ? "white" : "var(--primary-color)", ml: 1 }}
        >
          Aleatório
        </Typography>
      </Box>

      {!isRandom && (
        <Autocomplete
          multiple
          options={questions}
          getOptionLabel={(option) => option.questionText}
          onChange={(event, newValue) => setSelectedQuestions(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecione 5 opções..."
              variant="outlined"
              sx={{ bgcolor: "var(--light-blue-color)", borderRadius: 1 }}
            />
          )}
          sx={{ mb: 2 }}
        />
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={handleCreateQuizz}
        disabled={isSubmitting || loading}
        sx={{ bgcolor: "var(--primary-color)", color: "white" }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Criar Quizz"
        )}
      </Button>
    </Box>
  );
};

export default CreateQuizz;
