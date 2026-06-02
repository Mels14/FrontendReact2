import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../../services/userService";
import Swal from "sweetalert2";
import UserFormValidator from '../../components/Users/UserFormValidator';
import Breadcrumb from "../../components/Breadcrumb";
import api from "../../interceptors/axiosInterceptor";

const UpdateUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdateUser = async (values: any) => {
    try {
      await updateUser(id!, values);
      Swal.fire({
        title: "Completado",
        text: "Usuario actualizado correctamente",
        icon: "success",
        timer: 3000
      });
      navigate("/usuarios");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al actualizar el usuario",
        icon: "error",
        timer: 3000
      });
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <>
      <Breadcrumb pageName="Actualizar Usuario" />
      <UserFormValidator
        handleUpdate={handleUpdateUser}
        mode={2}
        user={user}
      />
    </>
  );
};

export default UpdateUserPage;