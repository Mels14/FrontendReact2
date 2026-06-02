import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateSemester } from "../../services/semestersService";
import Swal from "sweetalert2";
import SemesterFormValidator from "../../components/Semesters/SemesterFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateSemester = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [semester, setSemester] = useState<any | null>(null);

  useEffect(() => {
    const fetchSemester = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/academic/semesters/${id}`);
        setSemester(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSemester();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateSemester(id!, values);
      Swal.fire({ title: "Completado", text: "Semestre actualizado correctamente", icon: "success", timer: 3000 });
      navigate("/semestres");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar el semestre", icon: "error", timer: 3000 });
    }
  };

  if (!semester) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Semestre" />
      <SemesterFormValidator handleUpdate={handleUpdate} mode={2} semester={semester} />
    </div>
  );
};

export default UpdateSemester;