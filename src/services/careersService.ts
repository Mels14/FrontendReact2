import api from "../interceptors/axiosInterceptor";

export const getCareers = async () => {
  try {
    const response = await api.get("/academic/careers");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createCareer = async (data: any) => {
  try {
    const response = await api.post("/academic/careers", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCareer = async (id: string, data: any) => {
  try {
    const response = await api.put(`/academic/careers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCareer = async (id: string) => {
  try {
    const response = await api.delete(`/academic/careers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};