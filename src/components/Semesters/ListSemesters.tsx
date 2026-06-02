import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getSemesters, deleteSemester } from "../../services/semestersService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListSemesters = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const semesters = await getSemesters();
    setData(semesters);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Eliminar semestre",
      text: "¿Está seguro de querer eliminar este semestre?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSemester(id);
          Swal.fire("Eliminado", "El semestre ha sido eliminado", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el semestre", "error");
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Semestres</h3>
            <a href="/semestres/crear" className="bg-primary text-white px-4 py-2 rounded-md text-sm">
              + Nuevo semestre
            </a>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Código</th>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Inicio</th>
                    <th className="px-6 py-3">Fin</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.code}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.start_date}</td>
                      <td className="px-6 py-4">{item.end_date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.is_active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2 flex">
                        <button onClick={() => navigate(`/semestres/editar/${item.id}`)} className="text-yellow-600">
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

export default ListSemesters;