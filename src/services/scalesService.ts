import api from "../interceptors/axiosInterceptor";

export const getScales = async () => {
  try {
    const response = await api.get("/evaluation/scales");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createScale = async (data: any) => {
  try {
    const response = await api.post("/evaluation/scales", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteScale = async (id: string) => {
  try {
    const response = await api.delete(`/evaluation/scales/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};