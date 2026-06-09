import { useState, useEffect } from "react";
import { getGrades } from "../../services/gradesService";
import { getEnrollments } from "../../services/enrollmentsService";
import { getEvaluations } from "../../services/evaluationsService";
import { getCriteria } from "../../services/criteriaService";
import { getScales } from "../../services/scalesService";
import { getGroups } from "../../services/groupsService";
import { getUsers } from "../../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { generarReporteEstudiante } from "../../utils/pdfReports";

const StudentGrades = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [grades, setGrades] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [scales, setScales] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [gradeSeleccionada, setGradeSeleccionada] = useState<any | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [grd, enr, evl, crt, scl, grp, usr] = await Promise.all([
        getGrades(),
        getEnrollments(),
        getEvaluations(),
        getCriteria(),
        getScales(),
        getGroups(),
        getUsers(),
      ]);
      setGrades(grd);
      setEnrollments(enr);
      setEvaluations(evl);
      setCriteria(crt);
      setScales(scl);
      setGroups(grp);
      setUsuarios(usr);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const misInscripciones = enrollments.filter(
    (e: any) => e.student_id === user?.id
  );

  const misCalificaciones = grades.filter(
    (g: any) => misInscripciones.some((i: any) => i.id === g.enrollment_id)
  );

  const getNombreGrupo = (enrollmentId: string) => {
    const enrollment = enrollments.find(e => e.id === enrollmentId);
    return groups.find(g => g.id === enrollment?.group_id)?.name || '-';
  };

  const getEscalaNombre = (scaleId: string) =>
    scales.find(s => s.id === scaleId)?.name || '-';

  const getCriterioNombre = (scaleId: string) => {
    const scale = scales.find(s => s.id === scaleId);
    return criteria.find(c => c.id === scale?.criterion_id)?.name || '-';
  };

  const handleDescargarReporte = () => {
    const estudiante = usuarios.find(u => u.profile?.id === user?.id);
    generarReporteEstudiante(
      estudiante,
      misCalificaciones,
      enrollments,
      groups,
      criteria,
      scales
    );
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Mis calificaciones</h3>
            <button
              onClick={handleDescargarReporte}
              style={{ backgroundColor: '#22c55e' }}
              className="text-white px-4 py-2 rounded-md text-sm"
            >
              Descargar reporte PDF
            </button>
          </div>
          <div className="p-6.5">
            {misCalificaciones.length === 0 ? (
              <p className="text-gray-500">No tienes calificaciones registradas.</p>
            ) : (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Grupo</th>
                    <th className="px-6 py-3">Nota final</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Observaciones</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {misCalificaciones.map(g => (
                    <tr key={g.id} className={`border-b border-gray-200 ${gradeSeleccionada?.id === g.id ? 'bg-blue-50' : 'odd:bg-white even:bg-gray-50'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{getNombreGrupo(g.enrollment_id)}</td>
                      <td className="px-6 py-4">{g.final_score}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full ${g.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {g.status === 'DRAFT' ? 'No Definitiva' : 'Definitiva'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{g.observations || '-'}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setGradeSeleccionada(g)}
                          style={{ backgroundColor: '#3b82f6' }}
                          className="py-1 px-3 text-white rounded-md text-sm"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {gradeSeleccionada && (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
              <h3 className="font-medium text-black dark:text-white">
                Detalle — Nota final: {gradeSeleccionada.final_score}
              </h3>
              <button onClick={() => setGradeSeleccionada(null)} className="text-gray-500 text-sm">
                Cerrar
              </button>
            </div>
            <div className="p-6.5">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Criterio</th>
                    <th className="px-6 py-3">Nivel obtenido</th>
                    <th className="px-6 py-3">Puntaje</th>
                    <th className="px-6 py-3">Comentario</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeSeleccionada.details?.map((d: any) => (
                    <tr key={d.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{getCriterioNombre(d.scale_id)}</td>
                      <td className="px-6 py-4">{getEscalaNombre(d.scale_id)}</td>
                      <td className="px-6 py-4">{d.score}</td>
                      <td className="px-6 py-4">{d.comment || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGrades;