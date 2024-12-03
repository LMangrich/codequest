import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fade,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { QuestionService } from "../../../../../Services/QuestionService";

const QuizzGame = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const loadedQuestions = await QuestionService.getQuestions();
      setQuestions(loadedQuestions);
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId, selectedOptionId) => {
    setUserAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { questionId, selectedOptionId } : a
        );
      }
      return [...prev, { questionId, selectedOptionId }];
    });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers.find(
    (a) => a.questionId === currentQuestion?.id
  );
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNavigation = (direction) => {
    if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (direction === "next" && !isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (userAnswers.length !== questions.length) return;

    setSubmitting(true);
    try {
      // TODO LOGIC
      console.log("Submitting answers:", userAnswers);
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress sx={{ color: "var(--text-color)" }} />
      </Box>
    );
  }

  return (
    <Fade in timeout={800}>
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        {/* Progress bar */}
        <Box
          sx={{
            width: "100%",
            height: "4px",
            bgcolor: "var(--dark-blue-color)",
            mb: 3,
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
              height: "100%",
              bgcolor: "var(--primary-color)",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton
            onClick={() => navigate("/menu")}
            sx={{ color: "var(--text-weak-color)" }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ ml: 2, color: "var(--text-color)" }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
        </Box>

        {currentQuestion && (
          <>
            <Typography variant="h6" sx={{ mb: 4, color: "var(--text-color)" }}>
              {currentQuestion.questionText}
            </Typography>

            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup
                value={currentAnswer?.selectedOptionId ?? ""}
                onChange={(e) =>
                  handleAnswer(currentQuestion.id, Number(e.target.value))
                }
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.text}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      width: "100%",
                      backgroundColor: "var(--light-blue-color)",
                      transition: "all 0.2s ease-in-out",
                      "& .MuiRadio-root": {
                        color: "var(--text-weak-color)",
                      },
                      "& .Mui-checked": {
                        color: "var(--primary-color)",
                      },
                      "&:hover": {
                        backgroundColor: "var(--dark-blue-color)",
                        transform: "translateY(-2px)",
                      },
                      ...(currentAnswer?.selectedOptionId === option.id && {
                        backgroundColor: "var(--dark-blue-color)",
                        transform: "translateY(-2px)",
                      }),
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                onClick={() => handleNavigation("prev")}
                disabled={currentQuestionIndex === 0 || submitting}
                sx={{
                  color: "var(--text-color)",
                  "&.Mui-disabled": {
                    color: "var(--text-weak-color)",
                  },
                }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  isLastQuestion ? handleSubmit() : handleNavigation("next")
                }
                disabled={!currentAnswer || submitting}
                sx={{
                  bgcolor: "var(--primary-color)",
                  "&:hover": { bgcolor: "var(--primary-weaker-color)" },
                  "&.Mui-disabled": {
                    bgcolor: "var(--disabled-color)",
                  },
                }}
              >
                {isLastQuestion ? "Submit" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Fade>
  );
};

export default QuizzGame;
