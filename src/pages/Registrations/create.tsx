import Swal from "sweetalert2";
import { createRegistration } from "../../services/registrationsService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import RegistrationFormValidator from "../../components/Registrations/RegistrationFormValidator";

const CreateRegistration = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createRegistration(values);
      Swal.fire({ title: "Completado", text: "Matrícula creada correctamente", icon: "success", timer: 3000 });
      navigate("/matriculas");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear la matrícula", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Matrícula" />
      <RegistrationFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateRegistration;