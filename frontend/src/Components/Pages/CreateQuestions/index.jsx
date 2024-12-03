import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Fade,
  Paper,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { QuestionService } from "../../../Services/QuestionService";
import ArrowBackAndTitle from "../../Common/Title";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [difficulty, setDifficulty] = useState(
    'easy'
  );
  const [options, setOptions] = useState(
    Array(5).fill({ text: "", isCorrect: false })
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (index, text) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text } : opt))
    );
  };

  const handleCorrectAnswer = (index) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
      }))
    );
  };

  const handleSubmit = async (createAnother) => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      const question = {
        questionText,
        difficulty,
        options,
      };

      await QuestionService.createQuestion(question);

      if (createAnother) {
        resetForm();
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error creating question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setQuestionText("");
    setDifficulty('easy');
    setOptions(Array(5).fill({ text: "", isCorrect: false }));
  };

  const isFormValid = () =>
    questionText.trim() !== "" &&
    options.every((opt) => opt.text.trim() !== "") &&
    options.some((opt) => opt.isCorrect);

  return (
    <Fade in timeout={800}>
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <ArrowBackAndTitle title="Criando pergunta" />

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Digite o enunciado"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 4 }}>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            sx={{
              "&.Mui-focused": {
                borderColor: "var(--text-color)",
              },
            }}
          >
            <MenuItem value={'easy'}>Fácil</MenuItem>
            <MenuItem value={'medium'}>Intermediario</MenuItem>
            <MenuItem value={'hard'}>Dificil</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ mb: 2, color: "var(--text-color)" }}>
          Alternativas
        </Typography>

        <Box sx={{ mb: 2 }}>
          {options.map((option, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Paper
                sx={{
                  flex: 1,
                  backgroundColor: "var(--light-blue-color)",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "var(--dark-blue-color)",
                  },
                }}
              >
                <TextField
                  fullWidth
                  value={option.text}
                  autoComplete="off"
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Opção ${index + 1}`}
                  variant="filled"
                  slotProps={{
                    input: {
                      sx: {
                        backgroundColor: "transparent",

                        "&.MuiFilledInput-root::after": {
                          borderBottomColor: "var(--text-color)",
                        },
                      },
                    },
                  }}
                />
              </Paper>

              <IconButton
                onClick={() => handleCorrectAnswer(index)}
                sx={{
                  color: option.isCorrect
                    ? "var(--text-color)"
                    : "var(--text-weak-color)",
                  "&:hover": {
                    backgroundColor: "var(--dark-blue-color)",
                    color: "var(--text-color)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {option.isCorrect ? (
                  <CheckCircle sx={{ fontSize: 24 }} />
                ) : (
                  <RadioButtonUnchecked sx={{ fontSize: 24 }} />
                )}
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => handleSubmit(true)}
            disabled={!isFormValid() || isSubmitting}
            sx={{
              bgcolor: "var(--secondary-color)",
              "&:hover": { bgcolor: "var(--secondary-weaker-color)" },
            }}
          >
            Criar & Começar outra
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit(false)}
            disabled={!isFormValid() || isSubmitting}
            sx={{
              bgcolor: "var(--primary-color)",
              "&:hover": { bgcolor: "var(--primary-weaker-color)" },
            }}
          >
            Criar pergunta
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default CreateQuestion;
