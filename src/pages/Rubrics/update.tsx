import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRubric } from "../../services/rubricsService";
import Swal from "sweetalert2";
import RubricFormValidator from "../../components/Rubrics/RubricFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateRubric = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rubric, setRubric] = useState<any | null>(null);

  useEffect(() => {
    const fetchRubric = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/evaluation/rubrics/${id}`);
        setRubric(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRubric();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateRubric(id!, values);
      Swal.fire({ title: "Completado", text: "Rúbrica actualizada correctamente", icon: "success", timer: 3000 });
      navigate("/rubricas");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar la rúbrica", icon: "error", timer: 3000 });
    }
  };

  if (!rubric) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Rúbrica" />
      <RubricFormValidator handleUpdate={handleUpdate} mode={2} rubric={rubric} />
    </div>
  );
};

export default UpdateRubric;