import { useEffect, useState } from "react";
import { Autocomplete, Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserServiceInstance from "../../../Services/UserService";
import { ClassService } from "../../../Services/ClassService";
import ArrowBackAndTitle from "../../Common/Title";
import PerformanceReportModal from "./Modal/Report";

const ManageClass = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const currentUser = UserServiceInstance.getCurrentUser();
      const userClasses = await ClassService.getClassesByAuthorId(
        currentUser ? currentUser : undefined
      );
      setClasses(userClasses);
    };
    fetchClasses();
    setLoading(false);
  }, []);

  const handleManageStudents = () => {
    if (selectedClass) {
      navigate(`/class/manage/${selectedClass.name}`);
    }
  };

  const handleViewPerformance = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <ArrowBackAndTitle title={"Gerenciar Turma"} />
      <Autocomplete
        options={classes}
        fullWidth
        disabled={loading}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setSelectedClass(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Selecione uma turma" />
        )}
      />
      {!selectedClass && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={loading}
            onClick={handleManageStudents}
            sx={{ marginRight: 2, marginBottom: 2 }}
          >
            Gerenciar Alunos
          </Button>

          <Button
            fullWidth
            disabled={loading}
            variant="contained"
            onClick={handleViewPerformance}
          >
            Desempenho
          </Button>
        </Box>
      )}
      <PerformanceReportModal
        open={openModal}
        onClose={handleCloseModal}
        selectedClass={selectedClass}
      />
    </Box>
  );
};

export default ManageClass;
