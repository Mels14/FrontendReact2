import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateGroup } from "../../services/groupsService";
import Swal from "sweetalert2";
import GroupFormValidator from "../../components/Groups/GroupFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/academic/groups/${id}`);
        setGroup(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroup();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateGroup(id!, values);
      Swal.fire({ title: "Completado", text: "Grupo actualizado correctamente", icon: "success", timer: 3000 });
      navigate("/grupos");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar el grupo", icon: "error", timer: 3000 });
    }
  };

  if (!group) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Grupo" />
      <GroupFormValidator handleUpdate={handleUpdate} mode={2} group={group} />
    </div>
  );
};

export default UpdateGroup;