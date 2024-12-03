import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePerformanceReportPDF = (className, data) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Relatório de Desempenho - ${className}`, 10, 10);

  doc.setFontSize(12);
  doc.text(`Data: ${new Date().toLocaleDateString()}`, 10, 20);

  doc.autoTable({
    startY: 30,
    head: [["Nome", "% de Acerto", "Quizzes Respondidos"]],
    body: data.map((row) => [
      row.name,
      `${row.accuracy}%`,
      row.quizzes,
    ]),
    theme: "grid",
    headStyles: { fillColor: [55, 65, 81], textColor: [255, 255, 255] },
    styles: { halign: "center" },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });


  // File name
  doc.save(`Relatório_${className}.pdf`);
};