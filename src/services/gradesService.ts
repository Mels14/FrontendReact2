import api from "../interceptors/axiosInterceptor";

export const getGrades = async () => {
  try {
    const response = await api.get("/evaluation/grades");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createOrUpdateGrade = async (data: any) => {
  try {
    const response = await api.post("/evaluation/grades", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

};

  export const updateGrade = async (id: string, data: any) => {
  try {
    const response = await api.put(`/evaluation/grades/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};