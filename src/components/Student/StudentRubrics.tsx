import { useState, useEffect } from "react";
import { getEnrollments } from "../../services/enrollmentsService";
import { getEvaluations } from "../../services/evaluationsService";
import { getRubrics } from "../../services/rubricsService";
import { getCriteria } from "../../services/criteriaService";
import { getScales } from "../../services/scalesService";
import { getGroups } from "../../services/groupsService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StudentRubrics = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [rubrics, setRubrics] = useState<any[]>([]);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [scales, setScales] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rubricSeleccionada, setRubricSeleccionada] = useState<any | null>(null);
  const [evalSeleccionada, setEvalSeleccionada] = useState<any | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [enr, evl, rub, crt, scl, grp] = await Promise.all([
        getEnrollments(),
        getEvaluations(),
        getRubrics(),
        getCriteria(),
        getScales(),
        getGroups(),
      ]);
      setEnrollments(enr);
      setEvaluations(evl);
      setRubrics(rub);
      setCriteria(crt);
      setScales(scl);
      setGroups(grp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filtra inscripciones del estudiante actual
  const misInscripciones = enrollments.filter(
    (e: any) => e.student_id === user?.id
  );

  // Obtiene evaluaciones de los grupos del estudiante
  const misEvaluaciones = evaluations.filter(
    (e: any) => misInscripciones.some((i: any) => i.group_id === e.group_id) && e.rubric_id
  );

  const getNombreGrupo = (id: string) => groups.find(g => g.id === id)?.name || id;

  const handleVerRubrica = (evaluacion: any) => {
    const rubrica = rubrics.find(r => r.id === evaluacion.rubric_id);
    setRubricSeleccionada(rubrica);
    setEvalSeleccionada(evaluacion);
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">

        {/* Lista de evaluaciones */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Mis evaluaciones</h3>
          </div>
          <div className="p-6.5">
            {misEvaluaciones.length === 0 ? (
              <p className="text-gray-500">No tienes evaluaciones con rúbricas asignadas.</p>
            ) : (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Evaluación</th>
                    <th className="px-6 py-3">Grupo</th>
                    <th className="px-6 py-3">Peso</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {misEvaluaciones.map(ev => (
                    <tr key={ev.id} className={`border-b border-gray-200 ${evalSeleccionada?.id === ev.id ? 'bg-blue-50' : 'odd:bg-white even:bg-gray-50'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{ev.name}</td>
                      <td className="px-6 py-4">{getNombreGrupo(ev.group_id)}</td>
                      <td className="px-6 py-4">{ev.weight}%</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleVerRubrica(ev)}
                          style={{ backgroundColor: '#3b82f6' }}
                          className="py-1 px-3 text-white rounded-md text-sm"
                        >
                          Ver rúbrica
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detalle de rúbrica */}
        {rubricSeleccionada && (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Rúbrica: {rubricSeleccionada.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{rubricSeleccionada.description}</p>
              <p className="text-xs text-gray-400 mt-1">Publicada: {new Date(rubricSeleccionada.updated_at).toLocaleDateString()}</p>
            </div>
            <div className="p-6.5">
              {criteria
                .filter(c => c.rubric_id === rubricSeleccionada.id)
                .map(criterio => (
                  <div key={criterio.id} className="mb-6 border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800">{criterio.name}</h4>
                      <span className="text-sm text-gray-500">Peso: {criterio.weight}%</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{criterio.description}</p>
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-2">Nivel</th>
                          <th className="px-4 py-2">Descripción</th>
                          <th className="px-4 py-2">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scales
                          .filter(s => s.criterion_id === criterio.id)
                          .map(escala => (
                            <tr key={escala.id} className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">{escala.name}</td>
                              <td className="px-4 py-2">{escala.description}</td>
                              <td className="px-4 py-2">{escala.value}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRubrics;