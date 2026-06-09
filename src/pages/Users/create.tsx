import Swal from 'sweetalert2';
import { createStudent, createTeacher, createAdmin } from "../../services/userService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";
import UserFormValidator from '../../components/Users/UserFormValidator';

const CreateUser = () => {
  const navigate = useNavigate();

  const handleCreateUser = async (values: any) => {
    try {
      if (values.role === 'STUDENT') await createStudent(values)
      else if (values.role === 'TEACHER') await createTeacher(values)
      else await createAdmin(values)

      Swal.fire({
        title: "Completado",
        text: "Usuario creado correctamente",
        icon: "success",
        timer: 3000
      });
      navigate("/usuarios");
    } catch (error: any) {
      const mensaje = error.response?.data?.message || error.message || "Error al crear el usuario";
      if (mensaje.toLowerCase().includes('email')) {
        Swal.fire({ title: "Email duplicado", text: "Ya existe un usuario con ese email", icon: "error" });
      } else if (mensaje.toLowerCase().includes('code') || mensaje.toLowerCase().includes('codigo')) {
        Swal.fire({ title: "Código duplicado", text: "Ya existe un usuario con ese código", icon: "error" });
      } else {
        Swal.fire({ title: "Error", text: mensaje, icon: "error" });
      }
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb pageName="Crear Usuario" />
      <UserFormValidator handleCreate={handleCreateUser} mode={1} />
    </div>
  );
};

export default CreateUser;