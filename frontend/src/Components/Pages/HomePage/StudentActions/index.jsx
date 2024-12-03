import { Button } from "@mui/material";
import { Forum, Summarize } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const StudentHomeActions = ({
  loading,
  setLoading,
}) => {

  const navigate = useNavigate();

  return (
    <>
      
      <Button
        fullWidth
        disabled={loading}
        startIcon={<Forum />}
        sx={{
          background: "var(--primary-color)",
          fontWeight: "bold",
          marginTop: 2,
          position: "relative",
          ":hover": { background: "var(--primary-weaker-color)" },
          ".MuiButton-startIcon": {
            position: "absolute",
            left: 8,
            marginLeft: 1,
          },
        }}
        onClick={() => {
          setLoading(true);
          navigate("/quizz");
        }}
      >
        Responder Quizz
      </Button>
      <Button
        fullWidth
        disabled={loading}
        startIcon={<Summarize />}
        sx={{
          background: "var(--tertiary-color)",
          fontWeight: "bold",
          marginTop: 2,
          position: "relative",
          ":hover": { background: "var(--tertiary-weaker-color)" },
          ".MuiButton-startIcon": {
            position: "absolute",
            left: 8,
            marginLeft: 1,
          },
        }}
        onClick={() => {
          setLoading(true);
          navigate("/select-class");
        }}
      >
        Desempenho
      </Button>
    </>
  );
};
export default StudentHomeActions;
