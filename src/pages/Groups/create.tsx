import Swal from "sweetalert2";
import { createGroup } from "../../services/groupsService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import GroupFormValidator from "../../components/Groups/GroupFormValidator";

const CreateGroup = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createGroup(values);
      Swal.fire({ title: "Completado", text: "Grupo creado correctamente", icon: "success", timer: 3000 });
      navigate("/grupos");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear el grupo", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Grupo" />
      <GroupFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateGroup;