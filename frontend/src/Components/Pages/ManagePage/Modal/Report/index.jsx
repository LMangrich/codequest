import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { Close, Download } from "@mui/icons-material";
import { ClassService } from "../../../../../Services/ClassService";
import "jspdf-autotable";
import { generatePerformanceReportPDF } from "../../../../../Utils/pdf";
import useToast from "../../../../../hooks/toast";

const PerformanceReportModal = ({ open, onClose, selectedClass }) => {
  const showToast = useToast();
  // states
  const [loading, setLoading] = useState(false);
  const [performanceData, setPerformanceData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  
  // useEffect
  useEffect(() => {
    if (selectedClass) {
      fetchPerformanceData();
    }
  }, [selectedClass]);

  const fetchPerformanceData = async () => {
    setLoading(true);
    try {
      const data = await ClassService.getClassPerformance(selectedClass.id);
      setPerformanceData(data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = performanceData.sort((a, b) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    }
  });

  const handleDownloadPDF = () => {
    showToast("Gerando relatório de desempenho...", "success");
    generatePerformanceReportPDF(selectedClass?.name, sortedData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 800,
          margin: "auto",
          marginTop: "10%",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
        <IconButton
          onClick={handleDownloadPDF}
          sx={{ position: "absolute", top: 8, right: 48 }}
        >
          <Download />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Relatório de Desempenho - {selectedClass?.name}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 400, overflowY: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleRequestSort("name")}
                    >
                      Nome
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "accuracy"}
                      direction={orderBy === "accuracy" ? order : "asc"}
                      onClick={() => handleRequestSort("accuracy")}
                    >
                      % de Acerto
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "quizzes"}
                      direction={orderBy === "quizzes" ? order : "asc"}
                      onClick={() => handleRequestSort("quizzes")}
                    >
                      Quizzes Respondidos
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.length > 0 ? (
                  sortedData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.accuracy}%</TableCell>
                      <TableCell align="right">{row.quizzes}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Nenhum dado disponível
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
};

export default PerformanceReportModal;
