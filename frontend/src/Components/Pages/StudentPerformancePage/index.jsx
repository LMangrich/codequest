import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClassService } from "../../../Services/ClassService";
import ArrowBackAndTitle from "../../Common/Title";
import PerformanceReportModal from "../ManagePage/Modal/Report";

const SelectClassPage = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const data = await ClassService.getClassesByUserId();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleViewPerformance = () => {
    if (selectedClass) {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <ArrowBackAndTitle title={"Visualizar desempenho"} />
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
      <Button
        variant="contained"
        fullWidth
        disabled={!selectedClass || loading}
        onClick={handleViewPerformance}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Ver Desempenho"}
      </Button>
      <PerformanceReportModal
        open={openModal}
        onClose={handleCloseModal}
        selectedClass={selectedClass}
      />
    </Box>
  );
};

export default SelectClassPage;