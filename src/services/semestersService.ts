import api from "../interceptors/axiosInterceptor";

export const getSemesters = async () => {
  try {
    const response = await api.get("/academic/semesters");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createSemester = async (data: any) => {
  try {
    const response = await api.post("/academic/semesters", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateSemester = async (id: string, data: any) => {
  try {
    const response = await api.put(`/academic/semesters/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSemester = async (id: string) => {
  try {
    const response = await api.delete(`/academic/semesters/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};