import Swal from "sweetalert2";
import { createStudyPlan } from "../../services/studyPlansService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import StudyPlanFormValidator from "../../components/StudyPlans/StudyPlanFormValidator";

const CreateStudyPlan = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createStudyPlan(values);
      Swal.fire({ title: "Completado", text: "Plan creado correctamente", icon: "success", timer: 3000 });
      navigate("/plan-estudios");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear el plan", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Plan de Estudios" />
      <StudyPlanFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateStudyPlan;