import api from "../interceptors/axiosInterceptor";

export const getUsers = async () => {
  try {
    const response = await api.get("/users/");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createStudent = async (user: any) => {
  try {
    const response = await api.post("/users/public/register-student", user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTeacher = async (user: any) => {
  try {
    const response = await api.post("/users/public/register-teacher", user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createAdmin = async (user: any) => {
  try {
    const response = await api.post("/auth/register-admin", user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id: string, user: any) => {
  try {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deactivateUser = async (id: string) => {
  try {
    const response = await api.patch(`/users/${id}/deactivate`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};