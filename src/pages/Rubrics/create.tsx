import Swal from "sweetalert2";
import { createRubric } from "../../services/rubricsService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import RubricFormValidator from "../../components/Rubrics/RubricFormValidator";

const CreateRubric = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createRubric(values);
      Swal.fire({ title: "Completado", text: "Rúbrica creada correctamente", icon: "success", timer: 3000 });
      navigate("/rubricas");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear la rúbrica", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Rúbrica" />
      <RubricFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateRubric;