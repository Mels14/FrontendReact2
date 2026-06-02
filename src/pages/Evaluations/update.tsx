import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateEvaluation } from "../../services/evaluationsService";
import Swal from "sweetalert2";
import EvaluationFormValidator from "../../components/Evaluations/EvaluationFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateEvaluation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState<any | null>(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/evaluation/evaluations/${id}`);
        setEvaluation(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvaluation();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateEvaluation(id!, values);
      Swal.fire({ title: "Completado", text: "Evaluación actualizada correctamente", icon: "success", timer: 3000 });
      navigate("/evaluaciones");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar la evaluación", icon: "error", timer: 3000 });
    }
  };

  if (!evaluation) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Evaluación" />
      <EvaluationFormValidator handleUpdate={handleUpdate} mode={2} evaluation={evaluation} />
    </div>
  );
};

export default UpdateEvaluation;