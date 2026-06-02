import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateCareer } from "../../services/careersService";
import Swal from "sweetalert2";
import CareerFormValidator from "../../components/Careers/CareerFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateCareer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState<any | null>(null);

  useEffect(() => {
    const fetchCareer = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/academic/careers/${id}`);
        setCareer(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCareer();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateCareer(id!, values);
      Swal.fire({ title: "Completado", text: "Carrera actualizada correctamente", icon: "success", timer: 3000 });
      navigate("/carreras");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar la carrera", icon: "error", timer: 3000 });
    }
  };

  if (!career) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Carrera" />
      <CareerFormValidator handleUpdate={handleUpdate} mode={2} career={career} />
    </div>
  );
};

export default UpdateCareer;