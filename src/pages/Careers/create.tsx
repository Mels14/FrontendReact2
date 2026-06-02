import Swal from "sweetalert2";
import { createCareer } from "../../services/careersService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import CareerFormValidator from "../../components/Careers/CareerFormValidator";

const CreateCareer = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createCareer(values);
      Swal.fire({ title: "Completado", text: "Carrera creada correctamente", icon: "success", timer: 3000 });
      navigate("/carreras");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear la carrera", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Carrera" />
      <CareerFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateCareer;