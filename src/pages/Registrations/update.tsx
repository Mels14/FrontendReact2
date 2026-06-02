import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRegistration } from "../../services/registrationsService";
import Swal from "sweetalert2";
import RegistrationFormValidator from "../../components/Registrations/RegistrationFormValidator";
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<any | null>(null);

  useEffect(() => {
    const fetchRegistration = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/academic/registrations/${id}`);
        setRegistration(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRegistration();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      await updateRegistration(id!, values);
      Swal.fire({ title: "Completado", text: "Matrícula actualizada correctamente", icon: "success", timer: 3000 });
      navigate("/matriculas");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al actualizar la matrícula", icon: "error", timer: 3000 });
    }
  };

  if (!registration) return <div>Cargando...</div>;

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Editar Matrícula" />
      <RegistrationFormValidator handleUpdate={handleUpdate} mode={2} registration={registration} />
    </div>
  );
};

export default UpdateRegistration;