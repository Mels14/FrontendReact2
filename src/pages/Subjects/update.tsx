import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateSubject } from "../../services/subjectsService";
import Swal from "sweetalert2";
import SubjectFormValidator from "../../components/Subjects/SubjectFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateSubject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<any | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/academic/subjects/${id}`);
        setSubject(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubject();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateSubject(id!, values);
      Swal.fire({ title: "Completado", text: "Asignatura actualizada correctamente", icon: "success", timer: 3000 });
      navigate("/asignaturas");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar la asignatura", icon: "error", timer: 3000 });
    }
  };

  if (!subject) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Asignatura" />
      <SubjectFormValidator handleUpdate={handleUpdate} mode={2} subject={subject} />
    </div>
  );
};

export default UpdateSubject;