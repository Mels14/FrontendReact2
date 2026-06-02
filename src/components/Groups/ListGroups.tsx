import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getGroups, deleteGroup } from "../../services/groupsService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ListGroups = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const groups = await getGroups();
    setData(groups);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Eliminar grupo",
      text: "¿Está seguro de querer eliminar este grupo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGroup(id);
          Swal.fire("Eliminado", "El grupo ha sido eliminado", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el grupo", "error");
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">Grupos</h3>
            <a href="/grupos/crear" className="bg-primary text-white px-4 py-2 rounded-md text-sm">
              + Nuevo grupo
            </a>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Código</th>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Capacidad</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.group_code}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.capacity}</td>
                      <td className="px-6 py-4 space-x-2 flex">
                        <button onClick={() => navigate(`/grupos/editar/${item.id}`)} className="text-yellow-600">
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

export default ListGroups;