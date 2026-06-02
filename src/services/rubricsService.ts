import api from "../interceptors/axiosInterceptor";

export const getRubrics = async () => {
  try {
    const response = await api.get("/evaluation/rubrics");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createRubric = async (data: any) => {
  try {
    const response = await api.post("/evaluation/rubrics", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRubric = async (id: string, data: any) => {
  try {
    const response = await api.put(`/evaluation/rubrics/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRubric = async (id: string) => {
  try {
    const response = await api.delete(`/evaluation/rubrics/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const publishRubric = async (id: string) => {
  try {
    const response = await api.patch(`/evaluation/rubrics/${id}/publish`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};