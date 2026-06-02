import Swal from "sweetalert2";
import { createSubject } from "../../services/subjectsService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import SubjectFormValidator from "../../components/Subjects/SubjectFormValidator";

const CreateSubject = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: any) => {
    try {
      await createSubject(values);
      Swal.fire({ title: "Completado", text: "Asignatura creada correctamente", icon: "success", timer: 3000 });
      navigate("/asignaturas");
    } catch (error) {
      Swal.fire({ title: "Error", text: "Error al crear la asignatura", icon: "error", timer: 3000 });
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Asignatura" />
      <SubjectFormValidator handleCreate={handleCreate} mode={1} />
    </div>
  );
};

export default CreateSubject;