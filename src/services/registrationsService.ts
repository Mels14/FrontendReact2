import api from "../interceptors/axiosInterceptor";

export const getRegistrations = async () => {
  try {
    const response = await api.get("/academic/registrations");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createRegistration = async (data: any) => {
  try {
    const response = await api.post("/academic/registrations", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRegistration = async (id: string, data: any) => {
  try {
    const response = await api.put(`/academic/registrations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRegistration = async (id: string) => {
  try {
    const response = await api.delete(`/academic/registrations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};