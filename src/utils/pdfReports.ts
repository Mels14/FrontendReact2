import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const traducirEstado = (status: string) => {
  if (status === 'DRAFT') return 'No Definitiva';
  if (status === 'SENT') return 'Definitiva';
  return status;
};

export const generarReporteGrupo = (
  grupo: any,
  enrollments: any[],
  grades: any[],
  estudiantes: any[]
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Reporte de Notas del Grupo', 14, 20);

  doc.setFontSize(12);
  doc.text(`Grupo: ${grupo?.name || '-'}`, 14, 35);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 42);

  const filas = enrollments.map(en => {
    const grade = grades.find(g => g.enrollment_id === en.id);
    const estudiante = estudiantes.find(e => e.profile?.id === en.student_id);
    return [
      `${estudiante?.profile?.first_name || ''} ${estudiante?.profile?.last_name || ''}`,
      estudiante?.code || '-',
      grade?.final_score ?? 'Sin calificar',
      traducirEstado(grade?.status || ''),
      grade?.observations || '-',
    ];
  });

  autoTable(doc, {
    startY: 50,
    head: [['Estudiante', 'Código', 'Nota Final', 'Estado', 'Observaciones']],
    body: filas,
  });

  doc.save(`reporte-grupo-${grupo?.name || 'grupo'}.pdf`);
};

export const generarReporteEstudiante = (
  estudiante: any,
  grades: any[],
  enrollments: any[],
  groups: any[],
  criteria: any[],
  scales: any[]
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Reporte de Desempeño', 14, 20);

  doc.setFontSize(12);
  doc.text(`Estudiante: ${estudiante?.profile?.first_name || ''} ${estudiante?.profile?.last_name || ''}`, 14, 35);
  doc.text(`Código: ${estudiante?.code || '-'}`, 14, 42);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 49);

  let currentY = 60;

  grades.forEach(grade => {
    const enrollment = enrollments.find(e => e.id === grade.enrollment_id);
    const grupo = groups.find(g => g.id === enrollment?.group_id);

    doc.setFontSize(13);
    doc.text(
      `Grupo: ${grupo?.name || '-'} — Nota final: ${grade.final_score} (${traducirEstado(grade.status)})`,
      14,
      currentY
    );
    currentY += 8;

    if (grade.observations) {
      doc.setFontSize(10);
      doc.text(`Observaciones: ${grade.observations}`, 14, currentY);
      currentY += 6;
    }

    const detalles = grade.details?.map((d: any) => {
      const scale = scales.find(s => s.id === d.scale_id);
      const criterio = criteria.find(c => c.id === scale?.criterion_id);
      return [
        criterio?.name || '-',
        scale?.name || '-',
        d.score,
        d.comment || '-',
      ];
    }) || [];

    autoTable(doc, {
      startY: currentY,
      head: [['Criterio', 'Nivel obtenido', 'Puntaje', 'Comentario']],
      body: detalles,
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;
  });

  doc.save(`reporte-estudiante-${estudiante?.code || 'estudiante'}.pdf`);
};