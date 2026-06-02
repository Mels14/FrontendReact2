import api from "../interceptors/axiosInterceptor";

export const getCriteria = async () => {
  try {
    const response = await api.get("/evaluation/criteria");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createCriterion = async (data: any) => {
  try {
    const response = await api.post("/evaluation/criteria", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCriterion = async (id: string) => {
  try {
    const response = await api.delete(`/evaluation/criteria/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};