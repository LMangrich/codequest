// frontend/src/Components/Pages/Class/CreateClasses/index.jsx
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { ClassService } from "../../../../Services/ClassService";
import UserServiceInstance from "../../../../Services/UserService";
import ArrowBackAndTitle from "../../../Common/Title";
import useToast from "../../../../hooks/toast";

const CreateClass = () => {
  const showToast = useToast();

  //states
  const [className, setClassName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const studentsData = await UserServiceInstance.getAllStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleCreateClass = async () => {
    console.log("Botão clicado, função handleCreateClass foi chamada");
    console.log({ className, selectedStudents, loading });

    if (!className || selectedStudents.length === 0) return;
    const userId = UserServiceInstance.getCurrentUser();
    if (!userId) return;
    const newClass = {
      nome: className,
      professorId: userId.id,
      students: selectedStudents.map((student) => student.id),
    };

    try {
      const response = await ClassService.createClass(newClass);
      console.log("Class created:", response);
      showToast("Turma criada com sucesso", "success");
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2, minWidth: 450 }}>
      <ArrowBackAndTitle title={"Criar Turma"} />

      <TextField
        fullWidth
        label="Nome da Turma"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        sx={{ mb: 1, bgcolor: "var(--light-blue-color)", borderRadius: 2 }}
      />

      <Autocomplete
        id="select-multiple-chip-id"
        fullWidth
        multiple
        value={selectedStudents}
        options={students}
        getOptionLabel={(option) => option.nome}
        groupBy={(option) => option.nome[0].toUpperCase()}
        disabled={loading}
        onChange={(event, newValue) => {
          setSelectedStudents(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Alunos"
            variant="outlined"
            placeholder="Selecione os alunos"
          />
        )}
        sx={{ marginTop: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleCreateClass}
        disabled={!className || selectedStudents.length === 0 || loading}
        sx={{
          marginTop: 3,
          bgcolor: "var(--primary-color)",
          "&:hover": { bgcolor: "var(--primary-weaker-color)" },
        }}
      >
        Criar Turma
      </Button>
    </Box>
  );
};

export default CreateClass;
