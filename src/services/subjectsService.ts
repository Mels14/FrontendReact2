import api from "../interceptors/axiosInterceptor";

export const getSubjects = async () => {
  try {
    const response = await api.get("/academic/subjects");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createSubject = async (data: any) => {
  try {
    const response = await api.post("/academic/subjects", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateSubject = async (id: string, data: any) => {
  try {
    const response = await api.put(`/academic/subjects/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSubject = async (id: string) => {
  try {
    const response = await api.delete(`/academic/subjects/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};