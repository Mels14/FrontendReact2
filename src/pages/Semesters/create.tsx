import Swal from "sweetalert2";
import { createSemester } from "../../services/semestersService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import SemesterFormValidator from "../../components/Semesters/SemesterFormValidator";

const CreateSemester = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createSemester(values);
      Swal.fire({ title: "Completado", text: "Semestre creado correctamente", icon: "success", timer: 3000 });
      navigate("/semestres");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear el semestre", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Semestre" />
      <SemesterFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateSemester;