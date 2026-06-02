import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getRegistrations, deleteRegistration } from "../../services/registrationsService";
import { getCareers } from "../../services/careersService";
import { getUsers } from "../../services/userService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListRegistrations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [regs, cars, users] = await Promise.all([
      getRegistrations(),
      getCareers(),
      getUsers(),
    ]);
    setData(regs);
    setCareers(cars);
    setStudents(users.filter((u: any) => u.role === 'STUDENT'));
  };

  const getNombreEstudiante = (id: string) => {
    const s = students.find((s: any) => s.profile?.id === id);
    return s ? `${s.profile.first_name} ${s.profile.last_name}` : id;
  };

  const getNombreCarrera = (id: string) => careers.find((c: any) => c.id === id)?.name || id;

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Eliminar matrícula",
      text: "¿Está seguro de querer eliminar esta matrícula?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRegistration(id);
          Swal.fire("Eliminado", "La matrícula ha sido eliminada", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la matrícula", "error");
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Matrículas</h3>
            <a href="/matriculas/crear" className="bg-primary text-white px-4 py-2 rounded-md text-sm">
              + Nueva matrícula
            </a>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Estudiante</th>
                    <th className="px-6 py-3">Carrera</th>
                    <th className="px-6 py-3">Período</th>
                    <th className="px-6 py-3">Estado académico</th>
                    <th className="px-6 py-3">Activa</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{getNombreEstudiante(item.student_id)}</td>
                      <td className="px-6 py-4">{getNombreCarrera(item.career_id)}</td>
                      <td className="px-6 py-4">{item.admission_period}</td>
                      <td className="px-6 py-4">{item.academic_status}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.is_active ? "Sí" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2 flex">
                        <button onClick={() => navigate(`/matriculas/editar/${item.id}`)} className="text-yellow-600">
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

export default ListRegistrations;