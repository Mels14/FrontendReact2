import { Edit, Trash2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { getStudyPlans, deleteStudyPlan, getStudyPlanSubjects, linkSubjectToPlan, unlinkSubjectFromPlan } from "../../services/studyPlansService";
import { getSubjects } from "../../services/subjectsService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListStudyPlans = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [planSeleccionado, setPlanSeleccionado] = useState<any | null>(null);
  const [asignaturasDePlan, setAsignaturasDePlan] = useState<any[]>([]);
  const [todasAsignaturas, setTodasAsignaturas] = useState<any[]>([]);
  const [asignaturaAgregar, setAsignaturaAgregar] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const plans = await getStudyPlans();
    const subjects = await getSubjects();
    setData(plans);
    setTodasAsignaturas(subjects);
  };

  const handleVerAsignaturas = async (plan: any) => {
    setPlanSeleccionado(plan);
    const subjects = await getStudyPlanSubjects(plan.id);
    setAsignaturasDePlan(subjects);
  };

  const handleLinkSubject = async () => {
    if (!asignaturaAgregar) return;
    try {
      await linkSubjectToPlan(planSeleccionado.id, asignaturaAgregar);
      const subjects = await getStudyPlanSubjects(planSeleccionado.id);
      setAsignaturasDePlan(subjects);
      setAsignaturaAgregar('');
    } catch (error) {
      Swal.fire("Error", "No se pudo agregar la asignatura", "error");
    }
  };

  const handleUnlinkSubject = async (subjectId: string) => {
    try {
      await unlinkSubjectFromPlan(planSeleccionado.id, subjectId);
      const subjects = await getStudyPlanSubjects(planSeleccionado.id);
      setAsignaturasDePlan(subjects);
    } catch (error) {
      Swal.fire("Error", "No se pudo quitar la asignatura", "error");
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Eliminar plan",
      text: "¿Está seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStudyPlan(id);
          Swal.fire("Eliminado", "El plan ha sido eliminado", "success");
          fetchData();
          if (planSeleccionado?.id === id) setPlanSeleccionado(null);
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el plan", "error");
        }
      }
    });
  };

  const asignaturasNoEnPlan = todasAsignaturas.filter(
    (a) => !asignaturasDePlan.some((ap) => ap.id === a.id)
  );

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Plan de Estudios</h3>
            <a href="/plan-estudios/crear" className="bg-primary text-white px-4 py-2 rounded-md text-sm">
              + Nuevo plan
            </a>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Año</th>
                    <th className="px-6 py-3">Publicado</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className={`odd:bg-white even:bg-gray-50 border-b border-gray-200 ${planSeleccionado?.id === item.id ? 'bg-green-50' : ''}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4">{item.year}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {item.is_published ? "Sí" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2 flex">
                        <button onClick={() => handleVerAsignaturas(item)} className="text-blue-600">
                          <BookOpen size={20} />
                        </button>
                        <button onClick={() => navigate(`/plan-estudios/editar/${item.id}`)} className="text-yellow-600">
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

        {/* Asignaturas del plan seleccionado */}
        {planSeleccionado && (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Asignaturas de: {planSeleccionado.name}
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="flex gap-4 items-center">
                <select
                  value={asignaturaAgregar}
                  onChange={(e) => setAsignaturaAgregar(e.target.value)}
                  className="border rounded-md p-2 flex-1"
                >
                  <option value="">Seleccione una asignatura para agregar</option>
                  {asignaturasNoEnPlan.map((a) => (
                    <option key={a.id} value={a.id}>{a.name} ({a.code})</option>
                  ))}
                </select>
                <button
                  onClick={handleLinkSubject}
                  style={{ backgroundColor: '#3b82f6' }}
                  className="px-4 py-2 text-white rounded-md"
                >
                  Agregar
                </button>
              </div>

              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Código</th>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Créditos</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaturasDePlan.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-4 text-center">No hay asignaturas en este plan</td></tr>
                  ) : (
                    asignaturasDePlan.map((a) => (
                      <tr key={a.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                        <td className="px-6 py-4">{a.code}</td>
                        <td className="px-6 py-4">{a.name}</td>
                        <td className="px-6 py-4">{a.credits}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleUnlinkSubject(a.id)} className="text-red-600">
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListStudyPlans;