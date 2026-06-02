import Swal from "sweetalert2";
import { createEvaluation } from "../../services/evaluationsService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import EvaluationFormValidator from "../../components/Evaluations/EvaluationFormValidator";

const CreateEvaluation = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createEvaluation(values);
      Swal.fire({ title: "Completado", text: "Evaluación creada correctamente", icon: "success", timer: 3000 });
      navigate("/evaluaciones");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear la evaluación", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Evaluación" />
      <EvaluationFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateEvaluation;