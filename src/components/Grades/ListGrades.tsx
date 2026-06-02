import { useState, useEffect } from "react";
import { getGrades, createOrUpdateGrade } from "../../services/gradesService";
import { getEnrollments, createEnrollment } from "../../services/enrollmentsService";
import { getGroups } from "../../services/groupsService";
import { getUsers } from "../../services/userService";
import { getEvaluations } from "../../services/evaluationsService";
import { getCriteria } from "../../services/criteriaService";
import { getScales } from "../../services/scalesService";
import Swal from "sweetalert2";

const ListGrades = () => {
  const [grades, setGrades] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [scales, setScales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [enrollData, setEnrollData] = useState({ student_id: '', group_id: '' });

  const [calificando, setCalificando] = useState<any | null>(null);
  const [evalSeleccionada, setEvalSeleccionada] = useState('');
  const [detalles, setDetalles] = useState<any[]>([]);
  const [observations, setObservations] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [grd, enr, grp, usr, evl, crt, scl] = await Promise.all([
        getGrades(),
        getEnrollments(),
        getGroups(),
        getUsers(),
        getEvaluations(),
        getCriteria(),
        getScales(),
      ]);
      setGrades(grd);
      setEnrollments(enr);
      setGroups(grp);
      setUsers(usr);
      setEvaluations(evl);
      setCriteria(crt);
      setScales(scl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const students = users.filter((u: any) => u.role === 'STUDENT');

  const getNombreEstudiante = (id: string) => {
    const s = students.find((s: any) => s.profile?.id === id);
    return s ? `${s.profile.first_name} ${s.profile.last_name}` : id;
  };

  const getNombreGrupo = (id: string) => groups.find(g => g.id === id)?.name || id;

  const getGradeDeEnrollment = (enrollmentId: string) =>
    grades.find(g => g.enrollment_id === enrollmentId);

  const handleEnrollar = async (e: any) => {
    e.preventDefault();
    try {
      await createEnrollment({ ...enrollData, status: 'ACTIVE' });
      Swal.fire({ title: "Completado", text: "Estudiante inscrito correctamente", icon: "success", timer: 3000 });
      setEnrollData({ student_id: '', group_id: '' });
      setShowEnrollForm(false);
      fetchData();
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al inscribir estudiante", icon: "error", timer: 3000 });
    }
  };

  const handleEvalChange = (evalId: string) => {
    setEvalSeleccionada(evalId);
    const eval_ = evaluations.find(e => e.id === evalId);
    if (!eval_?.rubric_id) return setDetalles([]);
    const criteriosDeRubrica = criteria.filter(c => c.rubric_id === eval_.rubric_id);
    setDetalles(criteriosDeRubrica.map(c => ({
      criterion_id: c.id,
      criterion_name: c.name,
      scale_id: '',
      comment: '',
      scales: scales.filter(s => s.criterion_id === c.id)
    })));
  };

  const handleDetalleChange = (index: number, field: string, value: string) => {
    const newDetalles = [...detalles];
    newDetalles[index][field] = value;
    setDetalles(newDetalles);
  };

  const handleGuardarCalificacion = async () => {
    const eval_ = evaluations.find(e => e.id === evalSeleccionada);
    if (!eval_) return alert('Selecciona una evaluación');
    if (detalles.some(d => !d.scale_id)) return alert('Selecciona una escala para cada criterio');

    try {
      await createOrUpdateGrade({
        enrollment_id: calificando.id,
        rubric_id: eval_.rubric_id,
        status: 'DRAFT',
        observations,
        details: detalles.map(d => ({
          scale_id: d.scale_id,
          comment: d.comment,
        }))
      });
      Swal.fire({ title: "Completado", text: "Calificación guardada correctamente", icon: "success", timer: 3000 });
      setCalificando(null);
      fetchData();
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al guardar la calificación", icon: "error", timer: 3000 });
    }
  };

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">

        {/* Inscribir estudiante */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Estudiantes inscritos</h3>
            <button
              onClick={() => setShowEnrollForm(!showEnrollForm)}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm"
            >
              {showEnrollForm ? 'Cancelar' : '+ Inscribir estudiante'}
            </button>
          </div>

          {showEnrollForm && (
            <form onSubmit={handleEnrollar} className="p-6 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Estudiante</label>
                <select
                  value={enrollData.student_id}
                  onChange={e => setEnrollData({ ...enrollData, student_id: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Seleccione un estudiante</option>
                  {students.map((s: any) => (
                    <option key={s.profile?.id} value={s.profile?.id}>
                      {s.profile?.first_name} {s.profile?.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Grupo</label>
                <select
                  value={enrollData.group_id}
                  onChange={e => setEnrollData({ ...enrollData, group_id: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Seleccione un grupo</option>
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <button type="submit" style={{ backgroundColor: '#3b82f6' }} className="w-full py-2 px-4 text-white rounded-md">
                Inscribir
              </button>
            </form>
          )}

          <div className="p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Estudiante</th>
                    <th className="px-6 py-3">Grupo</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Nota final</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(en => {
                    const grade = getGradeDeEnrollment(en.id);
                    return (
                      <tr key={en.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                        <td className="px-6 py-4 font-medium text-gray-900">{getNombreEstudiante(en.student_id)}</td>
                        <td className="px-6 py-4">{getNombreGrupo(en.group_id)}</td>
                        <td className="px-6 py-4">{en.status}</td>
                        <td className="px-6 py-4">{grade ? grade.final_score : 'Sin calificar'}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => { setCalificando(en); setEvalSeleccionada(''); setDetalles([]); setObservations(''); }}
                            style={{ backgroundColor: '#3b82f6' }}
                            className="py-1 px-3 text-white rounded-md text-sm"
                          >
                            Calificar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Panel calificación */}
        {calificando && (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Calificando: {getNombreEstudiante(calificando.student_id)}
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 gap-4">

              <div>
                <label className="block text-lg font-medium text-gray-700">Evaluación</label>
                <select
                  value={evalSeleccionada}
                  onChange={e => handleEvalChange(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Seleccione una evaluación</option>
                  {evaluations.filter(e => e.group_id === calificando.group_id).map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              {detalles.length > 0 && (
                <>
                  <h4 className="font-medium text-gray-700">Criterios</h4>
                  {detalles.map((d, i) => (
                    <div key={d.criterion_id} className="border rounded-md p-4">
                      <p className="font-medium mb-2">{d.criterion_name}</p>
                      <select
                        value={d.scale_id}
                        onChange={e => handleDetalleChange(i, 'scale_id', e.target.value)}
                        className="w-full border rounded-md p-2 mb-2"
                      >
                        <option value="">Seleccione nivel</option>
                        {d.scales.map((s: any) => (
                          <option key={s.id} value={s.id}>{s.name} ({s.value})</option>
                        ))}
                      </select>
                      <input
                        placeholder="Comentario"
                        value={d.comment}
                        onChange={e => handleDetalleChange(i, 'comment', e.target.value)}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-lg font-medium text-gray-700">Observaciones generales</label>
                    <input
                      value={observations}
                      onChange={e => setObservations(e.target.value)}
                      placeholder="Observaciones"
                      className="w-full border rounded-md p-2"
                    />
                  </div>

                  <div className="flex gap-2 pb-4">
                    <button
                      onClick={handleGuardarCalificacion}
                      style={{ backgroundColor: '#3b82f6' }}
                      className="py-2 px-4 text-white rounded-md"
                    >
                      Guardar calificación
                    </button>
                    <button
                      onClick={() => setCalificando(null)}
                      className="py-2 px-4 bg-gray-300 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListGrades;