import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateStudyPlan } from "../../services/studyPlansService";
import Swal from "sweetalert2";
import StudyPlanFormValidator from "../../components/StudyPlans/StudyPlanFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateStudyPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<any | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/academic/study-plans/${id}`);
        setPlan(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlan();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateStudyPlan(id!, values);
      Swal.fire({ title: "Completado", text: "Plan actualizado correctamente", icon: "success", timer: 3000 });
      navigate("/plan-estudios");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar el plan", icon: "error", timer: 3000 });
    }
  };

  if (!plan) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Plan de Estudios" />
      <StudyPlanFormValidator handleUpdate={handleUpdate} mode={2} plan={plan} />
    </div>
  );
};

export default UpdateStudyPlan;