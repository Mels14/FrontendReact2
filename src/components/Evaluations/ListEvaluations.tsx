import { Edit, Trash2, Link } from "lucide-react";
import { useState, useEffect } from "react";
import { getEvaluations, deleteEvaluation, associateRubric } from "../../services/evaluationsService";
import { getGroups } from "../../services/groupsService";
import { getSubjects } from "../../services/subjectsService";
import { getRubrics } from "../../services/rubricsService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListEvaluations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [rubrics, setRubrics] = useState<any[]>([]);
  const [asociando, setAsociando] = useState<any | null>(null);
  const [rubricSeleccionada, setRubricSeleccionada] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [evals, grps, subs, rubs] = await Promise.all([
      getEvaluations(),
      getGroups(),
      getSubjects(),
      getRubrics(),
    ]);
    setData(evals);
    setGroups(grps);
    setSubjects(subs);
    setRubrics(rubs);
  };

  const getNombreGrupo = (id: string) => groups.find(g => g.id === id)?.name || id;
  const getNombreAsignatura = (id: string) => subjects.find(s => s.id === id)?.name || id;
  const getNombreRubrica = (id: string) => rubrics.find(r => r.id === id)?.title || 'Sin rúbrica';

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Eliminar evaluación",
      text: "¿Está seguro de querer eliminar esta evaluación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEvaluation(id);
          Swal.fire("Eliminado", "La evaluación ha sido eliminada", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la evaluación", "error");
        }
      }
    });
  };

  const handleAsociarRubrica = async () => {
    if (!rubricSeleccionada) return alert('Selecciona una rúbrica');
    try {
      await associateRubric(asociando.id, rubricSeleccionada);
      Swal.fire("Completado", "Rúbrica asociada correctamente", "success");
      setAsociando(null);
      setRubricSeleccionada('');
      fetchData();
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo asociar la rúbrica", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Evaluaciones</h3>
            <a href="/evaluaciones/crear" className="bg-primary text-white px-4 py-2 rounded-md text-sm">
              + Nueva evaluación
            </a>
          </div>

          {/* Asociar rúbrica */}
          {asociando && (
            <div className="p-6 border-b border-stroke">
              <h4 className="font-medium mb-2">Asociar rúbrica a: {asociando.name}</h4>
              <select
                value={rubricSeleccionada}
                onChange={e => setRubricSeleccionada(e.target.value)}
                className="w-full border rounded-md p-2 mb-2"
              >
                <option value="">Seleccione una rúbrica</option>
                {rubrics.map(r => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button onClick={handleAsociarRubrica} style={{ backgroundColor: '#3b82f6' }} className="py-2 px-4 text-white rounded-md">Asociar</button>
                <button onClick={() => setAsociando(null)} className="py-2 px-4 bg-gray-300 rounded-md">Cancelar</button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Peso</th>
                    <th className="px-6 py-3">Grupo</th>
                    <th className="px-6 py-3">Asignatura</th>
                    <th className="px-6 py-3">Rúbrica</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4">{item.weight}%</td>
                      <td className="px-6 py-4">{getNombreGrupo(item.group_id)}</td>
                      <td className="px-6 py-4">{getNombreAsignatura(item.subject_id)}</td>
                      <td className="px-6 py-4">{getNombreRubrica(item.rubric_id)}</td>
                      <td className="px-6 py-4 space-x-2 flex">
                        <button onClick={() => { setAsociando(item); setRubricSeleccionada(''); }} className="text-blue-600">
                          <Link size={20} />
                        </button>
                        <button onClick={() => navigate(`/evaluaciones/editar/${item.id}`)} className="text-yellow-600">
                          <Edit size={20} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEvaluations;